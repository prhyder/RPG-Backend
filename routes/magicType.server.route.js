import express from "express";

// import controller
import * as magicTypeController from "../controllers/magicType.server.controller.js";

// get an instance of express router
const router = express.Router();

router.route("/magicTypes")
	.get(magicTypeController.getMagicTypes);

router.route("/magicTypes/:id")
	.get(magicTypeController.getMagicType)

export default router;