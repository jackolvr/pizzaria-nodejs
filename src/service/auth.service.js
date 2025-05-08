const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../model/Usuario');

const loginService = async (email, senha) => {
    const usuario = await Usuario.findOne({ email }).select("senha");

    if (!usuario) {
        throw { status: 404, message: "Usuário não encontrado" };
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
        throw { status: 400, message: "Senha incorreta" };
    }

    return usuario;
};

const generateToken = (usuarioId) => {
    return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

module.exports = { loginService, generateToken };
