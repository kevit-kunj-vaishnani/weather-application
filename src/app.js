
const express = require('express')
const path = require('path')
const hbs = require('hbs')


const geolocation = require('./utils/export_geolocation.js')
const forecast = require('./utils/export_forecast.js')


const app = express()   // you are creating an instance of an Express application. 'app' object represents web application


const public_path = path.join(__dirname,'../public')      
app.use(express.static(public_path))     


const views_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')


app.set("view engine","hbs")
app.set("views",views_path)                 // for views
hbs.registerPartials(partials_path)         // for partials

app.get('' , (requst,response)  =>  {
    response.render('index',{title:'Weather' , name:'manavi'})
})

app.get("/about", (req,res) => {
    res.render("about" , { title: 'About' , name:'manoj'})
})

app.get("/help", (req,res) => {
    res.render("help" , { title: 'Help' , name:'fonther'})
})

app.get("/weather", (req,res) => {

    if(req.query.address===undefined){
        return res.send({error:'no city specified'})
    }

    async function main()
    {
        const geolocation_response = await geolocation(req.query.address);  //utils file ma export_geolocation.js ma function g return karse e j aya geolocation_response hold karse
        if(geolocation_response.hasOwnProperty("error"))
        {
            res.send(geolocation_response)
        }

        else
        {   
            const forecast_response = await forecast(geolocation_response.latitude, geolocation_response.longitude); // utils file ma export_forecast.js ma function g return karse e j aya forecast_response hold karse
        
            //console.log(geolocation_response);
        
            res.send({ 
                forecast: forecast_response.data,                       // console.log(forecast_response.data); = Ahmedabad has temperature = 37 celcius
                location: forecast_response.perfect_location,           // console.log(req.query.address);      = ahmedabad
                address: req.query.address                              // console.log(forecast_response.perfect_location); = Ahmedabad,India
            })
        }
    }

   main();
})


// when some random thing is written like = localhost:5000/ab then following will displayed
app.get('*', (req,res) => {
    res.send('404 came')
})

app.listen(5000)







/* ........................................................................................................................................

const express = require('express')
const path = require('path')


const app = express()
// const public_directory = path.join(__dirname,'../public')


app.set("view engine", "hbs")

app.get("", (req,res) => {
    res.render("index" ,  {title:'Home Page' , name:'kunj'})
})

app.get("/about", (req,res) => {
    res.render("about" , { title: 'help page' , name:'manoj'})
})

app.listen(5000 , () =>  {
    console.log("server is on port 5000");
})

*/











/*
                                                        simple operation on web server

const express = require('express')
const path = require('path')    

console.log(__dirname);                                             //  /home/dell/Desktop/Kunj/temp/web-server/src
console.log(__filename);                                            //  /home/dell/Desktop/Kunj/temp/web-server/src/app.js
console.log(path.join(__dirname));                                  //  /home/dell/Desktop/Kunj/temp/web-server/src

const app = express() 
// here you are creating an instance of an Express application. 'app' object represents web application

app.get('' , (requst,response)  =>  {
    response.send('hello welcome to home page')
})

app.get('/help' , (requst,response) =>  {
    response.send({
        name:"kunj"
    })
})

app.get('/about' , (requst,response)  =>  {
    response.send('about page')
})

app.get('/weather' , (requst,response) =>  {
    response.send('weather page')
})

app.listen(5000 , () =>  {
    console.log("server is on port 5000");
})

//app.listen() is a method provided by the Express.js framework that is used to start a web server and listen for incoming HTTP requests on a specified port and hostname. 
  
*/