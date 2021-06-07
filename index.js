//imports
var express = require("express");
var path = require("path");
const { json } = require("body-parser");
const cors = require("cors")
const request = require('request');


//Attributes
const PORT = (process.env.PORT || 1607);


//Start of the application
var app = express();
app.use(express.json());


app.use(cors());

//Static navigation
app.use("/", express.static(path.join(__dirname + "/public"))); 


//####################################### BACK-END 

//############################ BPROXY
//Proxy Josemari con Grupo07
var urlGrupo07Proxy = "https://sos2021-07.herokuapp.com";
var grupo07_unemployment = "/api/integration/unemployment";


/*Uso de proxy de 07*/
app.use(grupo07_unemployment, function(req, res) {
        var apiServerHost = urlGrupo07Proxy;

        var url = apiServerHost + req.url;
        console.log('piped: ' + req.url);
        req.pipe(request(url)).pipe(res);
});

//Proxy para compartir API
app.use("/proxy", function(req, res) {
        
    console.log("   --BackEnd:  new Proxy Call");

    var apiServerHost = 'https://sos2021-26.herokuapp.com';
    var url = apiServerHost + req.url;
    
    console.log(`   ---BackEnd: PORXY -> apiServerHost = <${apiServerHost}>`);
    console.log(`   ---BackEnd: PORXY -> baseUrl = <${req.baseUrl}>`);

    console.log(`piped: <${req.baseUrl}${req.url} -> ${url}>`);
    req.pipe(request(url)).pipe(res);
    
});

/*Proxy Mateo al Grupo 30*/
var proxyGrupo30 = '/smokers-stats';
var urlProxyGrupo30 = 'https://sos2021-30.herokuapp.com';

app.use(proxyGrupo30, function(req, res) {
    console.log("   --BackEnd:  new Proxy Call");

    var apiServerHost = urlProxyGrupo30;
    var url = apiServerHost + req.url;

    console.log(`   ---BackEnd: PORXY -> apiServerHost = <${apiServerHost}>`);
    console.log(`   ---BackEnd: PORXY -> baseUrl = <${req.baseUrl}>`);
    console.log(`   ---BackEnd: PORXY -> url = <${req.url}>`);

    console.log(`piped: <${req.baseUrl}${req.url} -> ${url}>`);
    req.pipe(request(url)).pipe(res);
});

//############################ CRUD

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

//Runing server
app.listen(PORT, () =>{
    console.log("Server running at port:" + PORT);
});