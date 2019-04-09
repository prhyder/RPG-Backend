//import models
import Skill from "../models/skill.server.model";

export const getSkill = (req, res) => {
	Skill.find({ _id: req.params.id }).exec((err, skill) => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		if (skill.length) {
			return res.json({ success: true, skill });
		}
		else {
			return res.json({ success: false, message: "Skill with the given id not found" });
		}
	});
}

export const getSkills = (req, res) => {
	Skill.find().exec((err, skills) => {
		if (err) {
			return res.json({ success: false, error: err });
		} 
		return res.json({ success: true, skills });
	});
}

export const getSkillsByMagicType = (req, res) => {
	Skill.find({ magicType: req.params.magicTypeId }).exec((err, skills) => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		if (skills.length) {
			return res.json({ success: true, skills });
		}
		else {
			return res.json({ success: false, message: "Skills with the given magic type id not found" });
		}
	});
}