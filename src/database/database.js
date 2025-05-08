const mongoose = require("mongoose");

function connectToDataBase() {
    mongoose.connect(process.env.URLDATABASE)
    .then(() => {
        console.log("MONGO DB CONECTADO")
    })
    .catch((err) => {
        return console.log(`Erro na conexao com o banco: ${err}`);
    });
}

module.exports = connectToDataBase;