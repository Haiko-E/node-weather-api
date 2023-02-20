const request = require('postman-request');

function geocode(address, callback) {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFpa29lcmlua3ZlbGQiLCJhIjoiY2wwY2djbHZkMDFvNTNjbXVzcGU4ZGU3byJ9.N7jLxiMg7neHKPtzAr3ssA&limit=1`;

  request({ url: mapboxUrl, json: true }, function (error, response, body) {
    if (error) {
      callback(error.message);
    } else if (body.features.length === 0) {
      callback(new Error('unable to find location').message);
    } else {
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(null, { lat, long, location });
    }
  });
}

function weather(lat, long, callback) {
  const url = `http://api.weatherstack.com/current?access_key=ba3d7c9b81b4514e8c6642342739b98d&query=${lat},${long}`;

  request({ url, json: true }, function (error, response, body) {
    if (body.error) {
      callback(new Error('could not find weather for given location'));
    } else if (error) {
      callback(error.message);
    } else {
      callback(null, body.current);
    }
  });
}

module.exports = {
  geocode,
  weather,
};
