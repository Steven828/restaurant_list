// define related server avaribles
const express = require('express')
const restaurantList = require('./restaurant.json')
const port = 3000
const app = express()

// setting static file
app.use(express.static('public'))

// setting express template engine
const exphbs = require('express-handlebars')
const { application } = require('express')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
// setting detail route
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})
// setting search route
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().trim().includes(keyword.toLowerCase().trim()) || restaurant.category.toLowerCase().trim().includes(keyword.toLowerCase().trim())
  })
  if (restaurants.length === 0) {
    res.render('notfind', { keyword: keyword })
  } else {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  }
})

// start and listen server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})