/*Modulos empleados:
    * Express
*/

/*Comandos empleados:
    * https://gist.github.com/pafmon/e810838282d995608b6d30f90b2380e3
*/
1.31
//Express
var express = require ("express");
var path = require("path");

var app = express();
//var port = 10000;  Solo para local
var port = process.env.port || 10000;  //Tanto local como para heroku

//configurar ruta del server -> Contenido Dinámico
/*
app.get("/", (request, response) => {
    //response.send("Hello from this tiny server");
    response.send("<html><body><h1>Hello from this tiny server</h1><p>Practica L05-SOS-2021.</p></body></html>");

    //Importante notificar el evento dentro del CALLBACK
    console.log("|| DENTRO DEL CALLBACK || Server ready listening on port: " + port);
    console.log(`|| DENTRO DEL CALLBACK || Server ready listening on port: ${port}`);
});
*/

//configurar ruta del server -> Contenido Estático
app.use("/", express.static(path.join(__dirname, "public")));   //Busca x del request(../x.html) en el folder "public"
                                                                //__dirname:devuelve la carpeta donde se ejecuta el npm start -> mejor que "./directorio"
                                                                //path.join: permite concatenar un conjunto de directorios independiende del Sistm. Operativo.

app.get("/hello", (request, response) => {
    //response.send("Hello from this tiny server");
    response.send("<html><body><h1>GET: Hello from this tiny server</h1><p>Practica L05-SOS-2021.</p></body></html>");

    //Importante notificar el evento dentro del CALLBACK
    console.log("|| DENTRO DEL CALLBACK || Server ready listening on port: " + port);
    console.log(`|| DENTRO DEL CALLBACK || Server ready listening on port: ${port}`);
});

//Para comprobar POST se debe de utilizar el POSTMAN
app.post("/hello", (request, response) => {
    //response.send("Hello from this tiny server");
    response.send("<html><body><h1>POST: Hello from this tiny server</h1><p>Practica L05-SOS-2021.</p></body></html>");

    //Importante notificar el evento dentro del CALLBACK
    console.log("|| DENTRO DEL CALLBACK || Server ready listening on port: " + port);
    console.log(`|| DENTRO DEL CALLBACK || Server ready listening on port: ${port}`);
});

//Arrancar server
app.listen(port);

//console.log("Server ready listening on port: " + port);
//console.log(`Server ready listening on port: ${port}`);