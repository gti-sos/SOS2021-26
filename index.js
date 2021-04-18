//imports
var express = require("express");
var path = require("path");
var Datastore = require('nedb');

const { json } = require("body-parser");

//Attributes
const PORT = (process.env.PORT || 1607);


//Start of the application
var app = express();
app.use(express.json());

var db = new Datastore();

//Static navigation
app.use("/", express.static(path.join(__dirname + "/public"))); 



/*#################################################    Resource: air_routes    ################################################################*/

//Import API


/*#################################################    Resource: culturaBASE    ################################################################*/

//Import API
var culturaBASEAPI = require('./culturaBASEAPI');

culturaBASEAPI.loadDB(app, db);

culturaBASEAPI.httpCRUD(app,db);


/*#################################################    Resource: hostelries    ################################################################*/

//Import API
var hostelriesAPI = require('./hoslteriesAPI');

//load data into DB
hostelriesAPI.loadDB(app,db);

//CRUD
hostelriesAPI.httpCRUD(app,db);




app.listen(PORT, () =>{
    console.log("Server running at port:" + PORT);
});