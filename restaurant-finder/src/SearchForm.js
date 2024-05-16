import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function SearchForm({ filters, onSearch }) {
  const [neighborhood, setNeighborhood] = useState('')
  const [cuisine, setCuisine] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch({ neighborhood, cuisine })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col
          md={6}
          sm={12}
        >
          <Form.Group controlId="neighborhood">
            <Form.Label>Neighborhood</Form.Label>
            <Form.Control
              as="select"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            >
              <option value="">Select a Neighborhood</option>
              {filters.neighborhoods.map((n, idx) => (
                <option
                  key={idx}
                  value={n}
                >
                  {n}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col
          md={6}
          sm={12}
        >
          <Form.Group controlId="cuisine">
            <Form.Label>Cuisine</Form.Label>
            <Form.Control
              as="select"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="">Select a Cuisine</option>
              {filters.cuisines.map((c, idx) => (
                <option
                  key={idx}
                  value={c}
                >
                  {c}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button
        type="submit"
        variant="primary"
        block
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchForm
