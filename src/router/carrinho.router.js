const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const carrinhoController = require("../controller/carrinho.controller");

router.get("/find/:id", authMiddleware, carrinhoController.findCarrinhoById);
router.get("/findAll", authMiddleware, carrinhoController.findAllCarrinhos);
router.post("/create", authMiddleware, carrinhoController.createCarrinho);
router.put("/update/:id", authMiddleware, carrinhoController.updateCarrinho);
router.delete("/delete/:id", authMiddleware, carrinhoController.deleteCarrinho);

module.exports = router;