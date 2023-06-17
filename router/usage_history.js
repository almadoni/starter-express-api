// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");


const saveUsage = (req, res) => {
	console.log("usage history");
	console.log(req.body);

        const {userId, type, description} = req.body;
        const sql = 'INSERT into usage_history (user_id, type, description) values ('+userId+', "'+type+'", '"+description+"')';
        pool.run(sql,[userId, type, description], (error, results) =>{
          if(error){
	     res.status(200).json({code: "9999", result: error})  
             throw error
          }

          res.status(200).json({code: "9200", result: results})

        })
}

module.exports = {
	saveUsage,
}


