//imports
var express = require("express");
var path = require("path");
//var bodyParser = require("body-parser"); deprecated!
const { json } = require("body-parser");


//Attributes
const PORT = (process.env.PORT || 1607);
const BASE_API_PATH = "/api/v1";

//Start of the application
var app = express();
app.use(express.json());


//Static navigation
app.use("/", express.static(path.join(__dirname + "/public")));

//Resources: air_routes, culturaBASE, hostelries

/*#################################################    Resource: air_routes    ################################################################*/

//Declaracion del array con todos los recursos
var air_routes_aux = [];

//GET que devuelve el array vacio (la primera vez)
app.get(BASE_API_PATH + "/air_routes", (req,res) => {
    res.send(JSON.stringify(air_routes_aux,null,2));
});

//GET que carga el array de recursos
app.get(BASE_API_PATH+"/air_routes/loadInitialData", (req,res)=>{
    var initialData = [
        {
            "district" : "Madrid",
            "year": 2020,
            "flight": 158405,
            "passenger": 17071089,
            "merchandise": 401133380
        
        },{
            "district" : "Cataluña",
            "year": 2017,
            "flight": 320456,
            "passenger": 47262688,
            "merchandise": 156105304
        },{
            "district": "Andalucía",
            "year": 2020,
            "flight": 78777,
            "passenger": 7441585,
            "merchandise": 10561907
        },{
            "district": "Andalucía",
            "year": 2019,
            "flight": 194370,
            "passenger": 27332163,
            "merchandise": 12971632
        },{
            "district": "Madrid",
            "year": 2019,
            "flight": 417958,
            "passenger": 61703370,
            "merchandise": 558566726
        }
    ]

    air_routes_aux = initialData;
    res.status(201).json(air_routes_aux);
});

//POST de todo
app.post(BASE_API_PATH + "/air_routes", (req,res) => {
    var newResource = req.body;
    console.log(`Nuevo recurso agregado: <${JSON.stringify(newResource,null,2)}>`);
    air_routes_aux.push(newResource);

    res.sendStatus(201);
});

//PUT de todo DEBE DAR ERROR
app.put(BASE_API_PATH + "/air_routes", (req,res) => {
    
    console.log(`Error: No se puede hacer PUT de todo el conjunto `);
    res.sendStatus(405);
});

//DELETE de todo
app.delete(BASE_API_PATH + "/air_routes",(req,res) => {
    air_routes_aux = [];
    res.sendStatus(200);
});

//GET por recurso -distrito-
app.get(BASE_API_PATH + "/air_routes/:urlDistrict", (req,res) => {

    var {urlDistrict} = req.params;    // == var urlDistrict = req.params.urlDistrict

    var ls_data = [];

    for (var i = 0 ; i < air_routes_aux.length; i++){
        if(air_routes_aux[i].district == urlDistrict){
            
            ls_data.push(air_routes_aux[i]);
        }
    };

    if(ls_data.length == 0){
        res.send('El recurso especificado no existe');
    }else{
        res.send(JSON.stringify(ls_data,null,2));
    }
   
});

//GET por recurso -distrito y anyo-
app.get(BASE_API_PATH + "/culturaBASE/:urlDistrict/:urlYear", (req,res) => {

    var {urlDistrict} = req.params;
    var {urlYear} = req.params;

    var res_data = {}
    var resourceFinded = false;

    for (var i = 0 ; i < air_routes_aux.length; i++){
        if(air_routes_aux[i].district == urlDistrict && air_routes_aux[i].year == urlYear){
            
            res_data = air_routes_aux[i];
            resourceFinded = true;
        }
    };

    if(!resourceFinded){
        res.send('El recurso especificado no existe');
    }else{
        res.send(JSON.stringify(res_data,null,2));
    }
   
});

//POST por recurso DEBE DAR ERROR
app.post(BASE_API_PATH + "/air_routes/:urlDistrict/:urlYear", (req,res) => {
    console.log(`Error: No puedes usar POST para recursos individuales `);
    res.sendStatus(405);
});

//DELETE por recuso -distrito-
app.delete(BASE_API_PATH + "/air_routes/:urlDistrict", (req,res) => {
    var {urlDistrict} = req.params;

    const deleted = air_routes_aux.find(resource => resource.district == urlDistrict );

    if(deleted){
        air_routes_aux = air_routes_aux.filter(resource => resource.district != urlDistrict);
        res.status(200).json({ message: `El recurso con el distrito : <${urlDistrict}> fue eliminado`});
    }else{
        res.status(404).json({ message: "El distrito que buscas no existe "});
    }
});

//DELETE por recurso -distrito y anyo-
app.delete(BASE_API_PATH + "/air_routes/:urlDistrict/:urlYear", (req,res) => {
    var {urlDistrict} = req.params;
    var {urlYear} = req.params;

    const deleted = air_routes_aux.find(resource => (resource.district == urlDistrict)&&(resource.year == urlYear));

    if(deleted){
        air_routes_aux = air_routes_aux.filter(resource => (resource.district == urlDistrict)&&(resource.year != urlYear));
        res.status(200).json({ message: `El recurso con el distrito : <${urlDistrict}> y con anyo: <${urlYear}> fue eliminado`});
    }else{
        res.status(404).json({ message: "El recurso que buscas no existe "});
    }
});

//PUT por recurso -distrito y anyo-
app.put(BASE_API_PATH + "/air_routes/:urlDistrict/:urlYear", (req,res) => {
    var {urlDistrict} = req.params;
    var {urlYear} = req.params;
    const index = air_routes_aux.findIndex(resource => (resource.district == urlDistrict)&&(resource.year == urlYear));

    if(index == -1){
        res.status(404).json({ message: "El recurso que buscas no existe "});
    }else{
        air_routes_aux[index]= req.body;
        res.status(200).json(air_routes_aux[index]);
    }

});

/*#################################################    Resource: culturaBASE    ################################################################*/

var r_culturaBASE = [];

app.get(BASE_API_PATH + "/culturaBASE", (req,res) => {
    res.send(JSON.stringify(r_culturaBASE,null,2));
});

app.get(BASE_API_PATH+"/culturaBASE/loadInitialData", (req,res)=>{
    var initialData = [
        {
            "district": "Andalucia",
            "year": "2019",
            "fundraising": 88.3,
            "spectator": 16.4,
            "spending-per-view": 5.4
        },{
            "district": "Madrid",
            "year": "2019",
            "fundraising": 134.3,
            "spectator": 20.7,
            "spending-per-view": 6.5
        },
        {
            "district": "Andalucia",
            "year": "2018",
            "fundraising": 82.0,
            "spectator": 15.1,
            "spending-per-view": 5.4
        },{
            "district": "Madrid",
            "year": "2018",
            "fundraising": 127.8,
            "spectator": 19.3,
            "spending-per-view": 6.6
        },
        {
            "district": "Ceuta y Melilla",
            "year": "2019",
            "fundraising": 0.6,
            "spectator": 0.1,
            "spending-per-view": 5.1
        }
    ]

    r_culturaBASE = initialData;
    res.status(201).json(r_culturaBASE);
});

app.post(BASE_API_PATH + "/culturaBASE", (req,res) => {
    var newResource = req.body;
    console.log(`New resource added: <${JSON.stringify(newResource,null,2)}>`);
    r_culturaBASE.push(newResource);

    res.sendStatus(201);
});

//Error para la tabla azul

app.put(BASE_API_PATH + "/culturaBASE", (req,res) => {
    
    console.log(`Error: Use put method at collector object `);
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/culturaBASE",(req,res) => {
    r_culturaBASE = [];
    res.sendStatus(200);
});

app.get(BASE_API_PATH + "/culturaBASE/:urlDistrict", (req,res) => {

    var {urlDistrict} = req.params;    // == var urlDistrict = req.params.urlDistrict

    var ls_data = [];

    for (var i = 0 ; i < r_culturaBASE.length; i++){
        if(r_culturaBASE[i].district == urlDistrict){
            
            ls_data.push(r_culturaBASE[i]);
        }
    };

    if(ls_data.length == 0){
        res.send('The resource doesn´t exist.')
    }else{
        res.send(JSON.stringify(ls_data,null,2));
    }
   
});

app.get(BASE_API_PATH + "/culturaBASE/:urlDistrict/:urlYear", (req,res) => {

    var {urlDistrict} = req.params;
    var {urlYear} = req.params;

    var res_data = {}
    var resourceFinded = false;
    //console.log(req.params);

    for (var i = 0 ; i < r_culturaBASE.length; i++){
        if(r_culturaBASE[i].district == urlDistrict && r_culturaBASE[i].year == urlYear){
            
            res_data = r_culturaBASE[i];
            resourceFinded = true;
        }
    };

    if(!resourceFinded){
        res.send('The resource doesn´t exist.')
    }else{
        res.send(JSON.stringify(res_data,null,2));
    }
   
});

//Error para la tabla azul

app.post(BASE_API_PATH + "/culturaBASE/:urlDistrict/:urlYear", (req,res) => {
    console.log(`Error: Use post method at element of collector `);
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/culturaBASE/:urlDistrict", (req,res) => {
    var {urlDistrict} = req.params;

    const deleted = r_hostelries.find(resource => resource.district == urlDistrict );

    if(deleted){
        r_hostelries = r_hostelries.filter(resource => resource.district != urlDistrict);
        res.status(200).json({ message: `The resource with district : <${urlDistrict}> was deleted`})
    }else{
        res.status(404).json({ message: "District you are looking for does not exist "})
    }
});


app.delete(BASE_API_PATH + "/culturaBASE/:urlDistrict/:urlYear", (req,res) => {
    var {urlDistrict} = req.params;
    var {urlYear} = req.params;

    const deleted = r_culturaBASE.find(resource => (resource.district == urlDistrict)&&(resource.year == urlYear));

    if(deleted){
        r_culturaBASE = r_culturaBASE.filter(resource => (resource.district == urlDistrict)&&(resource.year != urlYear));
        res.status(200).json({ message: `The resources with district : <${urlDistrict}> and year: <${urlYear}> were deleted`})
    }else{
        res.status(404).json({ message: "The resource you are looking for does not exist "})
    }
});

//Usar formato json al usar POSTMAN !!!!!!!!!!
app.put(BASE_API_PATH + "/culturaBASE/:urlDistrict/:urlYear", (req,res) => {
    var {urlDistrict} = req.params;
    var {urlYear} = req.params;
    const index = r_culturaBASE.findIndex(resource => (resource.district == urlDistrict)&&(resource.year == urlYear));

    if(index == -1){
        res.status(404).json({ message: "The resource you are looking for does not exist "});
    }else{
        r_hostelries[index]= req.body;
        res.status(200).json(r_culturaBASE[index]);
    }

});


/*#################################################    Resource: hostelries   ################################################################*/
var r_hostelries = [];


//Requests of ../hostelries
//GET
app.get(BASE_API_PATH + "/hostelries", (req,res) => {
    res.send(JSON.stringify(r_hostelries,null,2));
});
//LoadInitialDAta
app.get(BASE_API_PATH + "/hostelries/loadInitialData", (req,res) => {
    var initialData = [
        {
            "district"           :   "Andalucia",
            "year"              :   "2020",
            "employee_staff"    :   182681,
            "establishment_open":   17140,
            "traveler_numer"    :   6841779
        },
        {
            "district"           :   "Andalucia",
            "year"              :   "2019",
            "employee_staff"    :   435130,
            "establishment_open":   29557,
            "traveler_numer"    :   19869536
        },
        {
            "district"           :   "Catalonia",
            "year"              :   "2020",
            "employee_staff"    :   147190,
            "establishment_open":   14751,
            "traveler_numer"    :   5787656
        },
        {
            "district"           :   "Catalonia",
            "year"              :   "2019",
            "employee_staff"    :   418558,
            "establishment_open":   27722,
            "traveler_numer"    :   20752391
        },
        {
            "district"           :   "Catalonia",
            "year"              :   "2018",
            "employee_staff"    :   400203,
            "establishment_open":   27213,
            "traveler_numer"    :   20045332
        }
    ];

    r_hostelries = initialData;
    res.status(201).json(r_hostelries);    
});

//POST
app.post(BASE_API_PATH + "/hostelries", (req,res) => {
    var newResource = req.body;
    console.log(`New resource added: <${JSON.stringify(newResource,null,2)}>`);
    r_hostelries.push(newResource);

    res.sendStatus(201);
});
//PUT
app.put(BASE_API_PATH + "/hostelries", (req,res) => {
    
    console.log(`Error: Use put method at collector object `);
    res.sendStatus(405);
});

//DELETE
app.delete(BASE_API_PATH + "/hostelries",(req,res) => {
    //res.send("DELETE Request Called");
    r_hostelries = [];
    res.sendStatus(200);
});

//Request per each resource ->

app.get(BASE_API_PATH + "/hostelries/:urlDistrict", (req,res) => {

    var {urlDistrict} = req.params;    // == var urlDistrict = req.params.urlDistrict

    var ls_data = [];

    for (var i = 0 ; i < r_hostelries.length; i++){
        if(r_hostelries[i].district == urlDistrict){
            
            ls_data.push(r_hostelries[i]);
            //console.log(res_data);
        }
    };

    if(ls_data.length == 0){
        res.send('The resource doesn´t exist.')
    }else{
        res.send(JSON.stringify(ls_data,null,2));
    }
   
});

app.get(BASE_API_PATH + "/hostelries/:urlDistrict/:urlYear", (req,res) => {

    var {urlDistrict} = req.params;
    var {urlYear} = req.params;

    var res_data = {}
    var resourceFinded = false;
    //console.log(req.params);

    for (var i = 0 ; i < r_hostelries.length; i++){
        if(r_hostelries[i].district == urlDistrict && r_hostelries[i].year == urlYear){
            
            res_data = r_hostelries[i];
            resourceFinded = true;
            //console.log(res_data);
        }
    };

    if(!resourceFinded){
        res.send('The resource doesn´t exist.')
    }else{
        res.send(JSON.stringify(res_data,null,2));
    }
   
});


app.post(BASE_API_PATH + "/hostelries/:urlDistrict/:urlYear", (req,res) => {
    console.log(`Error: Use post method at element of collector `);
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/hostelries/:urlDistrict", (req,res) => {
    var {urlDistrict} = req.params;

    const deleted = r_hostelries.find(resource => resource.district == urlDistrict );

    if(deleted){
        r_hostelries = r_hostelries.filter(resource => resource.district != urlDistrict);
        res.status(200).json({ message: `The resource with district : <${urlDistrict}> was deleted`})
    }else{
        res.status(404).json({ message: "District you are looking for does not exist "})
    }
});


app.delete(BASE_API_PATH + "/hostelries/:urlDistrict/:urlYear", (req,res) => {
    var {urlDistrict} = req.params;
    var {urlYear} = req.params;

    const deleted = r_hostelries.find(resource => (resource.district == urlDistrict)&&(resource.year == urlYear));

    if(deleted){
        r_hostelries = r_hostelries.filter(resource => (resource.district == urlDistrict)&&(resource.year != urlYear));
        res.status(200).json({ message: `The resources with district : <${urlDistrict}> and year: <${urlYear}> were deleted`})
    }else{
        res.status(404).json({ message: "The resource you are looking for does not exist "})
    }
});

//Usar formato json al usar POSTMAN !!!!!!!!!!
app.put(BASE_API_PATH + "/hostelries/:urlDistrict/:urlYear", (req,res) => {
    var {urlDistrict} = req.params;
    var {urlYear} = req.params;
    //var updatedResource = req.body;
    const index = r_hostelries.findIndex(resource => (resource.district == urlDistrict)&&(resource.year == urlYear));
    //console.log(index);

    if(index == -1){
        res.status(404).json({ message: "The resource you are looking for does not exist "});
    }else{
        r_hostelries[index]= req.body;
        res.status(200).json(r_hostelries[index]);
    }

});








//Server running

app.listen(PORT, () =>{
    console.log("Server running at port:" + PORT);
});
