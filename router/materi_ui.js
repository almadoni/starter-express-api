const pool = require('./connection').pool;

const express = require('express');

const router = express.Router();

router.get('/list_materi', (req, res) =>{

	pool.query('select * from materi order by id', (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
		layout: 'index',
		username: req.session.username,
		list_materi: true,
		data: results.rows
	  });

        });


});

router.get('/list_materi_assign/:materiId', (req, res) =>{
        materiId = req.params.materiId;
	console.log("materi id "+materiId);
        pool.query('select a.*, b.fullname, b.email, b.username from materi_assign a left join accounts b on (a.account_id = b.id) where a.materi_id = $1',[materiId], (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
                layout: 'index',
                username: req.session.username,
                list_materi_assign: true,
                data: results.rows
          });

        });

});



const getUsers = (req, res) => {

        pool.query('select * from accounts', (error, results) =>{
          if(error){
             throw error
          }

          res.status(200).json(results.rows)

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
	console.log(req.body);
        const {username, password, fullname, email, nomahasiswa} = req.body;
        pool.query("INSERT INTO accounts (username, password, fullname, email, mahasiswa_id) values ($1, $2, $3, $4, $5)",
                [username, password, fullname, email, nomahasiswa], (error, results) =>{
                if(error){
		   res.status(200).json({code: "9999", result: error});	
                   throw error
                }
                res.status(200).json({code: "9200", result: "OK"});
        })
}


const updateUser = (req, res) =>{
	const id = req.params.id;
	const fcm_id = req.params.fcmid;

	pool.query("UPDATE accounts set firebase_id =$1 WHERE id = $2", [id, fcm_id], (error, results) =>{
		if(error){
		   throw error
		}
		res.status(200).json({result: "OK"})
	})
}


module.exports = router;
