// const pool = require('./connection').pool;
const pool = require("../db_config");

const express = require('express');

const router = express.Router();

router.get('/list_user', (req, res) =>{

	pool.all('select * from accounts order by id', (error, results) =>{
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

        pool.all('select * from accounts', (error, results) =>{
          if(error){
             throw error
          }

          res.status(200).json(results)

        })
}

const createUser = (req, res) =>{
	const {username, password, fullname, email, mhs_id, fcm_id} = req.body;
	pool.run("INSERT INTO accounts (username, password, fullname, email, mahasiswa_id, firebase_id) values ($1, $2, $3, $4, $5, $6)",
		[username, password, fullname, email, mhs_id, fcm_id], (error, results) =>{
		if(error){
		   throw error
		}	
		res.status(201).send(`User added with ID ${results.insertId}`);
	})
}

const register = (req, res) =>{
	/*
	console.log(req.body);
        const {username, password, fullname, email, nomahasiswa} = req.body;
        pool.run("INSERT INTO accounts (username, password, fullname, email, mahasiswa_id) values ($1, $2, $3, $4, $5)",
                [username, password, fullname, email, nomahasiswa], (error, results) =>{
                if(error){
		   res.status(200).json({code: "9999", result: error});	
                   throw error
                }
                res.status(200).json({code: "9200", result: "OK"});
        })
	*/
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
	return pool.run(sql, [username, password, fullname, email, nomahasiswa]);
}

async function saveMateri(materiId, accountId){
	const sql = "insert into materi_assign (materi_id, account_id) values ($1, $2)";
	return pool.run(sql, [materiId, accountId]);
}


const updateUser = (req, res) =>{
	const id = req.params.id;
	const fcm_id = req.params.fcmid;

	pool.run("UPDATE accounts set firebase_id =$1 WHERE id = $2", [id, fcm_id], (error, results) =>{
		if(error){
		   throw error
		}
		res.status(200).json({result: "OK"})
	})
}


module.exports = router;
