const carrinhoService = require("../service/carrinho.service");

const findCarrinhoById = async (req, res) => {
    try {
        const { id } = req.params;
        const carrinho = await carrinhoService.findCarrinhoByIdService(id);
        res.send(carrinho);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const findAllCarrinhos = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const carrinhos = await carrinhoService.findAllCarrinhosService(limit, offset);
        res.send(carrinhos);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const createCarrinho = async (req, res) => {
    try {
        const userId = req.usuarioId; 
        const body = { ...req.body, userId }; // adiciona o id do usuário ao corpo
        const carrinho = await carrinhoService.createCarrinhoService(body);
        res.status(201).send(carrinho);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const updateCarrinho = async (req, res) => {
    try {
        const { id } = req.params;
        const carrinho = await carrinhoService.updateCarrinhoService(id, req.body);
        res.send(carrinho);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const deleteCarrinho = async (req, res) => {
    try {
        const { id } = req.params;
        await carrinhoService.deleteCarrinhoService(id);
        return res.status(200).send({ message: "Carrinho removido com sucesso" });
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};


module.exports = {
    findCarrinhoById,
    findAllCarrinhos,
    createCarrinho,
    updateCarrinho,
    deleteCarrinho
};
