const express = require("express");
const connectToDataBase = require("./src/database/database")

const app = express();

const port = 3000;

app.use(express.json());

connectToDataBase();

app.get("/", (req,res) => {
    res.send({
        message: "Bem vindo ao nosso app",
    });
    
});

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});