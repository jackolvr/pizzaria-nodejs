const usuarioService = require("../service/usuario.service");

const findUserByIdController = async (req, res) => {
    try{
        const id = req.params.id;
        const usuario = await usuarioService.findUserById(id);
        return res.status(200).send(usuario);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente`});
    }
};

const findAllUsersController = async (req, res) => {
    try{
        const usuarios = await usuarioService.findAllUsers();
        return res.status(200).send(usuarios);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente`});
    }
};

const createUserController = async (req, res) => {
    try{
        const usuario = await usuarioService.createUser(req.body);
        return res.status(201).send(usuario);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente`});
    }
};

const updateUserController = async (req, res) => {
    try{
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.updateUser(id, req.body);
        return res.status(200).send(usuarioAtualizado);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente`});
    }
};

const removeUserController = async (req, res) => {
    try{
        const id = req.params.id;
        const resultado = await usuarioService.removeUser(id);
        return res.status(200).send(resultado);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente`});
    }
};

const addAddressController = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.addAddress(id, req.body);
        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente` });
    }
};

const addFavProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.addFavProduct(id, req.body);
        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente` });
    }
};

const removeAddressController = async (req, res) => {
    try {
        const usuarioAtualizado = await usuarioService.removeAddress(req.body);
        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente` });
    }
};

const removeFavProductController = async (req, res) => {
    try {
        const usuarioAtualizado = await usuarioService.removeFavProduct(req.body);
        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente` });
    }
};

module.exports = {
    findUserByIdController,
    findAllUsersController,
    createUserController,
    updateUserController,
    removeUserController,
    addAddressController,
    addFavProductController,
    removeAddressController,
    removeFavProductController
};
