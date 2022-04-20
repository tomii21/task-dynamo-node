const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getData, saveData } = require("./dynamobd/dynamo");

const app = express();

//CONFIG SERVIDOR
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "public/views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
//PUERTO DE SERVIDOR
app.listen(3000, () => {
  console.log("escuchando");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/notas", async (req, res) => {
  const notas = await getData();

  res.render("notas", {
    tareas: notas.Items,
  });
});

let i = 0;
app.post("/", async (req, res) => {
  const Item = {
    id: i++,
    titulo: req.body.titulo,
    notas: req.body.anotacion,
    fecha: new Date().getDay(),
  };
  try {
    await saveData(Item);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
