const { Console } = require("console");
var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;


const server = http.createServer((req, res) => {
    console.log(`Server raised in port ${PORT}`);
    console.log(`URL ${req.url}`);
    if (req.url === "/api") {
      const html = fs.readFile(__dirname + "/utils/DogsData.json", (err,data)=>{
        if (err) {
          console.log("404");
          res.writeHead(404, { "Content-Type":"text/plain" })
          return res.end("json not found")
        } else {
          console.log("200");
          res.writeHead(200, { "Content-Type":"application/json" });
          return res.end(data);
        }//
        } )
      }
    if (req.url === "/allDogs"){
      //console.log("dsajk");
      const html = fs.readFile('./utils/allDogs.html', "utf-8", (err,data)=>{
        if (err) {
          console.log("404");
          res.writeHead(404, { "Content-Type":"text/plain" } )
          return res.end("html not found")
        } else {
          console.log("200");
          res.writeHead(200, { "Content-Type":"text/html" });
          return res.end(data);
        }//
        } )
      if (8) {
        
      }
    } else{
      console.log("fuer ade ruta");
      // res.writeHead(404, { "Content-Type":"text/plain" }, "Route not found");
      // res.end();
      res.writeHead(404); //Ponemos el status del response a 404: Not Found
		  res.end("Route not found"); //No devolvemos nada más que el estado.
    }
     
      
     return;
    }).listen(PORT, "localhost");

    /* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
    module.exports =
      /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
      server;