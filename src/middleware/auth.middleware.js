const jwt = require("jsonwebtoken");
const { findUserById } = require("../service/usuario.service");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({message: "o token no foi informado"});
    }
    const parts = authHeader.split(" "); //["Bearer, <token>"]

    if(parts.length !== 2){
        return res.status(401).send({message: "token invalido"});   
    }
    const [schema, token ] = parts;

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({message: "token malformado"});
    }
    
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) =>{ 
    if(err){
        return res.status(401).send({message: "token invalido"});
    }
    let usuario;
    try {
        usuario = await findUserById(decoded.id);
    } catch (error) {
        return res.status(401).send({ message: "token invalido" });
    }

    if(!usuario || !usuario.data){
        return res.status(401).send({message: "token invalido"});
    }

    req.usuarioId = usuario.data._id;

    return next();

    });
}
