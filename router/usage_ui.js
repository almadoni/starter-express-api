// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");

const express = require('express');

const router = express.Router();

router.get('/list_usage', (req, res) =>{

	pool.query("select a.*, a.create_date as created_date,b.fullname from usage_history a left join accounts b on (a.user_id = b.id) order by created_date desc", (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
		layout: 'index',
		username: req.session.username,
		list_usage: true,
		data: results
	  });

        });


});

router.get('/list_usage_user/:userId', (req, res) =>{
        const userId = req.params.userId;
        pool.query("select a.*, create_date as created_date,b.fullname from usage_history a left join accounts b on (a.user_id = b.id) where b.id = "+userId+" order by created_date desc", (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
                layout: 'index',
                username: req.session.username,
                list_usage: true,
                data: results
          });

        });


});

module.exports = router;


