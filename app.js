const express = require("express");
const app = express();


const rotaProdutos = require("./routers/produto")

app.use("/produto", rotaProdutos);


module.exports = app;
