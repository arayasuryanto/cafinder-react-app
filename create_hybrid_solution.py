#!/usr/bin/env python3
"""
Create a hybrid solution for fixing Google Maps directions
Since the full batch processing faced limitations, let's:
1. Use the partial results we got from Apify
2. Fix the known issues with Google Maps directions
3. Update the most critical cafes
"""

import json
import requests
from datetime import datetime
from typing import List, Dict, Any

# Apify API configuration
APIFY_API_KEY = "apify_api_yvY6Ie86hYrYps6QySWzHJXA8ZlAo81W6tdH"
BASE_URL = "https://api.apify.com/v2"

def get_all_completed_results():
    """Get results from all the runs we made"""
    run_ids = [
        "CXWANZVXSUIpdTG3X",  # Batch 1
        "aiuY8wjRvVsaQGgDR",  # Batch 2 
        "GIqAvPQse4UKJpevn",  # Batch 3
        "9cAUc8bGcAQNku8OE",  # Batch 4
        "owxHxWN0fNpKXV6Af", # Batch 5
        "ufewVnkhvRllYd5gg", # Batch 6
        "Wk3kh8dxtYN3eNgfX", # Batch 7
        "wjvRMpLO2c0ZOWqcP", # Batch 8
        "DFqBr9xLgY4lxk1oa", # Batch 9
        "2fqWErcX1CNcIISbT"  # Long-running batch with 380 places
    ]
    
    all_results = []
    headers = {"Authorization": f"Bearer {APIFY_API_KEY}"}
    
    print("🔍 Collecting results from all completed runs...")
    
    for i, run_id in enumerate(run_ids, 1):
        try:
            dataset_url = f"{BASE_URL}/actor-runs/{run_id}/dataset/items"
            response = requests.get(dataset_url, headers=headers)
            
            if response.status_code == 200:
                results = response.json()
                print(f"   Batch {i}: {len(results)} places")
                all_results.extend(results)
            else:
                print(f"   Batch {i}: No results (status {response.status_code})")
                
        except Exception as e:
            print(f"   Batch {i}: Error - {e}")
    
    return all_results

def filter_surabaya_cafes(raw_results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Filter to only include Surabaya cafes and restaurants"""
    surabaya_places = []
    
    for place in raw_results:
        if not place or not isinstance(place, dict):
            continue
            
        # Check if it's in Surabaya
        address = (place.get('address') or '').lower()
        city = (place.get('city') or '').lower()
        
        if 'surabaya' in address or 'surabaya' in city:
            # Check if it's a cafe/restaurant
            category = (place.get('categoryName') or '').lower()
            title = (place.get('title') or '').lower()
            
            if any(word in category for word in ['cafe', 'coffee', 'restaurant', 'food', 'bar', 'eatery']) or \
               any(word in title for word in ['cafe', 'coffee', 'kopi', 'warung', 'resto']):
                surabaya_places.append(place)
    
    return surabaya_places

def format_to_our_structure(places: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Convert Apify data to our cafe structure"""
    formatted_cafes = []
    
    for place in places:
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
            "lastUpdated": datetime.now().isoformat(),
            "dataSource": "apify_fresh"
        }
        
        formatted_cafes.append(formatted_cafe)
    
    return formatted_cafes

def fix_existing_directions(existing_cafes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Fix Google Maps directions for existing cafes"""
    print("🔧 Fixing Google Maps directions for existing cafes...")
    
    fixed_count = 0
    for cafe in existing_cafes:
        # Check if direction URL might be broken
        current_url = cafe.get('google_maps_direction', '')
        place_id = cafe.get('placeId', '')
        
        if place_id:
            # Generate the correct URL format
            correct_url = f"https://www.google.com/maps/dir/?api=1&destination_place_id={place_id}"
            
            if current_url != correct_url:
                cafe['google_maps_direction'] = correct_url
                fixed_count += 1
                
            # Add last updated timestamp
            cafe['lastUpdated'] = datetime.now().isoformat()
            cafe['dataSource'] = 'original_fixed'
    
    print(f"   Fixed {fixed_count} direction URLs")
    return existing_cafes

def merge_data(existing_cafes: List[Dict[str, Any]], fresh_cafes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Merge fresh data with existing data, preferring fresh when available"""
    print("🔀 Merging fresh data with existing data...")
    
    # Create lookup by name and place_id for fresh cafes
    fresh_by_name = {cafe['name'].lower(): cafe for cafe in fresh_cafes}
    fresh_by_place_id = {cafe['placeId']: cafe for cafe in fresh_cafes if cafe['placeId']}
    
    merged_cafes = []
    fresh_used = set()
    
    for existing_cafe in existing_cafes:
        name_key = existing_cafe['name'].lower()
        place_id = existing_cafe.get('placeId', '')
        
        # Try to find fresh data for this cafe
        fresh_cafe = None
        
        # First try by place_id (most reliable)
        if place_id and place_id in fresh_by_place_id:
            fresh_cafe = fresh_by_place_id[place_id]
            fresh_used.add(fresh_cafe['name'])
        
        # Then try by name
        elif name_key in fresh_by_name:
            fresh_cafe = fresh_by_name[name_key]
            fresh_used.add(fresh_cafe['name'])
        
        if fresh_cafe:
            # Use fresh data
            merged_cafes.append(fresh_cafe)
            print(f"   ✅ Updated: {fresh_cafe['name']}")
        else:
            # Use existing data (already fixed)
            merged_cafes.append(existing_cafe)
    
    # Add any fresh cafes that weren't matched (new discoveries)
    for fresh_cafe in fresh_cafes:
        if fresh_cafe['name'] not in fresh_used:
            merged_cafes.append(fresh_cafe)
            print(f"   ➕ New cafe discovered: {fresh_cafe['name']}")
    
    return merged_cafes

def main():
    """Main function"""
    try:
        print("🏪 Creating hybrid solution for cafe data update...")
        
        # Load existing data
        with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
            existing_cafes = json.load(f)
        
        print(f"📋 Loaded {len(existing_cafes)} existing cafes")
        
        # Get all fresh results from Apify
        raw_results = get_all_completed_results()
        print(f"📥 Collected {len(raw_results)} total results from Apify")
        
        # Filter to Surabaya cafes only
        surabaya_results = filter_surabaya_cafes(raw_results)
        print(f"🏙️ Found {len(surabaya_results)} Surabaya cafes in results")
        
        # Format fresh data
        fresh_cafes = format_to_our_structure(surabaya_results)
        print(f"✨ Formatted {len(fresh_cafes)} fresh cafe records")
        
        # Fix existing cafe directions
        fixed_existing = fix_existing_directions(existing_cafes)
        
        # Merge data
        merged_cafes = merge_data(fixed_existing, fresh_cafes)
        print(f"🎯 Final merged dataset: {len(merged_cafes)} cafes")
        
        # Create backup
        backup_name = f'cleaned_surabaya_cafes_backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        with open(backup_name, 'w', encoding='utf-8') as f:
            json.dump(existing_cafes, f, indent=2, ensure_ascii=False)
        print(f"💾 Backup created: {backup_name}")
        
        # Save results
        with open('cleaned_surabaya_cafes_hybrid.json', 'w', encoding='utf-8') as f:
            json.dump(merged_cafes, f, indent=2, ensure_ascii=False)
        
        # Show statistics
        fresh_count = len([c for c in merged_cafes if c.get('dataSource') == 'apify_fresh'])
        fixed_count = len([c for c in merged_cafes if c.get('dataSource') == 'original_fixed'])
        closed_count = len([c for c in merged_cafes if c.get('permanentlyClosed')])
        
        print(f"\n📊 Final Statistics:")
        print(f"   Total cafes: {len(merged_cafes)}")
        print(f"   Fresh from Apify: {fresh_count}")
        print(f"   Original (fixed): {fixed_count}")
        print(f"   Permanently closed: {closed_count}")
        
        if closed_count > 0:
            print(f"\n⚠️ Permanently closed cafes:")
            closed_cafes = [c for c in merged_cafes if c.get('permanentlyClosed')]
            for cafe in closed_cafes[:10]:  # Show first 10
                print(f"   - {cafe['name']}")
            if len(closed_cafes) > 10:
                print(f"   ... and {len(closed_cafes) - 10} more")
        
        print(f"\n✅ Hybrid solution completed!")
        print(f"📄 Results saved to: cleaned_surabaya_cafes_hybrid.json")
        
        # Ask about replacing original
        print(f"\n❓ Replace original cleaned_surabaya_cafes.json? (y/n): ", end="")
        response = input().strip().lower()
        
        if response == 'y':
            with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
                json.dump(merged_cafes, f, indent=2, ensure_ascii=False)
            print("✅ Original file updated!")
        else:
            print("📄 Original preserved. New data in cleaned_surabaya_cafes_hybrid.json")
            
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)