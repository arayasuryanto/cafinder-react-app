#!/usr/bin/env python3
"""
Fix Google Maps URLs to use the correct format from Apify
The issue was: we were generating /dir/?api=1&destination_place_id=...
But Apify provides: /search/?api=1&query=...&query_place_id=...
"""

import json
import urllib.parse
from datetime import datetime

def fix_google_maps_urls():
    """Fix all Google Maps URLs to use the correct format"""
    
    # Load current data
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
        cafes = json.load(f)
    
    print(f"🔧 Fixing Google Maps URLs for {len(cafes)} cafes...")
    
    fixed_count = 0
    
    for cafe in cafes:
        cafe_name = cafe.get('name', '')
        place_id = cafe.get('placeId', '')
        current_url = cafe.get('google_maps_direction', '')
        
        if place_id and cafe_name:
            # Create the correct URL format that Apify uses
            # URL encode the cafe name
            encoded_name = urllib.parse.quote(cafe_name)
            correct_url = f"https://www.google.com/maps/search/?api=1&query={encoded_name}&query_place_id={place_id}"
            
            # Update if different
            if current_url != correct_url:
                cafe['google_maps_direction'] = correct_url
                fixed_count += 1
                print(f"   ✅ Fixed: {cafe_name}")
                
        # Update timestamp
        cafe['lastUpdated'] = datetime.now().isoformat()
    
    print(f"📊 Fixed {fixed_count} URLs out of {len(cafes)} cafes")
    
    # Create backup
    backup_name = f'cleaned_surabaya_cafes_backup_before_url_fix_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
    with open(backup_name, 'w', encoding='utf-8') as f:
        json.dump(cafes, f, indent=2, ensure_ascii=False)
    print(f"💾 Backup created: {backup_name}")
    
    # Save updated data
    with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
        json.dump(cafes, f, indent=2, ensure_ascii=False)
    
    print("✅ All Google Maps URLs have been fixed!")
    
    # Test a few URLs
    print("\n🧪 Testing some URLs:")
    test_cafes = [cafe for cafe in cafes if 'Djavahaus' in cafe.get('name', '') or 'Filgud' in cafe.get('name', '')][:3]
    
    for cafe in test_cafes:
        print(f"   {cafe['name']}: {cafe['google_maps_direction']}")

if __name__ == "__main__":
    fix_google_maps_urls()