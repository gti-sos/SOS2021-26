var express = require("express");

var app = express();

var port = (process.env.PORT|| 10000);  //Tanto local como para heroku

var path = require("path");

app.use("/",express.static(path.join(__dirname + "/public")));

app.get("/info/culturaBASE", (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
    border: 1px solid black;
}
</style>
</head>
<body>

<h3> <a href=" http://estadisticas.mecd.gob.es/CulturaDynPx/culturabase/index.htm?type=pcaxis&path=/t20/p20/a2005/&file=pcaxis#"> Enlace de referencia </a>
</h3>

<table>
    <colgroup>
    <col style="background-color:#f2f2f2">
    </colgroup>
    <tr>
    <th>district</th>
    <th>year</th>
    <th>fundraising</th>
    <th>spectator</th>
    <th>spending_per_view</th>
    </tr>
    <tr>
    <td>Andalucia</td>
    <td>2019</td>
    <td>88.3</td>
    <td>16.4</td>
    <td>5.4</td>
    </tr>
    <tr>
    <td>Andalucia</td>
    <td>2018</td>
    <td>82.0</td>
    <td>15.1</td>
    <td>5.4</td>
    </tr>

    <tr>
    <td>Madrid</td>
    <td>2019</td>
    <td>134.3</td>
    <td>20.7</td>
    <td>6.5</td>
    </tr>

    <tr>
    <td>Madrid</td>
    <td>2018</td>
    <td>127.8</td>
    <td>19.3</td>
    <td>6.6</td>
    </tr>

    <tr>
    <td>Ceuta y Melilla</td>
    <td>2019</td>
    <td>0.6</td>
    <td>0.1</td>
    <td>5.1</td>
    </tr>
</table>

</body>
</html>`);
});

app.get("/info/air_routes", (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
border: 1px solid black;
}
</style>
</head>
<body>

<h3> <a href=" https://www.fomento.gob.es/BE/?nivel=2&orden=03000000"> Enlace de referencia </a>
</h3>

<table>
<colgroup>
<col style="background-color:#blue">
</colgroup>
<tr>
<th>district</th>
<th>year</th>
<th>flight</th>
<th>passenger</th>
<th>total_good(kg)</th>
</tr>
<tr>
<td>Madrid</td>
<td>2020</td>
<td>158405</td>
<td>17071089</td>
<td>401133380</td>
</tr>
<tr>
<td>Cataluña</td>
<td>2017</td>
<td>320456</td>
<td>47262688</td>
<td>156105304</td>
</tr>

<tr>
<td>Andalucía</td>
<td>2020</td>
<td>78777</td>
<td>7441585</td>
<td>10561907</td>
</tr>

<tr>
<td>Andalucía</td>
<td>2019</td>
<td>194370</td>
<td>27332163</td>
<td>12971632</td>
</tr>

<tr>
<td>Madrid</td>
<td>2019</td>
<td>417958</td>
<td>61703370</td>
<td>558566726</td>
</tr>
</table>

</body>
</html>`);
});


app.get("/info/hostelries", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
<head>
<style>
table, th, td {
    border: 1px solid black;
}
</style>
</head>
<body>

<h3> <a href=" https://www.ine.es/jaxiT3/Tabla.htm?t=2066&L=0"> Enlace de referencia </a>
</h3>

<table>
    <colgroup>
    <col style="background-color:#f2f2f2">
    </colgroup>
    <tr>
    <th>district</th>
    <th>year</th>
    <th>employee_staff</th>
    <th>establishment_open </th>
    <th>traveler_number</th>
    </tr>
    <tr>
    <td>Andalucia</td>
    <td>2020</td>
    <td>182,681</td>
    <td>17,140</td>
    <td>6,841,779</td>
    </tr>
    <tr>
    <td>Andalucia</td>
    <td>2019</td>
    <td>435,130</td>
    <td>29,557</td>
    <td>19,869,536</td>
    </tr>

    <tr>
    <td>Catalonia</td>
    <td>2020</td>
    <td>147,190</td>
    <td>14,751</td>
    <td>5,787,656</td>
    </tr>

    <tr>
    <td>Catalonia</td>
    <td>2019</td>
    <td>418,558</td>
    <td>27,722</td>
    <td>20,752,391</td>
    </tr>

    <tr>
    <td>Catalonia</td>
    <td>2018</td>
    <td>400,203</td>
    <td>27,213</td>
    <td>20,045,332</td>
    </tr>
</table>

</body>
</html>`);
});

//Arrancar server
app.listen(port, () => {
    console.log("Dentro callback- Server ready on port " +port);
});


/*version del l06*/


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

//Resources: air_routes, cultyraBASE, hostelries

/*#################################################    Resource: air_routes    ################################################################*/


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

