const express = require('express');
const path    = require('path');
const hbs     = require('hbs');
const app     = express();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const PunkAPI = new PunkAPIWrapper();
const randomBeer = PunkAPI.getRandom();

// *view engine setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')
//home route
app.get('/', (req, res, next) => {
  res.render('index');
});

//beers route
app.get("/beers", function(req, res, next){
 PunkAPI.getBeers()
 .then(showBeers => {
   console.log(showBeers)
   res.render('beers', {showBeers})

  })
  .catch(error => {
    console.log(error)
  })
})

//random beer route
app.get("/random-beers", function(req, res, next){
  PunkAPI.getRandom()
  .then(randomBeers => {
    console.log(randomBeers)
    res.render('randomBeer', {randomBeers})

  })
  .catch(error => {
    console.log(error)
  })
})

//beer partial
hbs.registerPartials(__dirname + '/views/partials')


app.listen(3000);