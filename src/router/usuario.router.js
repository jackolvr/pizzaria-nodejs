const express = require("express");
const usuarioController = require("../controller/usuario.controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware")

router.get('/findById/:id',authMiddleware, usuarioController.findUserByIdController);
router.get('/findAll', usuarioController.findAllUsersController);

router.post('/create', usuarioController.createUserController);
router.post('/addAddress/:id', usuarioController.addAddressController);
router.post('/addFavProduct/:id', usuarioController.addFavProductController);

router.put('/update/:id', usuarioController.updateUserController);

router.delete('/remove/:id', usuarioController.removeUserController);
router.delete('/removeAddress', usuarioController.removeAddressController);
router.delete('/removeFavProduct', usuarioController.removeFavProductController);

module.exports = router;
