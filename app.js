const express= require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" ,function(req, res) {
  res.sendFile(__dirname +"/index.html");
});
app.post("/", function(req,res){
   const query = req.body.cityName;
   const appkey= "06a1a859190d33236ed837339e0294f4";
   const unit= "metric";
const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units=" +unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const des= weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imgUrl= "http://openweathermap.org/img/wn/" + icon +"@2x.png";
    res.write("<p> The weather is currently "+des);
    res.write("<h1>The temperature in "+query+" is " + temp +" degrees Celsius </h><br>" );
    res.write("<img src=" + imgUrl +">");
    res.send();
    });

  });
});



app.listen(3000, function(req,res) {
  console.log("Connection started at 3000.");

});
