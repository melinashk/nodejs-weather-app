const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting handlebars
app.set('view engine', 'hbs') //setting Handlebars
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Melina Shakya'
  })
})

app.get('/about', (req, res) =>{
  res.render('about', {
    title: 'About me',
    name: 'Melina Shakya'
  })
})


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'How may I help you?',
    name: 'Melina Shakya'
  } 
  )
})


app.get('', (req, res) => {
  res.send('<h1>Weather</h1>')
})

// app.get('/help', (req, res) => {
//   res.send([{
//     name: 'Melina'
//   }, {
//     name: 'Sarah',
//   }])
// })

// app.get('/about', (req, res) =>{
//   res.send('<h1>about page</h1>')
// })

app.get('/weather', (req, res) =>{
  res.send({
    forecast: 'It is snowing',
    location: 'Kathmandu'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search){
    res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Melina Shakya',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Melina Shakya',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})