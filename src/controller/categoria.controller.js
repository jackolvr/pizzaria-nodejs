const categoriaService = require("../service/categoria.service");

const findCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriaService.findCategoriaById(id);
        res.send(categoria);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const findAllCategorias = async (req, res) => {
    try {
        const categorias = await categoriaService.findAllCategorias();
        res.send(categorias);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const createCategoria = async (req, res) => {
    try {
        const categoria = await categoriaService.createCategoria(req.body);
        res.status(201).send(categoria);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriaService.updateCategoria(id, req.body);
        res.send(categoria);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

const removeCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        await categoriaService.removeCategoria(id);
        res.status(204).send();
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
};

module.exports = {
    findCategoriaById,
    findAllCategorias,
    createCategoria,
    updateCategoria,
    removeCategoria
};
