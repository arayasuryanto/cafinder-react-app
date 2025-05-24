#!/usr/bin/env python3
"""
Classify cafes by Surabaya regions (North, South, East, West)
Based on the address/neighborhood information in the cafe data
"""

import json
import re
from typing import Dict, List

def classify_surabaya_regions():
    """Classify cafes into Surabaya regions based on address/neighborhood"""
    
    # Load cafe data
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
        cafes = json.load(f)
    
    print(f"🏙️ Classifying {len(cafes)} cafes into Surabaya regions...")
    
    # Define region mappings based on Surabaya's administrative districts
    # Reference: https://en.wikipedia.org/wiki/Surabaya#Administrative_divisions
    
    region_mapping = {
        'SBY Utara': [
            # North Surabaya districts
            'krembangan', 'pabean cantian', 'semampir', 'bubutan', 'tandes',
            'asemrowo', 'benowo', 'pakal', 'lakarsantri', 'sambikerep',
            'kenjeran', 'bulak', 'mulyorejo', 'sukolilo', 'rungkut',
            
            # Specific areas known to be in North Surabaya
            'ujung', 'perak', 'gading', 'manyar', 'menur', 'dharmahusada',
            'kertajaya', 'gubeng', 'mojo', 'keputih', 'klampis', 'ngagel',
            'dukuh pakis', 'lontar', 'lidah', 'babatan', 'driyorejo',
            'tanjungsari', 'balongsari', 'romokalisari', 'tambaksari'
        ],
        
        'SBY Selatan': [
            # South Surabaya districts  
            'sawahan', 'wonokromo', 'karangpilang', 'jambangan',
            'gayungan', 'wonocolo', 'wiyung', 'dukuh pakis',
            
            # Specific areas in South Surabaya
            'pakuwon', 'citraland', 'graha famili', 'bukit palma',
            'Royal residence', 'citra harmoni', 'citra raya',
            'jagir', 'margorejo', 'nginden', 'ketintang', 'balas klumprik',
            'dukuh menanggal', 'banyu urip', 'kupang', 'darmo',
            'diponegoro', 'embong malang', 'genteng', 'tegalsari',
            'sawunggaling', 'putat', 'lakarsantri', 'tandes',
            'gayungsari', 'menanggal', 'pradah kalikendal'
        ],
        
        'SBY Timur': [
            # East Surabaya districts
            'gubeng', 'barata jaya', 'mulyorejo', 'sukolilo', 'rungkut',
            'tenggilis mejoyo', 'gunung anyar',
            
            # Specific areas in East Surabaya  
            'merr', 'arjuno', 'basuki rahmat', 'mayjend sungkono',
            'jemursari', 'keputih', 'semolowaru', 'menur pumpungan',
            'manyar sabrangan', 'mulyosari', 'kali rungkut',
            'penjaringan sari', 'medaeng', 'sidosermo', 'wonorejo',
            'kendangsari', 'panjang jiwo', 'gununganyar', 'rungkut kidul',
            'kalijudan', 'dukuh sutorejo', 'sukomanunggal'
        ],
        
        'SBY Barat': [
            # West Surabaya districts
            'genteng', 'tegalsari', 'bubutan', 'simokerto', 'pabean cantian',
            'krembangan', 'semampir', 'asemrowo', 'tandes', 'sukomanunggal',
            'sawahan', 'wonokromo', 'karangpilang', 'lakarsantri', 'benowo',
            
            # Specific areas in West Surabaya
            'tunjungan', 'embong malang', 'ketabang', 'dr soetomo', 
            'pemuda', 'pahlawan', 'rajawali', 'kapasan', 'peneleh',
            'petemon', 'krembengan', 'pegirian', 'tanah kali kedinding',
            'sidotopo', 'magersari', 'ampel', 'perak barat', 'perak timur',
            'nyamplungan', 'bongkaran', 'krembangan selatan', 'morokrembangan',
            'kemayoran', 'gundih', 'bubutan', 'jepara', 'alun alun contong',
            'simolawang', 'tambak rejo', 'rangkah', 'asemrowo', 'genting kalianak'
        ]
    }
    
    # Initialize counters
    region_counts = {region: 0 for region in region_mapping.keys()}
    region_counts['Unknown'] = 0
    
    # Track cafes by region
    cafes_by_region = {region: [] for region in region_mapping.keys()}
    cafes_by_region['Unknown'] = []
    
    # Classify each cafe
    for cafe in cafes:
        address = (cafe.get('address', '') or '').lower()
        neighborhood = (cafe.get('neighborhood', '') or '').lower()
        
        # Combine address and neighborhood for better matching
        location_text = f"{address} {neighborhood}".lower()
        
        classified = False
        
        # Check each region
        for region, keywords in region_mapping.items():
            for keyword in keywords:
                if keyword.lower() in location_text:
                    cafe['region'] = region
                    region_counts[region] += 1
                    cafes_by_region[region].append(cafe['name'])
                    classified = True
                    break
            if classified:
                break
        
        # If not classified, mark as unknown
        if not classified:
            cafe['region'] = 'Unknown'
            region_counts['Unknown'] += 1
            cafes_by_region['Unknown'].append(cafe['name'])
    
    # Print results
    print("\n📊 REGION CLASSIFICATION RESULTS")
    print("=" * 50)
    
    total_classified = sum(region_counts.values()) - region_counts['Unknown']
    
    for region, count in region_counts.items():
        percentage = (count / len(cafes)) * 100
        print(f"{region:15}: {count:3d} cafes ({percentage:5.1f}%)")
    
    print(f"{'Total':15}: {len(cafes):3d} cafes")
    print(f"{'Classified':15}: {total_classified:3d} cafes ({(total_classified/len(cafes)*100):5.1f}%)")
    
    # Show sample cafes for each region
    print("\n🏪 SAMPLE CAFES BY REGION")
    print("=" * 50)
    
    for region, cafe_list in cafes_by_region.items():
        if cafe_list:
            print(f"\n{region} ({len(cafe_list)} cafes):")
            # Show first 5 cafes as samples
            for i, cafe_name in enumerate(cafe_list[:5]):
                print(f"  • {cafe_name}")
            if len(cafe_list) > 5:
                print(f"  ... and {len(cafe_list) - 5} more")
    
    # Save updated data with region classifications
    backup_name = 'cleaned_surabaya_cafes_backup_before_regions.json'
    with open(backup_name, 'w', encoding='utf-8') as f:
        json.dump([{k: v for k, v in cafe.items() if k != 'region'} for cafe in cafes], f, indent=2, ensure_ascii=False)
    
    with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
        json.dump(cafes, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Region classifications added to all cafes!")
    print(f"💾 Backup created: {backup_name}")
    print(f"📄 Updated data saved to: cleaned_surabaya_cafes.json")
    
    # Create region summary for frontend use
    region_summary = {
        'total_cafes': len(cafes),
        'regions': {
            region: {
                'count': count,
                'percentage': round((count / len(cafes)) * 100, 1)
            }
            for region, count in region_counts.items()
        }
    }
    
    with open('cafe_regions_summary.json', 'w', encoding='utf-8') as f:
        json.dump(region_summary, f, indent=2, ensure_ascii=False)
    
    print(f"📋 Region summary saved to: cafe_regions_summary.json")
    
    return region_counts

if __name__ == "__main__":
    classify_surabaya_regions()