const produtoService = require("../service/produto.service");

const findProdutoById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoService.findProdutoById(id);
        res.send(produto);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const findAllProdutos = async (req, res) => {
    try {
        const produtos = await produtoService.findAllProdutos();
        res.send(produtos);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const createProduto = async (req, res) => {
    try {
        const produto = await produtoService.createProduto(req.body);
        res.status(201).send(produto);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const updateProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoService.updateProduto(id, req.body);
        res.send(produto);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const removeProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoService.removeProduto(id);
        return res.status(200).send(produto);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const addCategoriaProduto = async (req, res) => {
    try {
        const { id, categoriaId } = req.params;
        const produto = await produtoService.addCategoriaProduto(id, categoriaId);
        res.send(produto);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const removerCategoriaProduto = async (req, res) => {
    try {
        const { id, categoriaId } = req.params;
        const produto = await produtoService.removerCategoriaProduto(id, categoriaId);
        res.send(produto);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

module.exports = {
    findProdutoById,
    findAllProdutos,
    createProduto,
    updateProduto,
    removeProduto,
    addCategoriaProduto,
    removerCategoriaProduto
};
