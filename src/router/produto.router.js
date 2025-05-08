const router = require("express").Router();

const produtoController = require("../controller/produto.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id", authMiddleware, produtoController.findProdutoById);
router.get("/findAll", authMiddleware, produtoController.findAllProdutos);

router.post("/create", authMiddleware, produtoController.createProduto);

router.put("/update/:id", authMiddleware, produtoController.updateProduto);

router.delete("/delete/:id", authMiddleware, produtoController.removeProduto);

module.exports = router;
