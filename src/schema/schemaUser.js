const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var userSchema = mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	password: {
        type: String,
        required: true
    },
	userName: {
        type: String,
        required: true
    },
	imageProfil:{
		type: String,
		required: false
	},
	adresse:{
		type: String,
		required: false
	},
	name:{
		type: String,
		required: false
	},
	birthDay:{
		type: String,
		required: false
	},
	birthMonth:{
		type: String,
		required: false
	},
	birthYear:{
		type: String,
		required: false
	},
	phone:{
		type: String,
		required: false
	},
	sex:{
		type: String,
		required: false
	},
	sizeCard:{
		type: Number,
		required: false
	},
	theme:{
		type: Number,
		required: false
	},
	favourites:{
		type: [],
		required: false
	},
	watchLater:{
		type: [],
		required: false
	}

},{ timestamps: { createdAt: 'created_at' }})


userSchema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	},
	getUserData: function () {
		return this.userName
	},
	setUserName: function(change) {
		 this.update(this, change)
	}
}

module.exports = mongoose.model('User', userSchema);
