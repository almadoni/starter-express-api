const pool = require('./connection').pool;

const express = require('express');

const router = express.Router();

router.get('/list_discussion', (req, res) =>{

	pool.query('select * from discussion order by id', (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
		layout: 'index',
		username: req.session.username,
		list_discussion: true,
		data: results.rows
	  });

        });
});

router.get('/list_discussion_comment/:discussionId', (req, res) =>{
        console.log("list discussion comment");
	discussionId = req.params.discussionId;

        pool.query('select a.*, b.fullname from commentar a left join accounts b on (a.user_id = b.id) where a.discussion_id = $1',[discussionId], (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
                layout: 'index',
                username: req.session.username,
                list_discussion_comment: true,
                data: results.rows
          });

        });
});


module.exports = router
