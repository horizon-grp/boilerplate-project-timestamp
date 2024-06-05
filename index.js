// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// -------------- start
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  // If no date parameter is provided, return the current time
  if (!dateParam) {
    const currentTime = new Date();
    return res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString(),
    });
  }

  // Try to parse the date parameter
  const date = new Date(dateParam);

  // If the date is invalid, return an error object
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the parsed date in the required format
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// ------------ end

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
