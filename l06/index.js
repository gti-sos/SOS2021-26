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

//Recursos: air_routes, cultyraBASE, hostelries

/*#################################################    Recurso: air_routes    ################################################################*/


/*#################################################    Recurso: culturaBASE    ################################################################*/

var r_culturaBASE = [
    {
        "district": "Andalucia",
        "year": 2019,
        "fundraising": 88.3,
        "spectator": 16.4,
        "spending-per-view": 5.4
    },
    {
        "district": "Madrid",
        "year": 2019,
        "fundraising": 134.3,
        "spectator": 20.7,
        "spending-per-view": 6.5
    }
];




/*#################################################    Recurso: hostelries   ################################################################*/
var r_hostelries = [
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


//Requests of ../hostelries
//GET
app.get(BASE_API_PATH + "/hostelries", (req,res) => {
    res.send(JSON.stringify(r_hostelries,null,2));
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
