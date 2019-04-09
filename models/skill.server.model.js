import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	name: String,
	description: String,
	cost: Number,
	magicType : { type: Schema.Types.ObjectId, ref: "MagicType" }
});

export default mongoose.model("Skill", SkillSchema);