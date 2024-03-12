const express = require("express");
const router = express.Router();
const todoContrller = require("../controller/todo");

router.post("/", todoContrller.create_item);
router.get("/", todoContrller.get_all_item);
router.get("/:itemId", todoContrller.find_item_byId);
router.patch("/:itemId", todoContrller.update_item);
router.delete("/:itemId", todoContrller.delete_item);
module.exports = router;
