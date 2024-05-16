import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b',
    },
    secondary: {
      main: '#e64a19',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    h4: {
      fontWeight: 600,
      marginBottom: '20px',
    },
  },
})

function App() {
  const [restaurants, setRestaurants] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [cuisines, setCuisines] = useState([])
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('')

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/filters')
      .then((response) => {
        setNeighborhoods(response.data.neighborhoods)
        setCuisines(response.data.cuisines)
      })
      .catch((error) => console.error('Error fetching filter data:', error))
  }, [])

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const params = {}
        if (selectedNeighborhood) params.neighborhood = selectedNeighborhood
        if (selectedCuisine) params.cuisine = selectedCuisine

        const response = await axios.get(
          'http://127.0.0.1:5000/api/restaurants',
          { params },
        )
        setRestaurants(response.data)
      } catch (error) {
        console.error('Error fetching restaurants:', error)
      }
    }

    fetchRestaurants()
  }, [selectedNeighborhood, selectedCuisine])

  const handleReset = () => {
    setSelectedNeighborhood('')
    setSelectedCuisine('')
    setRestaurants([])
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">What Should I Eat? 🤔</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
        >
          Results from @sadman_shanbro's favorite instagram foodies
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={5}
          >
            <FormControl fullWidth>
              <InputLabel>Neighborhood</InputLabel>
              <Select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {neighborhoods.map((neighborhood) => (
                  <MenuItem
                    key={neighborhood}
                    value={neighborhood}
                  >
                    {neighborhood}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
          >
            <FormControl fullWidth>
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cuisines.map((cuisine) => (
                  <MenuItem
                    key={cuisine}
                    value={cuisine}
                  >
                    {cuisine}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              fullWidth
              style={{ height: '56px' }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          style={{ marginTop: '20px' }}
        >
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={restaurant.restaurant_name}
              >
                <Tooltip
                  title={`Instagram: ${restaurant.instagram}\n\nFamous for: ${restaurant.famous_for}`}
                  arrow
                  placement="top"
                >
                  <Card>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="h2"
                      >
                        {restaurant.restaurant_name}
                      </Typography>
                      <Typography color="textSecondary">
                        {restaurant.address}
                      </Typography>
                      {restaurant.restaurant_type && (
                        <Typography color="textSecondary">
                          {restaurant.restaurant_type.join(', ')}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}
            >
              No restaurants found. Please adjust your filters.
            </Typography>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
