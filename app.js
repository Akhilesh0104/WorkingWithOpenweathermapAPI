// JavaScript source code
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    var query = req.body.cityName;
    var appKey = "91ad63d9bc527b575ec2372f636e0750";
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;
    https.get(url, function (apiResponse) {
   
        apiResponse.on("data", function (data) {
            //console.log(data);                      // it will generate a data in hexadeciaml code

            const weatherData = JSON.parse(data);     // it will convert any type of data in to JSON format

            //console.log(wetherData);

            //const myObject = {
            //    name:"Akhilesh",
            //    Age:"22",
            //    living:"Prayagraj"                  // it will generate the myObject in form of strying
            //    }                                   // output - {"name":"Akhilesh","Age":"22","living":"Prayagraj"}

            //console.log(JSON.stringify(myObject));

            // We can use res.send only one in whole app.get method and we can use as many res.write method;

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherImage = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1> Place : " + weatherData.name+"</h1>")
            res.write("<p> Co-ordinate of the " + query + "</p>");
            res.write("<p> Longitude :  " + weatherData.coord.lon + "     Latitude :=> " + weatherData.coord.lat +"</p>");
            
            res.write("<h1>The temp of the " + query + " is " + temp + "</h1>");

            res.write("<p> The wether description is " + description + "</p>")
            res.write("<img src = " + weatherImage + ">");

            res.write("<p> Pressure : " + weatherData.main.pressure + " Humidity : " + weatherData.main.humidity+"</p>");

            res.write("<p> Visibility : " + weatherData.visibility + "</p>")


            res.send();
        })
    })

});




//port number , call back funtion

app.listen(3000, function () {
    console.log("We are running on 3000");
})