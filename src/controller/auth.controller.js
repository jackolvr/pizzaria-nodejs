const usuarioService = require('../service/usuario.service');
const authService = require('../service/auth.service');
//const Usuario = require('../model/Usuario');

// const registerController = async (req, res) => {
//     try {
//         const usuario = await usuarioService.createUser(req.body);
//         return res.status(201).send({ message: 'Usuário criado com sucesso' });
//     } catch (err) {
//         console.log(`erro: ${err.message}`);
//         return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente` });
//     }
// };

const loginController = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await authService.loginService(email, senha);
        const token = authService.generateToken(usuario._id);

        return res.status(200).send({ email, token });

    } catch (err) {
        console.log(`erro: ${err.message}`);
        return res.status(err.status || 500).send({ message: err.message || `Erro inesperado, tente novamente` });
    }
};

module.exports = { loginController };
