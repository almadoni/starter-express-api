const pool = require('./connection').pool;

const getMateries = (req, res) => {
	console.log("get materies");

        id = req.params.id

        pool.query('select c.id, c.fullname as assign_to,a.path, a.name,a.id as materi_id, a.create_date as create_materi from materi a left join materi_assign b on (a.id = b.materi_id) left join accounts c on (c.id = b.account_id) where c.id = $1',[id], (error, results) =>{
          if(error){
	     res.status(200).json({code: "9999", result: error})  
             throw error
          }

          res.status(200).json({code: "9200", result: results.rows})

        })
}

module.exports = {
	getMateries,
}


