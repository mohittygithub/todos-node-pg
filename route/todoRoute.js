const express = require("express");
const {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
} = require("../controller/todoController");

const router = express.Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
