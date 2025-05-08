const Produto = require("../model/Produto");

const findProdutoById = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    const produto = await Produto.findById(id);

    if (!produto) {
        throw { status: 404, message: "Produto não encontrado" };
    }

    return { data: produto };
};

const findAllProdutos = async () => {
    const produtos = await Produto.find();

    if (produtos.length === 0) {
        throw { status: 404, message: "Não existem produtos cadastrados" };
    }

    return { data: produtos };
};

const createProduto = async (body) => {
    const { nome, descricao, precoUnitario, imagem, codigoBarra } = body;

    if (!nome || !descricao || !precoUnitario || !imagem || !codigoBarra) {
        throw { status: 400, message: "Todos os campos são obrigatórios" };
    }

    const produtoExistente = await Produto.findOne({ nome: nome });

    if (produtoExistente) {
        throw { status: 400, message: "Este produto já está cadastrado" };
    }

    const produto = await Produto.create({
        nome,
        descricao,
        precoUnitario,
        imagem,
        codigoBarra
    });

    return { data: produto };
};

const updateProduto = async (id, body) => {
    const { nome, descricao, precoUnitario, imagem, codigoBarra } = body;

    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    if (!nome && !descricao && !precoUnitario && !imagem && !codigoBarra) {
        throw { status: 400, message: "Informe pelo menos um campo para atualizar" };
    }

    const produto = await Produto.findById(id);

    if (!produto) {
        throw { status: 404, message: "Produto não encontrado" };
    }

    if (nome) {
        const produtoExistente = await Produto.findOne({ nome: nome });
        if (produtoExistente && produtoExistente._id != id) {
            throw { status: 400, message: "Este nome já está sendo utilizado por outro produto" };
        }
    }

    await Produto.findByIdAndUpdate(id, {
        nome: nome || produto.nome,
        descricao: descricao || produto.descricao,
        precoUnitario: precoUnitario || produto.precoUnitario,
        imagem: imagem || produto.imagem,
        codigoBarra: codigoBarra || produto.codigoBarra
    });

    return await Produto.findById(id);
};

const removeProduto = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    const produto = await Produto.findById(id);

    if (!produto) {
        throw { status: 404, message: "Produto não encontrado" };
    }

    await Produto.deleteOne({ _id: id });

    return { message: "Produto removido com sucesso" };
};

// Função para adicionar categoria ao produto
const addCategoriaProduto = async (id, categoriaId) => {
    if (!id) {
        throw { status: 400, message: "ID do produto não informado" };
    }

    if (!categoriaId) {
        throw { status: 400, message: "ID da categoria não informado" };
    }

    const produto = await Produto.findById(id);

    if (!produto) {
        throw { status: 404, message: "Produto não encontrado" };
    }

    const categoriaExistente = produto.categoria.find(
        (categoria) => categoria._id.toString() === categoriaId
    );

    if (categoriaExistente) {
        throw { status: 400, message: "Este produto já possui esta categoria" };
    }

    produto.categoria.push({ _id: categoriaId, createdAt: new Date() });
    await produto.save();

    return { data: produto };
};


// Função para remover uma categoria do produto
const removerCategoriaProduto = async (id, categoriaId) => {
    if (!id) {
        throw { status: 400, message: "ID do produto não informado" };
    }
    if (!categoriaId) {
        throw { status: 400, message: "ID da categoria não informado" };
    }
    const produto = await Produto.findById(id);
    if (!produto) {
        throw { status: 404, message: "Produto não encontrado" };
    }
    const indiceCategoria = produto.categoria.findIndex(
        (categoria) => categoria._id.toString() === categoriaId
    );
    if (indiceCategoria === -1) {
        throw { status: 404, message: "Categoria não encontrada neste produto" };
    }
    produto.categoria.splice(indiceCategoria, 1);
    await produto.save();
    return { data: produto };
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
