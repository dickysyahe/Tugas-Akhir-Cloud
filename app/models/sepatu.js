'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sepatuSchema = new Schema({
	merk : String,
	ukuran : String,
	warna : String,
	jenis : String,
});

module.exports = mongoose.model('sepatu', sepatuSchema);