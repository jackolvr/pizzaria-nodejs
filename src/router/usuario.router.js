const express = require("express");
const usuarioController = require("../controller/usuario.controller");

const router = express.Router();

router.get('/findById/:id');
router.get('/findAll');

router.post('/create');
router.post('/addAddress/:id');
router.post('/addFavProduct:/:id');

router.put('/update/:id');

router.delete('/remove/:id');
router.delete('/removeAddress');
router.delete('removeFavProduct');

module.exports = router;
