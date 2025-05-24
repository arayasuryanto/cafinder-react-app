#!/usr/bin/env python3
"""
Test Apify API with a simple request
"""

import json
import requests
import time

# Apify API configuration
APIFY_API_KEY = "apify_api_yvY6Ie86hYrYps6QySWzHJXA8ZlAo81W6tdH"
APIFY_ACTOR_ID = "nwua9Gu5YrADL7ZDj"  # Google Maps Scraper actor
BASE_URL = "https://api.apify.com/v2"

def test_simple_search():
    """Test with a simple search"""
    
    # Test with just one cafe
    actor_input = {
        "searchStringsArray": ["Filgud+ Surabaya"],
        "maxCrawledPlaces": 1,
        "language": "en",
        "countryCode": "id"
    }
    
    # Start the actor run
    start_url = f"{BASE_URL}/acts/{APIFY_ACTOR_ID}/runs"
    headers = {
        "Authorization": f"Bearer {APIFY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    print("Testing Apify with simple search...")
    print(f"Input: {json.dumps(actor_input, indent=2)}")
    
    response = requests.post(start_url, json=actor_input, headers=headers)
    
    print(f"Response status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code != 201:
        return False
    
    run_info = response.json()
    run_id = run_info["data"]["id"]
    print(f"Actor run started with ID: {run_id}")
    
    # Wait for completion
    status_url = f"{BASE_URL}/actor-runs/{run_id}"
    
    for i in range(30):  # Wait max 15 minutes
        time.sleep(30)
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        status = status_data["data"]["status"]
        
        print(f"Run status: {status}")
        
        if status in ["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"]:
            break
    
    if status == "SUCCEEDED":
        # Get results
        dataset_url = f"{BASE_URL}/actor-runs/{run_id}/dataset/items"
        result_response = requests.get(dataset_url, headers=headers)
        
        if result_response.status_code == 200:
            results = result_response.json()
            print(f"Results: {json.dumps(results, indent=2)}")
            return True
    else:
        # Get logs for debugging
        logs_url = f"{BASE_URL}/actor-runs/{run_id}/log"
        logs_response = requests.get(logs_url, headers=headers)
        print(f"Logs: {logs_response.text}")
    
    return False

if __name__ == "__main__":
    test_simple_search()