const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

server.post("/posts", function (req, res) {
  console.log(req.body);
  //res.send('hola desde post')
  let { author, title, contents } = req.body;
  console.log("tengo", author, title, contents);
  if (author && title && contents) {
    let objPost = {
      id: publications.length + 1,
      author,
      title,
      contents,
    };
    publications.push(objPost);
    console.log("publicasiones", publications);
    res.json(objPost);
  } else {
    let objError = {
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    };
    //console.log(objError);
    res.status(400).json(objError);
  }
});

server.get("/posts?", function (req, res) {
  let { author, title } = req.query;
  const filtredPublicacions = publications.filter((e) => {
    return e.author === author && e.title === title;
  });

  if (filtredPublicacions.length > 0) {
    res.status(200).json(filtredPublicacions);
  } else {
    let objError = {
      error: "No existe ninguna publicación con dicho título y autor indicado",
    };
    res.status(400).json(objError);
  }
});

server.get("/posts/:author", function (req, res) {
  console.log("para", req.params);
  let { author } = req.query;
  const filtredPublicacions = publications.filter((e) => {
    return e.author === author;
  });

  if (filtredPublicacions.length > 0) {
    res.status(200).json(filtredPublicacions);
  } else {
    let objError = {
      error: "No existe ninguna publicación del autor indicado",
    };
    res.status(400).json(objError);
  }
});

server.put("/posts/:id", function (req, res) {
  const { id } = req.params;
  const { title, contents } = req.body;
  const updatedElem = publications.find((e) => {
    return e.id === id;
  });
  console.log("put updated:", updatedElem);
  if (!updatedElem) {
    let objError = {
      error:
        "No se recibió el id correcto necesario para modificar la publicación",
    };
    res.status(400).json(objError);
  } else if (title && contents) {
    let objUpdate = {
      id: updatedElem.id,
      author: updatedElem.author,
      title: title,
      contents: contents,
    };
    publications.filter((e) => e.id !== id);
    publications.push(objUpdate);
    res.json(objUpdate);
  } else {
    let objError = {
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    };
    res.status(400).json(objError);
  }
});

server.delete("/posts/:id", function (req, res) {
  const { id } = req.params;
  const delElem = publications.find((e) => {
    return e.id === id;
  });

  if (!delElem) {
    let objError = {
      error:
        "No se recibió el id correcto necesario para eliminar la publicación",
    };
    res.status(400).json(objError);
  } else {
    let objDelSucc = {
      success: true,
    };
    publications.filter((e) => e.id !== id);
    res.json(objDelSucc);
  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
