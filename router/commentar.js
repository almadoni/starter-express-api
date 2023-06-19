// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");



const getCommentars = (req, res) => {

        pool.query('select * from commentar', (error, results) =>{
          if(error){
             res.status(200).json({code: "9999", result: error})
             throw error
          }

         // res.status(200).json(results)

	 console.log("Commentars :"+results.length)

         if(results.length > 0){		
	  res.status(200).json({code: "9200", result: results})	
	 }else{
	   res.status(200).json({code: "9999", result: "Error"})
	 }

        })
}

const getComments = (req, res) => {

        discussion_id = req.params.discussion_id;

        pool.query('select * from commentar where discussion_id = '+discussion_id, (error, results) =>{
          if(error){
             res.status(200).json({code: "9999", result: error})
             throw error
          }

         console.log("Commentars :"+results.length)

         if(results.length > 0){
           res.status(200).json({code: "9200", result: results})
         }else{
           res.status(200).json({code: "9999", result: "Error"})
         }

        })
}



const addComment = (req, res) =>{
	console.log(req.body);
        const {discussion_id, user_id, comment} = req.body;
        (async () => {
		
		const input = await setComment(discussion_id, user_id, comment);

		console.log(input);

		const hasil = await getCommnetList(discussion_id);

		res.status(200).json({code: "9200", result: hasil});
		
	})();
}


async function setComment(discussion_id, user_id, comment){
   const sql = 'INSERT INTO commentar (discussion_id, user_id, comment) values ('+discussion_id+', '+user_id+', "'+comment+'")';
   return pool.query(sql);
}

async function getCommnetList(discussion_id){
	const sql = "select a.*, b.fullname from commentar a left join accounts b on (b.id=a.user_id) where a.discussion_id = "+discussion_id;
	return pool.query(sql);
}


module.exports = {
	getCommentars,
	getComments,
	addComment
}

