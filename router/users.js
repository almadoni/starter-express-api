// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");

const express = require('express');

const router = express.Router();

router.get('/list_user', (req, res) =>{

	pool.query('select * from accounts order by id', (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
		layout: 'index',
		username: req.session.username,
		list_user: true,
		data: results
	  });

        });
});



const getUsers = (req, res) => {

        pool.query('select * from accounts', (error, results) =>{
          if(error){
             throw error
          }

          res.status(200).json(results)

        })
}

const createUser = (req, res) =>{
	const {username, password, fullname, email, mhs_id, fcm_id} = req.body;
	pool.query("INSERT INTO accounts (username, password, fullname, email, mahasiswa_id, firebase_id) values ($1, $2, $3, $4, $5, $6)",
		[username, password, fullname, email, mhs_id, fcm_id], (error, results) =>{
		if(error){
		   throw error
		}	
		res.status(201).send(`User added with ID ${results.insertId}`);
	})
}

const register = (req, res) =>{
	 
	(async ()=> {
		console.log(reg.body);
		const {username, password, fullname, email, nomahasiswa} = req.body;
		const doRegister = await saveRegister(username, password, fullname, email, nomahasiswa);
		var id = doRegister.rows[0].id;
		console.log("id input accounts "+id);
		const saveMateri = await saveMateri(1, id);
		res.status(200).json({code: "9200", result: "OK"});
	})();
}

async function saveRegister(username, password, fullname, email, nomahasiswa){
	const sql = "INSERT INTO accounts (username, password, fullname, email, mahasiswa_id) values ($1, $2, $3, $4, $5) returning id";
	return pool.query(sql, [username, password, fullname, email, nomahasiswa]);
}

async function saveMateri(materiId, accountId){
	const sql = "insert into materi_assign (materi_id, account_id) values ("+materiId+", "+accountId+")";
	return pool.query(sql);
}


const updateUser = (req, res) =>{
	const id = req.params.id;
	const fcm_id = req.params.fcmid;

	pool.query("UPDATE accounts set firebase_id ="+id+" WHERE id = "+fcm_id,  (error, results) =>{
		if(error){
		   throw error
		}
		res.status(200).json({result: "OK"})
	})
}


module.exports = router;
