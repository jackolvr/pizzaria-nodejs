const router = require("express").Router();

const categoriaController = require("../controller/categoria.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/find/:id", authMiddleware, categoriaController.findCategoriaById);
router.get("/findAll", authMiddleware, categoriaController.findAllCategorias);

router.post("/create", authMiddleware, categoriaController.createCategoria);

router.put("/update/:id", authMiddleware, categoriaController.updateCategoria);

router.delete("/delete/:id", authMiddleware, categoriaController.removeCategoria);

module.exports = router;
