import React from 'react'
import { ListGroup } from 'react-bootstrap'

function RestaurantList({ restaurants }) {
  if (restaurants.length === 0) {
    return (
      <p className="text-center mt-4">
        No restaurants found. Try different filters!
      </p>
    )
  }

  return (
    <ListGroup
      variant="flush"
      className="mt-4"
    >
      {restaurants.map((restaurant, idx) => (
        <ListGroup.Item key={idx}>
          <h5>{restaurant.restaurant_name}</h5>
          <p>{restaurant.address}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default RestaurantList
