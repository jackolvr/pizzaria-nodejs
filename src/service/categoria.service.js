const Categoria = require("../model/Categoria");

const findCategoriaById = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        throw { status: 404, message: "Categoria não encontrada" };
    }

    return { data: categoria };
};

const findAllCategorias = async () => {
    const categorias = await Categoria.find();

    if (categorias.length === 0) {
        throw { status: 404, message: "Não existem categorias cadastradas" };
    }

    return { data: categorias };
};

const createCategoria = async (body) => {
    const { nome } = body;

    if (!nome) {
        throw { status: 400, message: "O nome é obrigatório" };
    }

    const categoriaExistente = await Categoria.findOne({ nome: nome });

    if (categoriaExistente) {
        throw { status: 400, message: "Esta categoria já está cadastrada" };
    }

    const categoria = await Categoria.create({
        nome
    });

    return { data: categoria };
};

const mongoose = require('mongoose');

const updateCategoria = async (id, body) => {
    const { nome } = body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw { status: 400, message: "ID inválido ou não informado" };
    }

    if (!nome) {
        throw { status: 400, message: "Informe pelo menos um campo para atualizar" };
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        throw { status: 404, message: "Categoria não encontrada" };
    }

    if (nome) {
        const categoriaExistente = await Categoria.findOne({ nome: nome });
        if (categoriaExistente && categoriaExistente._id.toString() != id) {
            throw { status: 400, message: "Este nome já está sendo utilizado por outra categoria" };
        }
    }

    await Categoria.findByIdAndUpdate(id, {
        nome: nome || categoria.nome
    });

    return await Categoria.findById(id);
};

const removeCategoria = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        throw { status: 404, message: "Categoria não encontrada" };
    }

    await Categoria.deleteOne({ _id: id });

    return { message: "Categoria removida com sucesso" };
};

module.exports = {
    findCategoriaById,
    findAllCategorias,
    createCategoria,
    updateCategoria,
    removeCategoria
};
