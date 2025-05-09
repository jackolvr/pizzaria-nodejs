const Carrinho = require("../model/Carrinho");

const findCarrinhoByIdService = (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }
    return Carrinho.findById(id).populate("produtos._id").populate("userId");
};

const findAllCarrinhosService = (limit, offset) => {

    return Carrinho.find()
        .limit(limit)
        .skip(offset)
        .populate("produtos._id")
        .populate("userId");
};

const createCarrinhoService = async (body) => {
    const { produtos, precoTotal, frete, userId } = body;

    if (!produtos || !precoTotal || !frete) {
        throw { status: 400, message: "Todos os campos são obrigatórios" };
    }

    produtos.forEach(produto => {
        if (!produto._id || !produto.quantidade) {
            throw { status: 400, message: "Cada produto deve ter um ID e uma quantidade" };
        }
    });


    const carrinho = await Carrinho.create({
        produtos,
        precoTotal,
        frete,
        userId
    });

    return carrinho;
};

const updateCarrinhoService = (id, body) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    if (!body) {
        throw { status: 400, message: "Body não informado" };
    }

    return Carrinho.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .populate("produtos._id")
    .populate("userId");
};

const deleteCarrinhoService = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    await Carrinho.findByIdAndDelete(id);

    return { message: "Carrinho removido com sucesso" };;
};

module.exports = {
    findCarrinhoByIdService,
    findAllCarrinhosService,
    createCarrinhoService,
    updateCarrinhoService,
    deleteCarrinhoService
};
