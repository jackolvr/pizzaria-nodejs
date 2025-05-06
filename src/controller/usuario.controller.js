const Usuario = require("../model/Usuario");

const findUserByIdController = async (req, res) => {
    try{
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: `ID não informado` });
        }

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
        }

        return res.status(200).send(usuario);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente`});
    }
};

const findAllUsersController = async (req, res) => {
    try{
        const usuarios = await Usuario.find();

        if (usuarios.length === 0) {
            return res.status(404).send({ message: `Não existem usuários cadastrados` });
        }

        return res.status(200).send(usuarios);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente`});
    }
};

const createUserController = async (req, res) => {
    try{
        const { nome, email, senha, imagem } = req.body;

        if (!nome || !email || !senha || !imagem) {
            return res.status(400).send({ message: `Todos os campos são obrigatórios` });
        }

        const usuarioExistente = await Usuario.findOne({ email: email });

        if (usuarioExistente) {
            return res.status(400).send({ message: `Este email já está sendo utilizado` });
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

        return res.status(201).send(usuario);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente`});
    }
};

const updateUserController = async (req, res) => {
    try{
        const id = req.params.id;
        const { nome, email, senha, imagem } = req.body;

        if (!id) {
            return res.status(400).send({ message: `ID não informado` });
        }

        if (!nome && !email && !senha && !imagem) {
            return res.status(400).send({ message: `Informe pelo menos um campo para atualizar` });
        }

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
        }

        if (email) {
            const emailExistente = await Usuario.findOne({ email: email });
            if (emailExistente && emailExistente._id != id) {
                return res.status(400).send({ message: `Este email já está sendo utilizado por outro usuário` });
            }
        }

        await Usuario.updateOne({ _id: id }, {
            nome: nome || usuario.nome,
            email: email || usuario.email,
            senha: senha || usuario.senha,
            imagem: imagem || usuario.imagem
        });

        const usuarioAtualizado = await Usuario.findById(id);

        return res.status(200).send(usuarioAtualizado);
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente`});
    }
};

const removeUserController = async (req, res) => {
    try{
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: `ID não informado` });
        }

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
        }

        await Usuario.deleteOne({ _id: id });

        return res.status(200).send({ message: `Usuário removido com sucesso` });
    }catch (err){
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente`});
    }
};

const addAddressController = async (req, res) => {
    try {
        const id = req.params.id;
        const { rua, numero, complemento, CEP } = req.body;

        if (!id) {
            return res.status(400).send({ message: `ID não informado` });
        }

        if (!rua || !numero || !CEP) {
            return res.status(400).send({ message: `Rua, número e CEP são obrigatórios` });
        }

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
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

        const usuarioAtualizado = await Usuario.findById(id);

        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente` });
    }
};

const addFavProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_produto } = req.body;

        if (!id) {
            return res.status(400).send({ message: `ID do usuário não informado` });
        }

        if (!id_produto) {
            return res.status(400).send({ message: `ID do produto não informado` });
        }

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
        }

        // Verifica se o produto já está nos favoritos
        const produtoExistente = usuario.produtos_fav.find(produto => produto._id.toString() === id_produto);

        if (produtoExistente) {
            return res.status(400).send({ message: `Este produto já está nos favoritos` });
        }

        const novoProdutoFav = {
            _id: id_produto,
            createdAt: new Date()
        };

        await Usuario.updateOne(
            { _id: id },
            { $push: { produtos_fav: novoProdutoFav } }
        );

        const usuarioAtualizado = await Usuario.findById(id);

        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente` });
    }
};

const removeAddressController = async (req, res) => {
    try {
        const { id_usuario, id_endereco } = req.body;

        if (!id_usuario || !id_endereco) {
            return res.status(400).send({ message: `ID do usuário e ID do endereço são obrigatórios` });
        }

        const usuario = await Usuario.findById(id_usuario);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
        }

        const enderecoExistente = usuario.enderecos.find(endereco => endereco._id.toString() === id_endereco);

        if (!enderecoExistente) {
            return res.status(404).send({ message: `Endereço não encontrado` });
        }

        await Usuario.updateOne(
            { _id: id_usuario },
            { $pull: { enderecos: { _id: id_endereco } } }
        );

        const usuarioAtualizado = await Usuario.findById(id_usuario);

        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente` });
    }
};

const removeFavProductController = async (req, res) => {
    try {
        const { id_usuario, id_produto } = req.body;

        if (!id_usuario || !id_produto) {
            return res.status(400).send({ message: `ID do usuário e ID do produto são obrigatórios` });
        }

        const usuario = await Usuario.findById(id_usuario);

        if (!usuario) {
            return res.status(404).send({ message: `Usuário não encontrado` });
        }

        const produtoExistente = usuario.produtos_fav.find(produto => produto._id.toString() === id_produto);

        if (!produtoExistente) {
            return res.status(404).send({ message: `Produto não encontrado nos favoritos` });
        }

        await Usuario.updateOne(
            { _id: id_usuario },
            { $pull: { produtos_fav: { _id: id_produto } } }
        );

        const usuarioAtualizado = await Usuario.findById(id_usuario);

        return res.status(200).send(usuarioAtualizado);
    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(500).send({ message: `Erro inesperado, tente novamente` });
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
