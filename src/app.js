const express = require('express');
const hbs = require('hbs');
const path = require('path');
const { geocode, weather } = require('./utils/utils');
const app = express();
const port = process.env.PORT || 3000;

//Define paths
const public = path.join(__dirname, '../public');
const partials = path.join(__dirname, './partials');

// Setup hbs
app.set('view engine', 'hbs');
hbs.registerPartials(partials);

// Setup public, static directory to serve files
app.use(express.static(public));

// ---------------------------
// --------- ROUTES ----------
// ---------------------------

app.get('/', (req, res) => {
  console.log(req.query);
  res.render('index', {
    title: 'Homepage',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help-page',
  });
});

app.get('/about', (req, res) => {
  res.render('./about', {
    title: 'About-page',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please enter a address' });
  }
  geocode(req.query.address, (error, geoData) => {
    if (error) {
      return res.send(error.message);
    }
    weather(geoData.lat, geoData.long, (error, weatherData) => {
      if (error) {
        return res.send(error.message);
      }
      res.send({ location: geoData.location, ...weatherData });
    });
  });
});

app.get('/*', (req, res) => {
  res.render('./404');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
