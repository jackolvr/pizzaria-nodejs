const Usuario = require("../model/Usuario");

const findUserById = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    return { data: usuario };
};

const findAllUsers = async () => {
    const usuarios = await Usuario.find();

    if (usuarios.length === 0) {
        throw { status: 404, message: "Não existem usuários cadastrados" };
    }

    return { data: usuarios };
};

const createUser = async (body) => {
    const { nome, email, senha, imagem } = body;

    if (!nome || !email || !senha || !imagem) {
        throw { status: 400, message: "Todos os campos são obrigatórios" };
    }

    const usuarioExistente = await Usuario.findOne({ email: email });

    if (usuarioExistente) {
        throw { status: 400, message: "Este email já está sendo utilizado" };
    }

    const usuario = await Usuario.create({
        nome,
        email,
        senha,
        imagem,
        enderecos: [],
        createdAt: new Date(),
        produtos_fav: [],
        admin: false
    });

    return { data: usuario };
};

const updateUser = async (id, body) => {
    const { nome, email, senha, imagem } = body;

    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    if (!nome && !email && !senha && !imagem) {
        throw { status: 400, message: "Informe pelo menos um campo para atualizar" };
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    if (email) {
        const emailExistente = await Usuario.findOne({ email: email });
        if (emailExistente && emailExistente._id != id) {
            throw { status: 400, message: "Este email já está sendo utilizado por outro usuário" };
        }
    }

    await Usuario.updateOne({ _id: id }, {
        nome: nome || usuario.nome,
        email: email || usuario.email,
        senha: senha || usuario.senha,
        imagem: imagem || usuario.imagem
    });

    return await Usuario.findById(id);
};

const removeUser = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    await Usuario.deleteOne({ _id: id });

    return { message: "Usuário removido com sucesso" };
};

const addAddress = async (id, body) => {
    const { rua, numero, complemento, CEP } = body;

    if (!id) {
        throw { status: 400, message: "ID não informado" };
    }

    if (!rua || !numero || !CEP) {
        throw { status: 400, message: "Rua, número e CEP são obrigatórios" };
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    const novoEndereco = {
        rua,
        numero,
        complemento: complemento || "",
        CEP,
        createdAt: new Date()
    };

    await Usuario.updateOne(
        { _id: id },
        { $push: { enderecos: novoEndereco } }
    );

    return await Usuario.findById(id);
};

const addFavProduct = async (id, body) => {
    const { id_produto } = body;

    if (!id) {
        throw { status: 400, message: "ID do usuário não informado" };
    }

    if (!id_produto) {
        throw { status: 400, message: "ID do produto não informado" };
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    // Verifica se o produto já está nos favoritos
    const produtoExistente = usuario.produtos_fav.find(produto => produto._id.toString() === id_produto);

    if (produtoExistente) {
        throw { status: 400, message: "Este produto já está nos favoritos" };
    }

    const novoProdutoFav = {
        _id: id_produto,
        createdAt: new Date()
    };

    await Usuario.updateOne(
        { _id: id },
        { $push: { produtos_fav: novoProdutoFav } }
    );

    return await Usuario.findById(id);
};

const removeAddress = async (body) => {
    const { id_usuario, id_endereco } = body;

    if (!id_usuario || !id_endereco) {
        throw { status: 400, message: "ID do usuário e ID do endereço são obrigatórios" };
    }

    const usuario = await Usuario.findById(id_usuario);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    const enderecoExistente = usuario.enderecos.find(endereco => endereco._id.toString() === id_endereco);

    if (!enderecoExistente) {
        throw { status: 404, message: "Endereço não encontrado" };
    }

    await Usuario.updateOne(
        { _id: id_usuario },
        { $pull: { enderecos: { _id: id_endereco } } }
    );

    return await Usuario.findById(id_usuario);
};

const removeFavProduct = async (body) => {
    const { id_usuario, id_produto } = body;

    if (!id_usuario || !id_produto) {
        throw { status: 400, message: "ID do usuário e ID do produto são obrigatórios" };
    }

    const usuario = await Usuario.findById(id_usuario);

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    const produtoExistente = usuario.produtos_fav.find(produto => produto._id.toString() === id_produto);

    if (!produtoExistente) {
        throw { status: 404, message: "Produto não encontrado nos favoritos" };
    }

    await Usuario.updateOne(
        { _id: id_usuario },
        { $pull: { produtos_fav: { _id: id_produto } } }
    );

    return await Usuario.findById(id_usuario);
};

module.exports = {
    findUserById,
    findAllUsers,
    createUser,
    updateUser,
    removeUser,
    addAddress,
    addFavProduct,
    removeAddress,
    removeFavProduct
};
