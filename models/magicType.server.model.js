import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Create new instance of MagicType schema.
const MagicTypeSchema = new Schema(
	{
		name: String,
		description: String,
		imageUrl: String
	}
);

export default mongoose.model('MagicType', MagicTypeSchema);