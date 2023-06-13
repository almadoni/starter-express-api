const pool = require('./connection').pool;

const saveUsage = (req, res) => {
	console.log("usage history");
	console.log(req.body);

        const {userId, type, description} = req.body;
        const sql = 'INSERT into usage_history (user_id, type, description) values ($1, $2, $3)';
        pool.query(sql,[userId, type, description], (error, results) =>{
          if(error){
	     res.status(200).json({code: "9999", result: error})  
             throw error
          }

          res.status(200).json({code: "9200", result: results.rows})

        })
}

module.exports = {
	saveUsage,
}


