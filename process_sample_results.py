#!/usr/bin/env python3
"""
Process the sample results we got from Apify to show the data format
"""

import json

# Sample result from Apify (Filgud+)
sample_result = {
  "title": "Filgud+",
  "categoryName": "Cafe",
  "address": "Jl. Raya Lidah Wetan, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213, Indonesia",
  "neighborhood": "Lidah Wetan, Lakarsantri",
  "phone": None,
  "totalScore": 4.4,
  "permanentlyClosed": True,
  "placeId": "ChIJh9U5rh391y0R_D4KjkxgXrY",
  "reviewsCount": 329,
  "openingHours": [],
  "additionalInfo": {
    "Service options": [
      {"No-contact delivery": True},
      {"Delivery": True},
      {"Takeout": True},
      {"Dine-in": True}
    ],
    "Highlights": [
      {"Great coffee": True},
      {"Great tea selection": True}
    ],
    "Popular for": [
      {"Solo dining": True},
      {"Good for working on laptop": True}
    ],
    "Offerings": [
      {"Coffee": True},
      {"Quick bite": True}
    ],
    "Atmosphere": [
      {"Casual": True},
      {"Cozy": True},
      {"Quiet": True},
      {"Trendy": True}
    ],
    "Crowd": [
      {"College students": True},
      {"Groups": True}
    ]
  },
  "imageUrl": "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npaZhDdvi5o5LOOOzbMEL8hHs4m7kD1HwrgySayMPU_sq9xynOyH7c942eSIfWIDv2nKS_xfKw242_InKMiX4WQjcXy3BCYp1ii3mj_nsmhKy86W4g3QjYRZB487BfOqeZqDL4evA=w408-h544-k-no"
}

def convert_to_cafe_format(apify_data):
    """Convert Apify data to our cafe format"""
    
    # Extract opening hours (none in this case since it's closed)
    opening_hours = []
    if apify_data.get('openingHours'):
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        for i, hours in enumerate(apify_data['openingHours']):
            if i < len(days):
                opening_hours.append({
                    "day": days[i],
                    "hours": hours if hours else "Closed"
                })
    
    # Extract neighborhood 
    address = apify_data.get('address', '')
    neighborhood = apify_data.get('neighborhood', '')
    if not neighborhood and address:
        parts = address.split(', ')
        if len(parts) >= 3:
            neighborhood = f"{parts[1]}, {parts[2]}"
    
    formatted_cafe = {
        "id": apify_data.get('placeId', ''),
        "name": apify_data.get('title', ''),
        "address": address,
        "rating": str(apify_data.get('totalScore', 0)) if apify_data.get('totalScore') else "0",
        "reviewCount": apify_data.get('reviewsCount', 0),
        "placeId": apify_data.get('placeId', ''),
        "google_maps_direction": f"https://www.google.com/maps/dir/?api=1&destination_place_id={apify_data.get('placeId', '')}",
        "categories": [apify_data.get('categoryName', 'Cafe')] if apify_data.get('categoryName') else ["Cafe"],
        "phone": apify_data.get('phone'),
        "website": apify_data.get('website'),
        "openingHours": opening_hours,
        "neighborhood": neighborhood,
        "city": "Surabaya",
        "description": apify_data.get('description'),
        "imageUrl": apify_data.get('imageUrl'),
        "additionalInfo": apify_data.get('additionalInfo', {}),
        "permanentlyClosed": apify_data.get('permanentlyClosed', False)  # New field to track closure
    }
    
    return formatted_cafe

# Process the sample
converted = convert_to_cafe_format(sample_result)

# Read current Filgud+ data for comparison
with open('cleaned_surabaya_cafes.json', 'r') as f:
    current_data = json.load(f)

filgud_old = None
for cafe in current_data:
    if cafe['name'] == 'Filgud+':
        filgud_old = cafe
        break

print("=== OLD DATA (from cleaned_surabaya_cafes.json) ===")
print(json.dumps(filgud_old, indent=2))

print("\n=== NEW DATA (from Apify) ===")
print(json.dumps(converted, indent=2))

print("\n=== KEY DIFFERENCES ===")
if filgud_old:
    print(f"Old Google Maps Direction: {filgud_old['google_maps_direction']}")
    print(f"New Google Maps Direction: {converted['google_maps_direction']}")
    print(f"Place ID same: {filgud_old['placeId'] == converted['placeId']}")
    print(f"New status: {'PERMANENTLY CLOSED' if converted['permanentlyClosed'] else 'OPEN'}")
    print(f"Rating change: {filgud_old['rating']} -> {converted['rating']}")
    print(f"Review count change: {filgud_old['reviewCount']} -> {converted['reviewCount']}")