#!/usr/bin/env python3
"""
Reclassify cafes using official Surabaya administrative districts
Based on the official division provided by user
"""

import json
import re
from typing import Dict, List

def reclassify_official_districts():
    """Reclassify cafes using official Surabaya administrative districts"""
    
    # Load cafe data
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
        cafes = json.load(f)
    
    print(f"🏛️ Reclassifying {len(cafes)} cafes using official Surabaya districts...")
    
    # Official administrative districts as provided
    official_districts = {
        'SBY Pusat': [
            'tegalsari', 'simokerto', 'genteng', 'bubutan'
        ],
        
        'SBY Timur': [
            'gubeng', 'gunung anyar', 'sukolilo', 'tambaksari', 
            'mulyorejo', 'rungkut', 'tenggilis mejoyo'
        ],
        
        'SBY Barat': [
            'benowo', 'pakal', 'asemrowo', 'sukomanunggal', 
            'tandes', 'sambikerep', 'lakarsantri'
        ],
        
        'SBY Utara': [
            'bulak', 'kenjeran', 'semampir', 'pabean cantian', 
            'krembangan'
        ],
        
        'SBY Selatan': [
            'wonokromo', 'wonocolo', 'wiyung', 'karang pilang', 'karangpilang',
            'jambangan', 'gayungan', 'dukuh pakis', 'sawahan'
        ]
    }
    
    # Add common variations and sub-districts for better matching
    district_variations = {
        'SBY Pusat': [
            'tegalsari', 'simokerto', 'genteng', 'bubutan',
            # Sub-areas and variations
            'tunjungan', 'embong malang', 'ketabang', 'kapasan',
            'peneleh', 'petemon', 'kupang', 'darmo', 'diponegoro',
            'basuki rahmat', 'yos sudarso', 'urip sumoharjo',
            'panglima sudirman', 'pemuda', 'pahlawan', 'rajawali'
        ],
        
        'SBY Timur': [
            'gubeng', 'gunung anyar', 'gununganyar', 'sukolilo', 'tambaksari',
            'mulyorejo', 'rungkut', 'tenggilis mejoyo', 'tenggilis',
            # Sub-areas
            'merr', 'jemursari', 'semolowaru', 'menur pumpungan',
            'mulyosari', 'kali rungkut', 'penjaringan sari', 'medaeng',
            'sidosermo', 'wonorejo', 'kendangsari', 'panjang jiwo',
            'rungkut kidul', 'kalijudan', 'dukuh sutorejo',
            'kedung baruk', 'arjuno', 'mayjend sungkono'
        ],
        
        'SBY Barat': [
            'benowo', 'pakal', 'asemrowo', 'sukomanunggal',
            'tandes', 'sambikerep', 'lakarsantri',
            # Sub-areas
            'lidah', 'babatan', 'driyorejo', 'tanjungsari',
            'balongsari', 'lontar', 'citraland', 'graha famili',
            'romokalisari', 'tambak rejo', 'rangkah',
            'genting kalianak', 'jeruk'
        ],
        
        'SBY Utara': [
            'bulak', 'kenjeran', 'semampir', 'pabean cantian', 'pabean cantikan',
            'krembangan',
            # Sub-areas
            'perak', 'ujung', 'gading', 'manyar', 'klampis',
            'pegirian', 'tanah kali kedinding', 'ampel',
            'perak barat', 'perak timur', 'nyamplungan', 'bongkaran',
            'krembangan selatan', 'morokrembangan', 'kemayoran'
        ],
        
        'SBY Selatan': [
            'wonokromo', 'wonocolo', 'wiyung', 'karang pilang', 'karangpilang',
            'jambangan', 'gayungan', 'dukuh pakis', 'sawahan',
            # Sub-areas
            'pakuwon', 'bukit palma', 'royal residence', 'citra harmoni',
            'jagir', 'margorejo', 'nginden', 'ketintang', 'balas klumprik',
            'dukuh menanggal', 'banyu urip', 'sawunggaling', 'putat',
            'gayungsari', 'menanggal', 'pradah kalikendal', 'jemur wonosari'
        ]
    }
    
    # Initialize counters
    region_counts = {region: 0 for region in official_districts.keys()}
    region_counts['Unknown'] = 0
    
    # Track cafes by region
    cafes_by_region = {region: [] for region in official_districts.keys()}
    cafes_by_region['Unknown'] = []
    
    # Classify each cafe
    for cafe in cafes:
        address = (cafe.get('address', '') or '').lower()
        neighborhood = (cafe.get('neighborhood', '') or '').lower()
        
        # Combine address and neighborhood for better matching
        location_text = f"{address} {neighborhood}".lower()
        
        classified = False
        
        # Check each region using expanded variations
        for region, keywords in district_variations.items():
            for keyword in keywords:
                # Use word boundary matching for better accuracy
                if re.search(r'\b' + re.escape(keyword.lower()) + r'\b', location_text):
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
    
    # Manual classification for known shopping centers and landmarks
    shopping_centers = {
        'SBY Pusat': [
            'tunjungan plaza', 'grand city', 'royal plaza', 'itc surabaya',
            'pasar tunjungan', 'galaxy mall', 'lenmarc', 'plaza surabaya'
        ],
        'SBY Selatan': [
            'pakuwon city', 'pakuwon mall', 'ciputra world'
        ],
        'SBY Barat': [
            'citraland', 'g-walk', 'gwalk', 'graha famili'
        ]
    }
    
    # Second pass for shopping centers
    for cafe in cafes:
        if cafe['region'] == 'Unknown':
            location_text = f"{cafe.get('address', '')} {cafe.get('neighborhood', '')}".lower()
            
            for region, centers in shopping_centers.items():
                for center in centers:
                    if center in location_text:
                        # Update classification
                        region_counts['Unknown'] -= 1
                        cafes_by_region['Unknown'].remove(cafe['name'])
                        
                        cafe['region'] = region
                        region_counts[region] += 1
                        cafes_by_region[region].append(cafe['name'])
                        break
    
    # Print results
    print("\n📊 OFFICIAL DISTRICT CLASSIFICATION RESULTS")
    print("=" * 60)
    
    # Show in logical order
    region_order = ['SBY Pusat', 'SBY Utara', 'SBY Selatan', 'SBY Timur', 'SBY Barat', 'Unknown']
    
    total_classified = sum(region_counts.values()) - region_counts['Unknown']
    
    for region in region_order:
        count = region_counts[region]
        percentage = (count / len(cafes)) * 100
        print(f"{region:15}: {count:3d} cafes ({percentage:5.1f}%)")
    
    print(f"{'Total':15}: {len(cafes):3d} cafes")
    print(f"{'Classified':15}: {total_classified:3d} cafes ({(total_classified/len(cafes)*100):5.1f}%)")
    
    # Show official districts for each region
    print("\n🏛️ OFFICIAL ADMINISTRATIVE DISTRICTS")
    print("=" * 60)
    
    for region, districts in official_districts.items():
        print(f"\n{region}:")
        for district in districts:
            print(f"  • {district.title()}")
    
    # Show sample cafes for each region
    print("\n🏪 SAMPLE CAFES BY REGION")
    print("=" * 60)
    
    for region in region_order:
        cafe_list = cafes_by_region[region]
        if cafe_list:
            print(f"\n{region} ({len(cafe_list)} cafes):")
            # Show first 5 cafes as samples
            for i, cafe_name in enumerate(cafe_list[:5]):
                print(f"  • {cafe_name}")
            if len(cafe_list) > 5:
                print(f"  ... and {len(cafe_list) - 5} more")
    
    # Save updated data
    backup_name = 'cleaned_surabaya_cafes_backup_before_official.json'
    with open(backup_name, 'w', encoding='utf-8') as f:
        json.dump([{k: v for k, v in cafe.items() if k != 'region'} for cafe in cafes], f, indent=2, ensure_ascii=False)
    
    with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
        json.dump(cafes, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Cafes reclassified using official Surabaya districts!")
    print(f"💾 Backup created: {backup_name}")
    print(f"📄 Updated data saved to: cleaned_surabaya_cafes.json")
    
    # Create region summary for frontend use
    region_summary = {
        'total_cafes': len(cafes),
        'classification_method': 'Official Surabaya Administrative Districts',
        'regions': {
            region: {
                'count': region_counts[region],
                'percentage': round((region_counts[region] / len(cafes)) * 100, 1),
                'districts': official_districts.get(region, [])
            }
            for region in region_order if region != 'Unknown'
        }
    }
    
    with open('cafe_regions_summary.json', 'w', encoding='utf-8') as f:
        json.dump(region_summary, f, indent=2, ensure_ascii=False)
    
    print(f"📋 Official district summary saved to: cafe_regions_summary.json")
    
    return region_counts

if __name__ == "__main__":
    reclassify_official_districts()