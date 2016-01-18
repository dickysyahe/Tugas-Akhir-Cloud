'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
var sepatu = mongoose.model('sepatu');

router.get('/', function ( req, res) {
	sepatu.find({}).exec(function(err, sepatu) {
		res.render('sepatu_index', { data : sepatu});
	});
	
});

//Tambah data
router.get('/tambah', function ( req, res) {
	res.render('sepatu_tambah', { tittle : 'Tambah Sepatu', data: '' });
});

router.post('/tambah', function ( req, res) {
	var merk = req.body.merk;
	var ukuran = req.body.ukuran;
	var warna = req.body.warna;
	var jenis = req.body.jenis;

	var SepatuBaru = new sepatu({ merk : merk, ukuran : ukuran, warna : warna, jenis : jenis})
	;
	SepatuBaru.save(function(err){
		if (err) throw err;
		res.redirect('/sepatu');
	});
});

//Ubah data
router.get('/ubah/:sepatu_id([0-9a-z]+)', function(req, res) {
	sepatu.findOne({_id: req.params.sepatu_id}).exec(function(err, sepatu){
		if (err) throw err;
		res.render('sepatu_tambah', {tittle: 'Ubah Sepatu', data: sepatu});
	});
});

router.post('/ubah/:sepatu_id([0-9a-z]+)', function(req, res) {
	var data_terubah = req.body;
	sepatu.findOneAndUpdate({ _id: req.params.sepatu_id }, data_terubah).exec(function(err) {
		if (err) throw err;
		res.redirect('/sepatu');
	});
});

//Hapus data
router.get('/hapus/:sepatu_id([0-9a-z]+)', function(req, res){
	sepatu.findOneAndRemove({_id: req.params.sepatu_id}).exec(function(err){
		if (err) throw err;
		res.redirect('/sepatu');
	});
});
module.exports = router;



