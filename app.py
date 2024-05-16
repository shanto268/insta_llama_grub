import json

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allows all domains for the API routes

# Load restaurant data
with open('results/combined_recs.json', 'r') as file:
    restaurants = json.load(file)

@app.route('/api/restaurants', methods=['GET'])
def get_restaurants():
    neighborhood = request.args.get('neighborhood')
    cuisine = request.args.get('cuisine')

    filtered_restaurants = []
    for r in restaurants:
        if (not neighborhood or neighborhood in r['location_tag']) and (not cuisine or cuisine in r['cuisine']):
            if r['restaurant_name'] and r['address']:  # Ensure non-empty name and address
                filtered_restaurants.append({
                    'restaurant_name': r['restaurant_name'],
                    'address': r['address'],
                    'cuisine': r['cuisine'],
                    'location_tag': r['location_tag'],
                    'instagram': r.get('instagram', ''),
                    'famous_for': r.get('famous_for', '')
                })
    
    print("Filtered Restaurants:", filtered_restaurants)  # Debug print
    return jsonify(filtered_restaurants)

@app.route('/api/filters', methods=['GET'])
def get_filters():
    neighborhoods = set()
    cuisines = set()
    for restaurant in restaurants:
        neighborhoods.update(restaurant['location_tag'])
        cuisines.update(restaurant['cuisine'])
    
    return jsonify({
        'neighborhoods': sorted(list(neighborhoods)),
        'cuisines': sorted(list(cuisines))
    })

if __name__ == '__main__':
    app.run(debug=True)