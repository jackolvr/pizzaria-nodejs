const mongoose = require("mongoose");

function connectToDataBase() {
    mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        console.log("MONGO DB CONECTADO")
    })
    .catch((err) => {
        return console.log(`Erro na conexao com o banco: ${err}`);
    });
}

module.exports = connectToDataBase;