# myBgLive

<p>This web application fetches Dexcom Glucose Monitoring System data from a Heroku server and displays it using Chart.js. The data can be viewed in 4 Hour, 8 Hour, and 12 Hour segments by selecting each corresponding button.
Data is read in 5-minute increments. The time the data was read is displayed on the x-axis. The blood sugar value (BG Value) is on the y-axis.</p>

#### Features
<p>When hovering over the datapoints, the full date, time, and BG value is displayed.<br>
The datapoint changes color based on pre-set BG values.<br>
*Blue datapoints are within range.<br>
*Orange datapoints are above range.<br>
*Pink datapoints are below range.</p>

#### Future Development
Add a date-picker to compare blood sugar data between days.

### Dependencies 
The Chart.js library (v3.9.1)\
FontAwesome\
Server that hosts Dexcom data (CORS must be enabled)\

## How to Use this Project
<p>In app.js on line 7 change url to your server link but do not include the count number.
Example: 'https://YOURSERVER.herokuapp.com/api/v1/entries/sgv.json?count=' <br>
CORS must be enabled on your server to allow access. </p>
