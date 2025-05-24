#!/usr/bin/env python3
"""
Production script to update all 479 cafes using Apify API in batches
This script processes cafes in small batches to avoid memory limits
"""

import json
import requests
import time
import sys
import os
from typing import List, Dict, Any
from datetime import datetime

# Apify API configuration
APIFY_API_KEY = "apify_api_yvY6Ie86hYrYps6QySWzHJXA8ZlAo81W6tdH"
APIFY_ACTOR_ID = "nwua9Gu5YrADL7ZDj"
BASE_URL = "https://api.apify.com/v2"

# Configuration
BATCH_SIZE = 15  # Process 15 cafes at a time
WAIT_BETWEEN_BATCHES = 60  # Wait 60 seconds between batches
MAX_WAIT_TIME = 600  # Maximum wait time per batch (10 minutes)

def load_existing_cafes() -> List[Dict[str, Any]]:
    """Load existing cafe data"""
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def create_backup():
    """Create backup of original file"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f'cleaned_surabaya_cafes_backup_{timestamp}.json'
    
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as src:
        with open(backup_name, 'w', encoding='utf-8') as dst:
            dst.write(src.read())
    
    print(f"✅ Backup created: {backup_name}")
    return backup_name

def start_batch_scraper(cafe_names: List[str], batch_num: int) -> str:
    """Start a scraper run for a batch of cafes"""
    
    search_queries = [f"{name} Surabaya" for name in cafe_names]
    
    actor_input = {
        "searchStringsArray": search_queries,
        "maxCrawledPlaces": len(search_queries),
        "language": "en",
        "countryCode": "id",
        "maxReviews": 3,
        "maxImages": 5,
        "exportPlaceUrls": True,
        "additionalInfo": True
    }
    
    start_url = f"{BASE_URL}/acts/{APIFY_ACTOR_ID}/runs"
    headers = {
        "Authorization": f"Bearer {APIFY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    print(f"🚀 Starting batch {batch_num} with {len(cafe_names)} cafes...")
    response = requests.post(start_url, json=actor_input, headers=headers, params={"memory": 1024})
    
    if response.status_code == 201:
        run_info = response.json()
        run_id = run_info["data"]["id"]
        print(f"   Run ID: {run_id}")
        return run_id
    else:
        print(f"❌ Error starting batch {batch_num}: {response.status_code} - {response.text}")
        return None

def wait_for_completion(run_id: str, batch_num: int) -> bool:
    """Wait for a run to complete"""
    status_url = f"{BASE_URL}/actor-runs/{run_id}"
    headers = {"Authorization": f"Bearer {APIFY_API_KEY}"}
    
    start_time = time.time()
    
    while time.time() - start_time < MAX_WAIT_TIME:
        try:
            response = requests.get(status_url, headers=headers)
            if response.status_code == 200:
                status_data = response.json()
                status = status_data["data"]["status"]
                
                if status in ["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"]:
                    if status == "SUCCEEDED":
                        print(f"✅ Batch {batch_num} completed successfully")
                        return True
                    else:
                        print(f"❌ Batch {batch_num} failed with status: {status}")
                        return False
                
                # Show progress if available
                status_msg = status_data["data"].get("statusMessage", "")
                if status_msg:
                    print(f"   Progress: {status_msg}")
            
            time.sleep(30)  # Check every 30 seconds
            
        except Exception as e:
            print(f"⚠️  Error checking status: {e}")
            time.sleep(30)
    
    print(f"⏰ Batch {batch_num} timed out")
    return False

def get_batch_results(run_id: str, batch_num: int) -> List[Dict[str, Any]]:
    """Get results from a completed run"""
    dataset_url = f"{BASE_URL}/actor-runs/{run_id}/dataset/items"
    headers = {"Authorization": f"Bearer {APIFY_API_KEY}"}
    
    try:
        response = requests.get(dataset_url, headers=headers)
        if response.status_code == 200:
            results = response.json()
            print(f"📥 Retrieved {len(results)} results from batch {batch_num}")
            return results
        else:
            print(f"❌ Error getting results for batch {batch_num}: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Exception getting results for batch {batch_num}: {e}")
        return []

def format_apify_data(raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Format Apify data to match our structure"""
    formatted_cafes = []
    
    for place in raw_data:
        if not place.get('title'):
            continue
            
        # Only keep cafes/restaurants (filter out unrelated places)
        category = place.get('categoryName', '').lower()
        if not any(word in category for word in ['cafe', 'coffee', 'restaurant', 'food', 'bar', 'eatery']):
            continue
            
        # Extract opening hours
        opening_hours = []
        if place.get('openingHours'):
            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            hours_data = place.get('openingHours', [])
            for i, hours in enumerate(hours_data):
                if i < len(days):
                    opening_hours.append({
                        "day": days[i],
                        "hours": hours if hours else "Closed"
                    })
        
        # Extract neighborhood
        neighborhood = place.get('neighborhood', '')
        if not neighborhood and place.get('address'):
            parts = place['address'].split(', ')
            if len(parts) >= 3:
                neighborhood = f"{parts[1]}, {parts[2]}"
        
        formatted_cafe = {
            "id": place.get('placeId', ''),
            "name": place.get('title', ''),
            "address": place.get('address', ''),
            "rating": str(place.get('totalScore', 0)) if place.get('totalScore') else "0",
            "reviewCount": place.get('reviewsCount', 0),
            "placeId": place.get('placeId', ''),
            "google_maps_direction": f"https://www.google.com/maps/dir/?api=1&destination_place_id={place.get('placeId', '')}",
            "categories": [place.get('categoryName', 'Cafe')] if place.get('categoryName') else ["Cafe"],
            "phone": place.get('phone'),
            "website": place.get('website'),
            "openingHours": opening_hours,
            "neighborhood": neighborhood,
            "city": "Surabaya",
            "description": place.get('description'),
            "imageUrl": place.get('imageUrl') or (place.get('imageUrls', [None])[0]),
            "additionalInfo": place.get('additionalInfo', {}),
            "permanentlyClosed": place.get('permanentlyClosed', False),
            "lastUpdated": datetime.now().isoformat()
        }
        
        formatted_cafes.append(formatted_cafe)
    
    return formatted_cafes

def save_progress(all_results: List[Dict[str, Any]], batch_num: int):
    """Save progress after each batch"""
    progress_file = f'update_progress_batch_{batch_num}.json'
    with open(progress_file, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    print(f"💾 Progress saved to {progress_file}")

def main():
    """Main function"""
    try:
        print("🏪 Starting cafe data renewal process...")
        print(f"📊 Configuration: {BATCH_SIZE} cafes per batch, {WAIT_BETWEEN_BATCHES}s between batches")
        
        # Load existing cafes
        existing_cafes = load_existing_cafes()
        total_cafes = len(existing_cafes)
        print(f"📋 Found {total_cafes} cafes to update")
        
        # Create backup
        backup_file = create_backup()
        
        # Calculate batches
        num_batches = (total_cafes + BATCH_SIZE - 1) // BATCH_SIZE
        print(f"🔄 Will process in {num_batches} batches")
        
        all_updated_cafes = []
        
        for batch_num in range(1, num_batches + 1):
            start_idx = (batch_num - 1) * BATCH_SIZE
            end_idx = min(start_idx + BATCH_SIZE, total_cafes)
            batch_cafes = existing_cafes[start_idx:end_idx]
            
            cafe_names = [cafe['name'] for cafe in batch_cafes]
            
            print(f"\n📦 Processing batch {batch_num}/{num_batches} ({start_idx+1}-{end_idx})")
            print(f"   Cafes: {', '.join(cafe_names[:3])}{'...' if len(cafe_names) > 3 else ''}")
            
            # Start batch processing
            run_id = start_batch_scraper(cafe_names, batch_num)
            if not run_id:
                print(f"❌ Failed to start batch {batch_num}, skipping...")
                continue
            
            # Wait for completion
            if wait_for_completion(run_id, batch_num):
                # Get results
                raw_results = get_batch_results(run_id, batch_num)
                if raw_results:
                    formatted_results = format_apify_data(raw_results)
                    all_updated_cafes.extend(formatted_results)
                    
                    # Save progress
                    save_progress(all_updated_cafes, batch_num)
                    print(f"✅ Batch {batch_num} completed: {len(formatted_results)} cafes updated")
                else:
                    print(f"⚠️  No results from batch {batch_num}")
            else:
                print(f"❌ Batch {batch_num} failed")
            
            # Wait between batches (except for the last one)
            if batch_num < num_batches:
                print(f"⏳ Waiting {WAIT_BETWEEN_BATCHES} seconds before next batch...")
                time.sleep(WAIT_BETWEEN_BATCHES)
        
        # Final results
        print(f"\n🎉 Processing complete!")
        print(f"📊 Total cafes updated: {len(all_updated_cafes)}")
        print(f"📊 Original cafes: {total_cafes}")
        
        if all_updated_cafes:
            # Save final results
            with open('cleaned_surabaya_cafes_updated.json', 'w', encoding='utf-8') as f:
                json.dump(all_updated_cafes, f, indent=2, ensure_ascii=False)
            
            print(f"💾 Updated data saved to: cleaned_surabaya_cafes_updated.json")
            print(f"🔒 Original backup: {backup_file}")
            
            # Show summary
            closed_cafes = [cafe for cafe in all_updated_cafes if cafe.get('permanentlyClosed')]
            if closed_cafes:
                print(f"⚠️  Found {len(closed_cafes)} permanently closed cafes:")
                for cafe in closed_cafes[:5]:  # Show first 5
                    print(f"   - {cafe['name']}")
                if len(closed_cafes) > 5:
                    print(f"   ... and {len(closed_cafes) - 5} more")
            
            # Ask about replacing original file
            print(f"\n❓ Replace original cleaned_surabaya_cafes.json with updated data? (y/n): ", end="")
            response = input().strip().lower()
            
            if response == 'y':
                with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
                    json.dump(all_updated_cafes, f, indent=2, ensure_ascii=False)
                print("✅ Original file updated successfully!")
            else:
                print("📄 Original file preserved. Updated data is in cleaned_surabaya_cafes_updated.json")
        else:
            print("❌ No cafes were successfully updated")
            
        return True
        
    except KeyboardInterrupt:
        print("\n⏹️  Process interrupted by user")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)