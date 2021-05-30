//imports
var express = require("express");
var path = require("path");
const { json } = require("body-parser");
const cors = require("cors")

//Attributes
const PORT = (process.env.PORT || 1607);


//Start of the application
var app = express();
app.use(express.json());
//app.use(cors());

//Static navigation
app.use("/", express.static(path.join(__dirname + "/public"))); 

//####################################### BACK-END 

//Hostelry API
const hostelryBackAPI = require('./src/back/hostelriesAPI/v2/index');
const hostelryBackAPIV2 = require('./src/back/hostelriesAPI/v1/index');
hostelryBackAPI(app);
hostelryBackAPIV2(app);

//CulturaBASE API

const culturaBASEBackAPI = require('./src/back/culturaBASEAPI/v1/index');
const culturaBASEBackAPI2 = require('./src/back/culturaBASEAPI/v2/index');
culturaBASEBackAPI(app);
culturaBASEBackAPI2(app);

//####################################### FRONT-END

//Runing server
app.listen(PORT, () =>{
    console.log("Server running at port:" + PORT);
});