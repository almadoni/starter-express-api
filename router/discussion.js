// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");

const getDiscussions = (req, res) => {
	   console.log("getDiscussion..");

        pool.query('select * from discussion where actived = 0', (error, results) =>{
          if(error){
	     res.status(200).json({code: "9999", result: error})
             throw error
          }

          //res.status(200).json(results)
          console.log("Total discussion :"+results.length)

         if(results.length > 0){		
	  res.status(200).json({code: "9200", result: results})	
	 }else{
	   res.status(200).json({code: "9999", result: "Error"})
	 }


        })
}

const setDiscussion = (req, res) => {
	console.log(req.body);
	const {materi, user_id} = req.body;
	
	(async () =>{
	    var jsonRst = {code: "9200", result: ""}
	    var dataArray = []
            const input = await addDiscussion(materi,user_id);
	    console.log("input discussion"+input);
	    
	    const hasil = await getDiscussionList();

            for(var i=0; i<hasil.length; i++){
                   diss = hasil[i]
                   
                   const commentRst = await getCommentList(diss.id)

                   dataArray.push({id: diss.id, materi: diss.materi, data: commentRst})
            }
            jsonRst.result = dataArray

            res.status(200).json(jsonRst);

	})();
	
}

async function addDiscussion(materi, userId){
	const sql = 'INSERT INTO discussion (materi, posted_by) values ("'+materi+'", '+userId+')';
	return pool.query(sql);
}

const getDiscussionsWithComment = (req, res) => {

    console.log("discussion with comment...");
	(async () =>{
		var jsonRst = {code: "9200", result: ""}
		var dataArray = []
		
		const hasil = await getDiscussionList();
		
		for(var i=0; i<hasil.length; i++){
		   diss = hasil[i]		 
		   console.log("discussion id"+ diss.id);
	           const commentRst = await getCommentList(diss.id)
		   
		   dataArray.push({id: diss.id, materi: diss.materi, data: commentRst})
		}
		jsonRst.result = dataArray

		res.status(200).json(jsonRst);
	})();
}

async function getDiscussionList(){
   const sql = 'select * from discussion where actived = 0 order by id desc';
   return pool.query(sql);
}

async function getCommentList(discussion_id){
	const sql = 'select a.*,b.fullname from commentar a left join accounts b on (b.id = a.user_id)  where discussion_id = '+discussion_id;
	return pool.query(sql);
}


module.exports = {
	setDiscussion,
	getDiscussions,
	getDiscussionsWithComment,
}

