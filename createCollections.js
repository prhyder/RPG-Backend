import async from "async";
//import mongoose from "mongoose";
import MagicType from "./models/magicType.server.model";
import Skill from "./models/skill.server.model";

console.log("This script populates Magic Types and Skills.");

var mongoose = require("mongoose");

if (process.env.RPG_APP_MONGODB_URI) {
    mongoose.connect(
        process.env.RPG_APP_MONGODB_URI,
        { useNewUrlParser: true }
    );
}

mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

var magicTypes = [];
var skills = [];

function magicTypeCreate(name, description, imageUrl, callback) {
	var magicTypeDetail = { name, description, imageUrl };
	
	var magicType = new MagicType(magicTypeDetail);

	magicType.save(function (err) {
		if (err) {
			callback(err, null);
			return;
		}
		console.log(`New Magic Type: ${magicType}`);
		magicTypes.push(magicType);
		callback(null, magicType);
	});
}

function skillCreate(name, description, cost, magicType, callback){
	var skillDetail = { name, description, cost, magicType };
	
	var skill = new Skill(skillDetail);

	skill.save(function (err) {
		if (err) {
			callback(err, null);
			return;
		}
		console.log(`New Skill: ${skill}`);
		skills.push(skill);
		callback(null, skill);
	});
}

function createMagicTypes (callback){
	console.log("create magic types");

	async.series([
		(callback) => {
			magicTypeCreate("Earth", "Channel the forces of nature", "./images/earth.png", callback);
		},
		(callback) => {
			magicTypeCreate("Life", "Detect emotions and heal injuries", "./images/life.png", callback);
		},
		(callback) => {
			magicTypeCreate("Death", "Take life from the living... or instill it to the dead", "./images/death.png", callback);
		}
		],
		// optional callback
		callback);
	
	console.log("create magic types finished.");
}

function createSkills(callback){
	console.log("create skills");

	async.series([
		// Earth skills
		(callback) => {
			skillCreate("Conjure Lightning", "Create a deadly blast of lightning from your fingertips.", 1, magicTypes[0], callback);
		},
		(callback) => {
			skillCreate("Channel Fire", "Create a ball of flame in the palm of your hand.", 1, magicTypes[0], callback);
		},
		(callback) => {
			skillCreate("Alchemy", "Craft medicine or poison.", 1, magicTypes[0], callback);
		},
		(callback) => {
			skillCreate("Absorb Energy", "Take in energy from the natural world to become more powerful.", 1, magicTypes[0], callback);
		},
		(callback) => {
			skillCreate("Whirlwind", "Create a destructive windstorm.", 1, magicTypes[0], callback);
		},
		(callback) => {
			skillCreate("Tectonic Force", "Shift the earth and cause earthquakes.", 1, magicTypes[0], callback);
		},

		//Life skills
		(callback) => {
			skillCreate("Heal Injury", "Mend a person's injuries using the power of your mind.", 1, magicTypes[1], callback);
		},
		(callback) => {
			skillCreate("Inflict Injury", "Cause physical damage to a person simply by willing it to happen.", 1, magicTypes[1], callback);
		},
		(callback) => {
			skillCreate("Sense Emotion", "Pick up on another person's emotional state.", 1, magicTypes[1], callback);
		},
		(callback) => {
			skillCreate("Detect Thoughts", "Eavesdrop on the private thoughts of others.", 1, magicTypes[1], callback);
		},
		(callback) => {
			skillCreate("Disorient", "Muddle a person's thoughts.", 1, magicTypes[1], callback);
		},
		(callback) => {
			skillCreate("Drain Lifeforce", "Leach the energy from another person.", 1, magicTypes[1], callback);
		},
		(callback) => {
			skillCreate("Telepathy", "Put direct thoughts into a person's mind.", 1, magicTypes[1], callback);
		},

		//Death skills
		(callback) => {
			skillCreate("Raise Dead", "Bring a recently dead person back to life.", 5, magicTypes[2], callback);
		},
		(callback) => {
			skillCreate("Absorb Lifeforce", "Instantaneously remove the lifeforce from a living being.", 5, magicTypes[2], callback);
		}
		],
		//optional callback
		callback);
	console.log("create skills finished.");
}

function dropCollections(callback) {
	db.collection("magictypes").drop(function(err, delOK) {
		if (err) throw err;
		if (delOK) {
			console.log("magictypes deleted");
			db.collection("skills").drop(function(err, delOK) {
				if (err) throw err;
				if (delOK) {
					console.log("skills deleted");
					console.log("drop collections finished.");
					callback();
				}
			});
		}
	});
}

dropCollections(createCollections);

function createCollections() {
	async.series([
		createMagicTypes,
		createSkills
	],
	// Optional callback
	function(err, results) {
		if (err) {
			console.log("FINAL ERR: "+err);
		}
		// All done, disconnect from database
		mongoose.connection.close(function () {
			console.log("Mongoose connection closed.");
			process.exit;
		});
	});
};

