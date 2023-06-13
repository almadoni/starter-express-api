const pool = require('./connection').pool;

const express = require('express');

const router = express.Router();

router.get('/list_comment', (req, res) =>{

	pool.query('select a.*, c.fullname as comment_by, b.materi as materi_name, aa.fullname, aa.email from commentar a left join discussion b on(b.id = a.discussion_id) left join accounts c on(c.id = a.user_id) left join accounts aa on (aa.id = b.posted_by) order by materi_name, a.id desc', (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
		layout: 'index',
		username: req.session.username,
		list_comment: true,
		data: results.rows
	  });

        });


});

module.exports = router
