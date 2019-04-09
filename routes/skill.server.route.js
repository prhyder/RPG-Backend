import express from "express";

// import controller
import * as skillController from "../controllers/skill.server.controller.js";

// get an instance of express router
const router = express.Router();

router.route("/skill/:id")
	.get(skillController.getSkill);

router.route("/skills")
	.get(skillController.getSkills);

router.route("/skills/:magicTypeId")
	.get(skillController.getSkillsByMagicType)

export default router;