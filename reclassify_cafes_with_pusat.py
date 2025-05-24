#!/usr/bin/env python3
"""
Reclassify cafes into 5 correct Surabaya regions:
Semua, SBY Utara, SBY Selatan, SBY Barat, SBY Timur, SBY Pusat
"""

import json
import re
from typing import Dict, List

def reclassify_surabaya_regions():
    """Reclassify cafes into correct Surabaya regions including SBY Pusat"""
    
    # Load cafe data
    with open('cleaned_surabaya_cafes.json', 'r', encoding='utf-8') as f:
        cafes = json.load(f)
    
    print(f"🏙️ Reclassifying {len(cafes)} cafes into 5 Surabaya regions...")
    
    # Define the correct region mappings
    region_mapping = {
        'SBY Utara': [
            # North Surabaya districts
            'krembangan', 'pabean cantian', 'semampir', 'asemrowo', 'tandes',
            'benowo', 'pakal', 'lakarsantri', 'sambikerep', 'kenjeran', 'bulak',
            
            # Specific areas in North Surabaya
            'lidah', 'babatan', 'driyorejo', 'tanjungsari', 'balongsari',
            'romokalisari', 'tambaksari', 'citraland', 'graha famili',
            'lontar', 'manyar sabrangan', 'keputih', 'klampis ngasem'
        ],
        
        'SBY Selatan': [
            # South Surabaya districts  
            'sawahan', 'wonokromo', 'karangpilang', 'jambangan',
            'gayungan', 'wonocolo', 'wiyung',
            
            # Specific areas in South Surabaya
            'pakuwon', 'bukit palma', 'royal residence', 'citra harmoni',
            'jagir', 'margorejo', 'nginden', 'ketintang', 'balas klumprik',
            'dukuh menanggal', 'banyu urip', 'sawunggaling', 'putat',
            'gayungsari', 'menanggal', 'pradah kalikendal', 'jemur wonosari'
        ],
        
        'SBY Timur': [
            # East Surabaya districts
            'mulyorejo', 'sukolilo', 'rungkut', 'tenggilis mejoyo', 'gunung anyar',
            
            # Specific areas in East Surabaya  
            'merr', 'jemursari', 'semolowaru', 'menur pumpungan',
            'mulyosari', 'kali rungkut', 'penjaringan sari', 'medaeng',
            'sidosermo', 'wonorejo', 'kendangsari', 'panjang jiwo',
            'gununganyar', 'rungkut kidul', 'kalijudan', 'dukuh sutorejo',
            'sukomanunggal', 'dukuh pakis'
        ],
        
        'SBY Barat': [
            # West Surabaya districts
            'simokerto', 'bubutan', 'krembangan', 'asemrowo', 'tandes',
            'sukomanunggal',
            
            # Specific areas in West Surabaya
            'pegirian', 'tanah kali kedinding', 'sidotopo', 'magersari',
            'ampel', 'perak barat', 'perak timur', 'nyamplungan', 'bongkaran',
            'krembangan selatan', 'morokrembangan', 'kemayoran', 'gundih',
            'jepara', 'alun alun contong', 'simolawang', 'tambak rejo',
            'rangkah', 'genting kalianak', 'bongkaran'
        ],
        
        'SBY Pusat': [
            # Central Surabaya districts
            'genteng', 'tegalsari', 'gubeng', 'barata jaya',
            
            # Specific areas in Central Surabaya (city center)
            'tunjungan', 'embong malang', 'ketabang', 'dr soetomo', 
            'pemuda', 'pahlawan', 'rajawali', 'kapasan', 'peneleh',
            'petemon', 'kupang', 'darmo', 'diponegoro', 'basuki rahmat',
            'arjuno', 'mayjend sungkono', 'dharmawangsa', 'kertajaya',
            'ngagel', 'mojo', 'gubeng pojok', 'airlangga', 'raya darmo',
            'hr muhammad', 'yos sudarso', 'urip sumoharjo', 'panglima sudirman'
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
        
        # Check each region with priority (Central first, then others)
        region_priority = ['SBY Pusat', 'SBY Utara', 'SBY Selatan', 'SBY Timur', 'SBY Barat']
        
        for region in region_priority:
            keywords = region_mapping[region]
            for keyword in keywords:
                if keyword.lower() in location_text:
                    cafe['region'] = region
                    region_counts[region] += 1
                    cafes_by_region[region].append(cafe['name'])
                    classified = True
                    break
            if classified:
                break
        
        # If not classified, mark as unknown (will be manually reviewed)
        if not classified:
            cafe['region'] = 'Unknown'
            region_counts['Unknown'] += 1
            cafes_by_region['Unknown'].append(cafe['name'])
    
    # Manual classification for some known central locations
    for cafe in cafes:
        if cafe['region'] == 'Unknown':
            location_text = f"{cafe.get('address', '')} {cafe.get('neighborhood', '')}".lower()
            
            # Check for mall names and central locations
            central_indicators = [
                'lenmarc', 'plaza surabaya', 'tunjungan plaza', 'grand city',
                'royal plaza', 'itc surabaya', 'pasar tunjungan', 'galaxy mall',
                'ciputra world', 'pakuwon city', 'pakuwon mall'
            ]
            
            for indicator in central_indicators:
                if indicator in location_text:
                    # Update classification
                    region_counts['Unknown'] -= 1
                    cafes_by_region['Unknown'].remove(cafe['name'])
                    
                    if 'pakuwon' in indicator:
                        cafe['region'] = 'SBY Selatan'
                        region_counts['SBY Selatan'] += 1
                        cafes_by_region['SBY Selatan'].append(cafe['name'])
                    else:
                        cafe['region'] = 'SBY Pusat'
                        region_counts['SBY Pusat'] += 1
                        cafes_by_region['SBY Pusat'].append(cafe['name'])
                    break
    
    # Print results
    print("\n📊 REGION CLASSIFICATION RESULTS")
    print("=" * 50)
    
    # Show in the correct order
    region_order = ['SBY Utara', 'SBY Selatan', 'SBY Timur', 'SBY Barat', 'SBY Pusat', 'Unknown']
    
    total_classified = sum(region_counts.values()) - region_counts['Unknown']
    
    for region in region_order:
        count = region_counts[region]
        percentage = (count / len(cafes)) * 100
        print(f"{region:15}: {count:3d} cafes ({percentage:5.1f}%)")
    
    print(f"{'Total':15}: {len(cafes):3d} cafes")
    print(f"{'Classified':15}: {total_classified:3d} cafes ({(total_classified/len(cafes)*100):5.1f}%)")
    
    # Show sample cafes for each region
    print("\n🏪 SAMPLE CAFES BY REGION")
    print("=" * 50)
    
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
    backup_name = 'cleaned_surabaya_cafes_backup_before_pusat.json'
    with open(backup_name, 'w', encoding='utf-8') as f:
        json.dump([{k: v for k, v in cafe.items() if k != 'region'} for cafe in cafes], f, indent=2, ensure_ascii=False)
    
    with open('cleaned_surabaya_cafes.json', 'w', encoding='utf-8') as f:
        json.dump(cafes, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Region classifications updated with SBY Pusat!")
    print(f"💾 Backup created: {backup_name}")
    print(f"📄 Updated data saved to: cleaned_surabaya_cafes.json")
    
    # Create region summary for frontend use
    region_summary = {
        'total_cafes': len(cafes),
        'regions': {
            region: {
                'count': region_counts[region],
                'percentage': round((region_counts[region] / len(cafes)) * 100, 1)
            }
            for region in region_order if region != 'Unknown'
        }
    }
    
    with open('cafe_regions_summary.json', 'w', encoding='utf-8') as f:
        json.dump(region_summary, f, indent=2, ensure_ascii=False)
    
    print(f"📋 Region summary saved to: cafe_regions_summary.json")
    
    return region_counts

if __name__ == "__main__":
    reclassify_surabaya_regions()