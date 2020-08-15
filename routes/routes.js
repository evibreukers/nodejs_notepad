// Set up router
const express = require("express");
const router = express.Router();

// Import controller
const controller = require("../controller/controller");

// GET ROUTES
router.get("/", controller.page_home);

router.get("/folder/:id", controller.page_folder);

router.get("/select/:id", controller.select_folder);

// POST ROUTES
router.post("/", controller.new_folder);

router.post("/folder/:id", controller.new_note);

// PUT ROUTES
router.put("/folder/:id/:note", controller.delete_note);

// DELETE ROUTES
router.delete("/folder/:id", controller.delete_folder);

// export the router
module.exports = router;
