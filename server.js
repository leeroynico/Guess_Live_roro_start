const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const mongo = require("./mongo");
const PORT = process.env.PORT;

app.get("/", (_, response) => {
  response.sendFile(path.join(__dirname, "./client/index.html"));
});

//générer une url api
// app.get("/api/monget", (_, response) => {
//   response.send({
//     msg: "salut les mongets !",
//   });
// });

app.listen(PORT, () => {
  console.log(`serveur is start at port ${PORT}`);
});
