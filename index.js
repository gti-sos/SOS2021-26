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

/*var urlGrupo07Proxy = "https://sos2021-07.herokuapp.com";
var grupo07_unemployment = "/api/integration/unemployment";*/
//Proxy Josemari con Grupo07
app.use(cors());

//Static navigation
app.use("/", express.static(path.join(__dirname + "/public"))); 

//####################################################    PROXY

/*Proxy Mateo al Grupo 30*/
var proxyGrupo30 = '/smokers-stats';
var urlProxyGrupo30 = 'https://sos2021-30.herokuapp.com';

app.use(proxyGrupo30, function(req, res) {
    console.log("   --BackEnd:  new Proxy Call");

    var apiServerHost = urlProxyGrupo30;

    console.log(`   ---BackEnd: PORXY -> apiServerHost = <${apiServerHost}>`);
    console.log(`   ---BackEnd: PORXY -> baseUrl = <${req.baseUrl}>`);
    console.log(`   ---BackEnd: PORXY -> url = <${req.url}>`);

    var url = apiServerHost + req.url;

    console.log(`piped: <${req.baseUrl}${req.url} -> ${url}>`);
    req.pipe(request(url)).pipe(res);
});

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