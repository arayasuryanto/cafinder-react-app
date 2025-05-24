#!/usr/bin/env python3
"""
Batch update script for cafe data using Apify API
This processes cafes in small batches and provides manual control
"""

import json
import requests
import time
import sys
from typing import List, Dict, Any

# Apify API configuration
APIFY_API_KEY = "apify_api_yvY6Ie86hYrYps6QySWzHJXA8ZlAo81W6tdH"
APIFY_ACTOR_ID = "nwua9Gu5YrADL7ZDj"  # Google Maps Scraper actor
BASE_URL = "https://api.apify.com/v2"

def load_existing_cafes() -> List[Dict[str, Any]]:
    """Load existing cafe data"""
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def start_scraper_run(cafe_names: List[str]) -> str:
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
    
    # Add memory limit to reduce resource usage
    response = requests.post(start_url, json=actor_input, headers=headers, params={"memory": 1024})
    
    if response.status_code == 201:
        run_info = response.json()
        return run_info["data"]["id"]
    else:
        print(f"Error starting run: {response.status_code} - {response.text}")
        return None

def check_run_status(run_id: str) -> str:
    """Check the status of a run"""
    status_url = f"{BASE_URL}/actor-runs/{run_id}"
    headers = {"Authorization": f"Bearer {APIFY_API_KEY}"}
    
    response = requests.get(status_url, headers=headers)
    if response.status_code == 200:
        return response.json()["data"]["status"]
    return "UNKNOWN"

def get_run_results(run_id: str) -> List[Dict[str, Any]]:
    """Get results from a completed run"""
    dataset_url = f"{BASE_URL}/actor-runs/{run_id}/dataset/items"
    headers = {"Authorization": f"Bearer {APIFY_API_KEY}"}
    
    response = requests.get(dataset_url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return []

def format_apify_data(raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Format Apify data to match our structure"""
    formatted_cafes = []
    
    for place in raw_data:
        if not place.get('title'):
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
        
        # Format additional info
        additional_info = {}
        if place.get('additionalInfo'):
            for category, items in place['additionalInfo'].items():
                if isinstance(items, list):
                    formatted_items = []
                    for item in items:
                        if isinstance(item, str):
                            formatted_items.append({item: True})
                    additional_info[category] = formatted_items
        
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
            "neighborhood": extract_neighborhood(place.get('address', '')),
            "city": "Surabaya",
            "description": place.get('description'),
            "imageUrl": place.get('imageUrls', [None])[0],
            "additionalInfo": additional_info
        }
        
        formatted_cafes.append(formatted_cafe)
    
    return formatted_cafes

def extract_neighborhood(address: str) -> str:
    """Extract neighborhood from address"""
    if not address:
        return ""
    parts = address.split(', ')
    if len(parts) >= 3:
        return f"{parts[1]}, {parts[2]}"
    return ""

def main():
    """Main function"""
    try:
        # Load existing cafes
        existing_cafes = load_existing_cafes()
        print(f"Found {len(existing_cafes)} existing cafes")
        
        # Process first 10 cafes as a test
        test_cafes = existing_cafes[:10]
        cafe_names = [cafe['name'] for cafe in test_cafes]
        
        print(f"Starting scraper for {len(cafe_names)} cafes...")
        print("Cafes to update:", cafe_names)
        
        # Start the run
        run_id = start_scraper_run(cafe_names)
        if not run_id:
            print("Failed to start scraper run")
            return False
        
        print(f"Scraper run started with ID: {run_id}")
        print("You can check the status manually or wait for completion...")
        
        # Wait for completion (with timeout)
        for i in range(20):  # Wait max 10 minutes
            status = check_run_status(run_id)
            print(f"Status: {status}")
            
            if status in ["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"]:
                break
            
            time.sleep(30)
        
        if status == "SUCCEEDED":
            print("Getting results...")
            results = get_run_results(run_id)
            print(f"Retrieved {len(results)} results")
            
            if results:
                # Format and save results
                formatted_data = format_apify_data(results)
                
                # Save test results
                with open('test_updated_cafes.json', 'w', encoding='utf-8') as f:
                    json.dump(formatted_data, f, indent=2, ensure_ascii=False)
                
                print(f"Test results saved to test_updated_cafes.json")
                print("Sample result:")
                if formatted_data:
                    print(json.dumps(formatted_data[0], indent=2))
                    
                return True
            else:
                print("No results returned")
                return False
        else:
            print(f"Run finished with status: {status}")
            return False
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)