#!/usr/bin/env python3
"""
Script to update cafe data using Apify API
This script will:
1. Read existing cafe names from cleaned_surabaya_cafes.json
2. Use Apify to scrape fresh Google Maps data for each cafe
3. Update the JSON file with new data
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

def create_search_queries(cafes: List[Dict[str, Any]]) -> List[str]:
    """Create search queries for Apify from cafe names"""
    queries = []
    for cafe in cafes:
        # Create search query: cafe name + Surabaya
        query = f"{cafe['name']} Surabaya"
        queries.append(query)
    return queries

def run_apify_scraper(search_queries: List[str]) -> str:
    """Run Apify Google Maps scraper"""
    
    # Limit to first 5 queries for testing, then we can process in batches
    limited_queries = search_queries[:5]
    
    # Prepare the actor input
    actor_input = {
        "searchStringsArray": limited_queries,
        "maxCrawledPlaces": len(limited_queries),
        "language": "en",
        "countryCode": "id",
        "maxReviews": 5,
        "maxImages": 10,
        "exportPlaceUrls": True,
        "additionalInfo": True
    }
    
    # Start the actor run
    start_url = f"{BASE_URL}/acts/{APIFY_ACTOR_ID}/runs"
    headers = {
        "Authorization": f"Bearer {APIFY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    print("Starting Apify scraper...")
    response = requests.post(start_url, json=actor_input, headers=headers)
    
    if response.status_code != 201:
        print(f"Error starting actor: {response.status_code} - {response.text}")
        return None
    
    run_info = response.json()
    run_id = run_info["data"]["id"]
    print(f"Actor run started with ID: {run_id}")
    
    # Wait for the run to complete
    status_url = f"{BASE_URL}/actor-runs/{run_id}"
    
    while True:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        status = status_data["data"]["status"]
        
        print(f"Run status: {status}")
        
        if status in ["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"]:
            break
        
        time.sleep(30)  # Wait 30 seconds before checking again
    
    if status != "SUCCEEDED":
        print(f"Actor run failed with status: {status}")
        return None
    
    return run_id

def get_scraped_data(run_id: str) -> List[Dict[str, Any]]:
    """Get the scraped data from Apify"""
    dataset_url = f"{BASE_URL}/actor-runs/{run_id}/dataset/items"
    headers = {"Authorization": f"Bearer {APIFY_API_KEY}"}
    
    response = requests.get(dataset_url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error getting dataset: {response.status_code} - {response.text}")
        return []
    
    return response.json()

def format_cafe_data(raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Format scraped data to match our existing structure"""
    formatted_cafes = []
    
    for place in raw_data:
        if not place.get('title'):  # Skip invalid entries
            continue
            
        formatted_cafe = {
            "id": place.get('placeId', ''),
            "name": place.get('title', ''),
            "address": place.get('address', ''),
            "rating": str(place.get('totalScore', 0)),
            "reviewCount": place.get('reviewsCount', 0),
            "placeId": place.get('placeId', ''),
            "google_maps_direction": f"https://www.google.com/maps/dir/?api=1&destination_place_id={place.get('placeId', '')}",
            "categories": place.get('categoryName', '').split(', ') if place.get('categoryName') else ["Cafe"],
            "phone": place.get('phone'),
            "website": place.get('website'),
            "openingHours": format_opening_hours(place.get('openingHours', [])),
            "neighborhood": extract_neighborhood(place.get('address', '')),
            "city": "Surabaya",
            "description": place.get('description'),
            "imageUrl": get_main_image(place.get('imageUrls', [])),
            "additionalInfo": format_additional_info(place.get('additionalInfo', {}))
        }
        
        formatted_cafes.append(formatted_cafe)
    
    return formatted_cafes

def format_opening_hours(hours_data: List[str]) -> List[Dict[str, str]]:
    """Format opening hours data"""
    if not hours_data:
        return []
    
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    formatted_hours = []
    
    for i, hours in enumerate(hours_data):
        if i < len(days):
            formatted_hours.append({
                "day": days[i],
                "hours": hours if hours else "Closed"
            })
    
    return formatted_hours

def extract_neighborhood(address: str) -> str:
    """Extract neighborhood from address"""
    parts = address.split(', ')
    if len(parts) >= 3:
        return parts[1] + ", " + parts[2]
    return ""

def get_main_image(image_urls: List[str]) -> str:
    """Get the main image URL"""
    return image_urls[0] if image_urls else ""

def format_additional_info(additional_info: Dict[str, Any]) -> Dict[str, List[Dict[str, bool]]]:
    """Format additional info to match existing structure"""
    formatted_info = {}
    
    for category, items in additional_info.items():
        if isinstance(items, list):
            formatted_items = []
            for item in items:
                if isinstance(item, str):
                    formatted_items.append({item: True})
            formatted_info[category] = formatted_items
    
    return formatted_info

def main():
    """Main function"""
    try:
        print("Loading existing cafe data...")
        existing_cafes = load_existing_cafes()
        print(f"Found {len(existing_cafes)} cafes to update")
        
        print("Creating search queries...")
        search_queries = create_search_queries(existing_cafes)
        
        print("Running Apify scraper...")
        run_id = run_apify_scraper(search_queries)
        
        if not run_id:
            print("Failed to run scraper")
            return False
        
        print("Getting scraped data...")
        raw_data = get_scraped_data(run_id)
        print(f"Retrieved {len(raw_data)} places from Apify")
        
        print("Formatting data...")
        formatted_cafes = format_cafe_data(raw_data)
        print(f"Formatted {len(formatted_cafes)} cafes")
        
        # Backup original file
        print("Creating backup of original file...")
        with open('cleaned_surabaya_cafes_backup.json', 'w', encoding='utf-8') as f:
            json.dump(existing_cafes, f, indent=2, ensure_ascii=False)
        
        # Save updated data
        print("Saving updated cafe data...")
        with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
            json.dump(formatted_cafes, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully updated cafe data! {len(formatted_cafes)} cafes saved.")
        return True
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)