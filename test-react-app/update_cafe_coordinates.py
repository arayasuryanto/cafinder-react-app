#!/usr/bin/env python3
"""
Update cafe coordinates using Google Places API and other methods.
This script processes cafes from filtered_cafes.json and adds precise coordinates.
"""

import json
import os
import re
import time
import logging
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from urllib.parse import quote, unquote
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configuration
CONFIG = {
    'GOOGLE_API_KEY': os.environ.get('GOOGLE_PLACES_API_KEY', 'YOUR_API_KEY_HERE'),
    'INPUT_FILE': 'public/filtered_cafes.json',
    'OUTPUT_FILE': 'public/cafes_with_coordinates.json',
    'BACKUP_FILE': f'public/filtered_cafes_backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json',
    'FAILED_FILE': 'public/failed_cafe_coordinates.json',
    'BATCH_SIZE': 10,
    'DELAY_BETWEEN_BATCHES': 1.0,  # seconds
    'MAX_RETRIES': 3,
    'REQUEST_TIMEOUT': 10,  # seconds
    'MAX_WORKERS': 5  # for parallel processing
}

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('coordinate_update.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class CoordinateUpdater:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.session = requests.Session()
        self.statistics = {
            'total': 0,
            'success': 0,
            'failed': 0,
            'sources': {}
        }
    
    def get_place_details(self, place_id: str) -> Optional[Dict]:
        """Get coordinates from Google Place ID."""
        url = (
            f"https://maps.googleapis.com/maps/api/place/details/json"
            f"?place_id={place_id}"
            f"&fields=geometry,name,formatted_address"
            f"&key={self.api_key}"
        )
        
        try:
            response = self.session.get(url, timeout=CONFIG['REQUEST_TIMEOUT'])
            data = response.json()
            
            if data.get('status') == 'OK' and data.get('result', {}).get('geometry'):
                location = data['result']['geometry']['location']
                return {
                    'lat': location['lat'],
                    'lng': location['lng'],
                    'source': 'google_places_api',
                    'accuracy': 'high'
                }
            else:
                logger.warning(f"Place API failed for {place_id}: {data.get('status')}")
                return None
                
        except Exception as e:
            logger.error(f"Error fetching place details for {place_id}: {e}")
            return None
    
    def parse_coordinates_from_url(self, url: str) -> Optional[Dict]:
        """Extract coordinates from Google Maps URL."""
        if not url:
            return None
        
        # Decode URL
        url = unquote(url)
        
        # Patterns to match coordinates in various Google Maps URL formats
        patterns = [
            # Pattern 1: @lat,lng,zoom
            (r'@(-?\d+\.\d+),(-?\d+\.\d+),', 'url_at_pattern'),
            # Pattern 2: !3d{lat}!4d{lng}
            (r'!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)', 'url_3d4d_pattern'),
            # Pattern 3: ll=lat,lng
            (r'll=(-?\d+\.\d+),(-?\d+\.\d+)', 'url_ll_pattern'),
            # Pattern 4: q=lat,lng
            (r'q=(-?\d+\.\d+),(-?\d+\.\d+)', 'url_q_pattern'),
            # Pattern 5: /place/.../@lat,lng
            (r'/place/[^/]+/@(-?\d+\.\d+),(-?\d+\.\d+)', 'url_place_pattern'),
            # Pattern 6: center=lat,lng
            (r'center=(-?\d+\.\d+),(-?\d+\.\d+)', 'url_center_pattern')
        ]
        
        for pattern, source_name in patterns:
            match = re.search(pattern, url)
            if match:
                return {
                    'lat': float(match.group(1)),
                    'lng': float(match.group(2)),
                    'source': source_name,
                    'accuracy': 'medium'
                }
        
        return None
    
    def geocode_address(self, address: str) -> Optional[Dict]:
        """Geocode an address to get coordinates."""
        if not address:
            return None
        
        url = (
            f"https://maps.googleapis.com/maps/api/geocode/json"
            f"?address={quote(address)}"
            f"&key={self.api_key}"
        )
        
        try:
            response = self.session.get(url, timeout=CONFIG['REQUEST_TIMEOUT'])
            data = response.json()
            
            if data.get('status') == 'OK' and data.get('results'):
                result = data['results'][0]
                location = result['geometry']['location']
                return {
                    'lat': location['lat'],
                    'lng': location['lng'],
                    'source': 'geocoded_from_address',
                    'accuracy': result['geometry'].get('location_type', 'low').lower()
                }
            else:
                logger.warning(f"Geocoding failed for {address}: {data.get('status')}")
                return None
                
        except Exception as e:
            logger.error(f"Error geocoding address {address}: {e}")
            return None
    
    def get_coordinates_for_cafe(self, cafe: Dict, retries: int = 0) -> Optional[Dict]:
        """Get coordinates for a single cafe using multiple methods."""
        cafe_name = cafe.get('name', 'Unknown')
        
        try:
            # Method 1: Use Google Place ID (most accurate)
            if cafe.get('placeId'):
                coords = self.get_place_details(cafe['placeId'])
                if coords:
                    logger.info(f"✓ Got coordinates for {cafe_name} using Place ID")
                    return coords
            
            # Method 2: Parse from Google Maps URL
            if cafe.get('google_maps_direction'):
                coords = self.parse_coordinates_from_url(cafe['google_maps_direction'])
                if coords:
                    logger.info(f"✓ Got coordinates for {cafe_name} from URL parsing")
                    return coords
            
            # Method 3: Geocode from address (least accurate)
            if cafe.get('address'):
                coords = self.geocode_address(cafe['address'])
                if coords:
                    logger.info(f"✓ Got coordinates for {cafe_name} using geocoding")
                    return coords
            
            logger.error(f"✗ Failed to get coordinates for {cafe_name}")
            return None
            
        except Exception as e:
            if retries < CONFIG['MAX_RETRIES']:
                logger.warning(f"Retrying {cafe_name} (attempt {retries + 1}/{CONFIG['MAX_RETRIES']})")
                time.sleep(2)
                return self.get_coordinates_for_cafe(cafe, retries + 1)
            
            logger.error(f"✗ Failed to get coordinates for {cafe_name} after {CONFIG['MAX_RETRIES']} retries: {e}")
            return None
    
    def process_cafe(self, cafe: Dict) -> Dict:
        """Process a single cafe and add coordinates."""
        coords = self.get_coordinates_for_cafe(cafe)
        
        if coords:
            self.statistics['success'] += 1
            source = coords['source']
            self.statistics['sources'][source] = self.statistics['sources'].get(source, 0) + 1
            
            return {
                **cafe,
                'coordinates': {
                    'lat': coords['lat'],
                    'lng': coords['lng']
                },
                'coordinatesSource': coords['source'],
                'coordinatesAccuracy': coords.get('accuracy', 'unknown'),
                'lastUpdated': datetime.now().isoformat()
            }
        else:
            self.statistics['failed'] += 1
            return {
                **cafe,
                'coordinates': None,
                'coordinatesError': 'Failed to retrieve coordinates',
                'lastUpdated': datetime.now().isoformat()
            }
    
    def process_cafes_parallel(self, cafes: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
        """Process cafes in parallel with rate limiting."""
        results = []
        failed_cafes = []
        
        # Process in batches to avoid rate limiting
        for i in range(0, len(cafes), CONFIG['BATCH_SIZE']):
            batch = cafes[i:i + CONFIG['BATCH_SIZE']]
            batch_num = i // CONFIG['BATCH_SIZE'] + 1
            total_batches = (len(cafes) + CONFIG['BATCH_SIZE'] - 1) // CONFIG['BATCH_SIZE']
            
            logger.info(f"\nProcessing batch {batch_num} of {total_batches}")
            
            with ThreadPoolExecutor(max_workers=CONFIG['MAX_WORKERS']) as executor:
                future_to_cafe = {executor.submit(self.process_cafe, cafe): cafe for cafe in batch}
                
                for future in as_completed(future_to_cafe):
                    cafe = future_to_cafe[future]
                    try:
                        result = future.result()
                        results.append(result)
                        if result.get('coordinates') is None:
                            failed_cafes.append(cafe)
                    except Exception as e:
                        logger.error(f"Error processing cafe {cafe.get('name', 'Unknown')}: {e}")
                        failed_cafes.append(cafe)
            
            # Delay between batches
            if i + CONFIG['BATCH_SIZE'] < len(cafes):
                time.sleep(CONFIG['DELAY_BETWEEN_BATCHES'])
        
        return results, failed_cafes


def main():
    """Main function to update cafe coordinates."""
    # Check API key
    if CONFIG['GOOGLE_API_KEY'] == 'YOUR_API_KEY_HERE':
        logger.error("Please set your Google Places API key in the GOOGLE_PLACES_API_KEY environment variable")
        return
    
    # Read input file
    try:
        logger.info(f"Reading cafes from {CONFIG['INPUT_FILE']}...")
        with open(CONFIG['INPUT_FILE'], 'r', encoding='utf-8') as f:
            cafes = json.load(f)
        logger.info(f"Found {len(cafes)} cafes to process")
    except Exception as e:
        logger.error(f"Error reading input file: {e}")
        return
    
    # Create backup
    try:
        logger.info(f"Creating backup at {CONFIG['BACKUP_FILE']}...")
        with open(CONFIG['BACKUP_FILE'], 'w', encoding='utf-8') as f:
            json.dump(cafes, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.error(f"Error creating backup: {e}")
        return
    
    # Initialize updater and process cafes
    updater = CoordinateUpdater(CONFIG['GOOGLE_API_KEY'])
    updater.statistics['total'] = len(cafes)
    
    start_time = time.time()
    results, failed_cafes = updater.process_cafes_parallel(cafes)
    end_time = time.time()
    
    # Save results
    try:
        logger.info(f"\nSaving results to {CONFIG['OUTPUT_FILE']}...")
        with open(CONFIG['OUTPUT_FILE'], 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.error(f"Error saving results: {e}")
        return
    
    # Save failed cafes
    if failed_cafes:
        try:
            with open(CONFIG['FAILED_FILE'], 'w', encoding='utf-8') as f:
                json.dump(failed_cafes, f, ensure_ascii=False, indent=2)
            logger.info(f"Failed cafes saved to {CONFIG['FAILED_FILE']} for manual review")
        except Exception as e:
            logger.error(f"Error saving failed cafes: {e}")
    
    # Print statistics
    duration = end_time - start_time
    success_rate = (updater.statistics['success'] / updater.statistics['total'] * 100) if updater.statistics['total'] > 0 else 0
    
    logger.info("\n" + "="*50)
    logger.info("UPDATE COMPLETE")
    logger.info("="*50)
    logger.info(f"Total cafes processed: {updater.statistics['total']}")
    logger.info(f"Successful updates: {updater.statistics['success']} ({success_rate:.1f}%)")
    logger.info(f"Failed updates: {updater.statistics['failed']} ({100 - success_rate:.1f}%)")
    logger.info(f"Time taken: {duration:.1f} seconds")
    
    if updater.statistics['sources']:
        logger.info("\nCoordinate Sources:")
        for source, count in sorted(updater.statistics['sources'].items(), key=lambda x: x[1], reverse=True):
            logger.info(f"  {source}: {count} cafes")


if __name__ == "__main__":
    main()