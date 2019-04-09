import mongoose from "mongoose";

import MagicType from "../models/magicType.server.model";

export const getMagicTypes = (req, res) => {
	MagicType.find().exec((err, magicTypes) => {
		if (err) {
			return res.json({ success: false, error: err });
		} 
		return res.json({ success: true, magicTypes });
	});
}

export const getMagicType = (req, res) => {
	const id = mongoose.Types.ObjectId(req.params.id);
	MagicType.find({ _id: id }).exec((err, magicType) => {
		if (err) {
			return res.json({ success: false, error: err });
		}
		if (magicType.length) {
			return res.json({ success: true, magicType });
		}
		else {
			return res.json({ success: false, message: "Magic type with the given id not found" });
		}
	});
}