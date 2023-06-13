const pool = require('./connection').pool;



const getCommentars = (req, res) => {

        pool.query('select * from commentar', (error, results) =>{
          if(error){
             res.status(200).json({code: "9999", result: error})
             throw error
          }

         // res.status(200).json(results.rows)

	 console.log("Commentars :"+results.rows.length)

         if(results.rows.length > 0){		
	  res.status(200).json({code: "9200", result: results.rows})	
	 }else{
	   res.status(200).json({code: "9999", result: "Error"})
	 }

        })
}

const getComments = (req, res) => {

        discussion_id = req.params.discussion_id;

        pool.query('select * from commentar where discussion_id = $1',[discussion_id], (error, results) =>{
          if(error){
             res.status(200).json({code: "9999", result: error})
             throw error
          }

         console.log("Commentars :"+results.rows.length)

         if(results.rows.length > 0){
           res.status(200).json({code: "9200", result: results.rows})
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

		res.status(200).json({code: "9200", result: hasil.rows});
		
	})();
}


async function setComment(discussion_id, user_id, comment){
   const sql = 'INSERT INTO commentar (discussion_id, user_id, comment) values ($1, $2, $3)';
   return pool.query(sql,[discussion_id, user_id, comment]);
}

async function getCommnetList(discussion_id){
	const sql = "select a.*, b.fullname from commentar a left join accounts b on (b.id=a.user_id) where a.discussion_id = $1";
	return pool.query(sql, [discussion_id]);
}


module.exports = {
	getCommentars,
	getComments,
	addComment
}

