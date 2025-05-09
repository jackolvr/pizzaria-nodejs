const express = require("express");
const connectToDataBase = require("./src/database/database");
const usuario = require("./src/router/usuario.router");
const auth = require("./src/router/auth.router");
const produto = require("./src/router/produto.router");
const categoria = require("./src/router/categoria.router");
const carrinho = require("./src/router/carrinho.router");
const docs = require("./src/router/docs.router");
require('dotenv').config();

const app = express();

const port = 3000;

app.use(express.json());

connectToDataBase();

app.use("/usuario", usuario);
app.use("/auth", auth);
app.use("/produto", produto);
app.use("/categoria", categoria);
app.use("/carrinho", carrinho);
app.use("/docs", docs);

app.get("/", (req,res) => {
    res.send({
        message: "Bem vindo ao nosso app",
    });
    
});

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});
