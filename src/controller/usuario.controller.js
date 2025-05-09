const mongoose = require('mongoose');
const usuarioService = require("../service/usuario.service");

const findUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        // Verifica se o ID é um ObjectId válido 
        if (!mongoose.isValidObjectId(id)) { 
            return res.status(400).send({ message: "ID informado está incorreto, tente novamente" }); 
        }

        const usuario = await usuarioService.findUserById(id);
        if (!usuario) {
            return res.status(404).send({ message: "usuário nao encontrado, tente novamente" });
        }
        return res.status(200).send({ data: usuario });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const findAllUsersController = async (req, res) => {
    try {
        const usuarios = await usuarioService.findAllUsers();
        return res.status(200).send({ data: usuarios });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

// Função separada para validar os campos obrigatórios
const validateUserFields = (body) => {
    // Validação dos campos principais
    const requiredFields = ['nome', 'email', 'senha', 'imagem'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return {
        isValid: false,
        message: `Os campos ${missingFields.join(', ')} precisam ser preenchidos!`
      };
    }
    
    // Validação dos endereços, se fornecidos
    if (body.enderecos && body.enderecos.length > 0) {
      for (let i = 0; i < body.enderecos.length; i++) {
        const endereco = body.enderecos[i];
        const requiredAddressFields = ['rua', 'numero', 'CEP', 'createtAt'];
        
        const missingAddressFields = requiredAddressFields.filter(field => !endereco[field]);
        
        if (missingAddressFields.length > 0) {
          return {
            isValid: false,
            message: `Os campos ${missingAddressFields.join(', ')} são obrigatórios no endereço ${i + 1}!`
          };
        }
      }
    }
    
    // Validação dos produtos favoritos, se fornecidos
    if (body.produtos_fav && body.produtos_fav.length > 0) {
      for (let i = 0; i < body.produtos_fav.length; i++) {
        const produto = body.produtos_fav[i];
        
        if (!produto._id) {
          return {
            isValid: false,
            message: `O campo _id é obrigatório no produto favorito ${i + 1}!`
          };
        }
      }
    }
    
    // Se chegou aqui, está tudo válido
    return { isValid: true };
  };

const createUserController = async (req, res) => {
    try {
        // Primeiro, validar os campos do req.body
        const validation = validateUserFields(req.body);

        if (!validation.isValid) {
            return res.status(400).send({ message: validation.message });
        }

        // Depois de validar, criar o usuário
        const usuario = await usuarioService.createUser(req.body);

        return res.status(201).send({ data: usuario });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const updateUserController = async (req, res) => {
    try {
        // Primeiro, validar os campos do req.body
        const validation = validateUserFields(req.body);

        if (!validation.isValid) {
            return res.status(400).send({ message: validation.message });
        }
        // Depois atualizar os campos
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.updateUser(id, req.body);
        return res.status(200).send({ data: usuarioAtualizado });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const removeUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await usuarioService.removeUser(id);
     //   if (resultado){
            return res.status(200).send({ data: resultado });
     //   }else{
     //       return res.status(404).send({ data: resultado });
     //   }
        
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const addAddressController = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.addAddress(id, req.body);
        return res.status(200).send({ data: usuarioAtualizado });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const addFavProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioAtualizado = await usuarioService.addFavProduct(id, req.body);
        return res.status(200).send({ data: usuarioAtualizado });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const removeAddressController = async (req, res) => {
    try {
        const usuarioAtualizado = await usuarioService.removeAddress(req.body);
        return res.status(200).send({ data: usuarioAtualizado });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
    }
};

const removeFavProductController = async (req, res) => {
    try {
        const usuarioAtualizado = await usuarioService.removeFavProduct(req.body);
        return res.status(200).send({ data: usuarioAtualizado });
    } catch (err) {
        console.log(`erro: ${err.message}`);
        const status = err.status || 500;
        const message = err.message || "Erro inesperado, tente novamente";
        return res.status(status).send({ message });
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
