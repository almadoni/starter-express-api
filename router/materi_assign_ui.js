// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");

const express = require('express');

const router = express.Router();
const util = require('util');

async function resultWithId(sql){ 
	var idResult;

    const query = util.promisify(pool.query).bind(pool);

    try {
        const rows = await query(sql); 
        console.log("get response id");
        console.log(rows);
        return rows.insertId;
    } catch (error) {
        console.log(error)
        return [];
    } finally {
        // pool.end();
    }
}

async function resultArray(sql){
	var ArrBuyPrice = []

    const query = util.promisify(pool.query).bind(pool);

    try {
        const rows = await query(sql);
        for (var i in rows) { 
            ArrBuyPrice.push(rows[i])
        }
        return ArrBuyPrice;
    } catch (error) {
        console.log(error)
        return [];
    } finally {
        // pool.end();
    }
}

router.get('/list_materi_assign/:userId/:fullname', (req, res) =>{

	var userId = req.params.userId;
	var fullname = req.params.fullname;

	pool.query("select b.id as assign_id, a.id, a.name as materi_name, b.account_id as account, case when b.account_id is null  then false when b.account_id is not null then true end isActive from materi a left join materi_assign b on (a.id = b.materi_id and b.account_id = "+userId+")", (error, results) =>{
          if(error){
             throw error
          }

          res.render('main',{
		layout: 'index',
		username: req.session.username,
		list_materi_assign: true,
		materi_owner: fullname,
		user_id: userId,
		data: results
	  });

        });

});

router.get('/api/update_materi_assign/:userId/:materiId/:assignId/:isCheck', (req, res) =>{
	(async ()=>{
        console.log("update materi assign");
	console.log(req.params);
	
	const {userId, materiId, assignId, isCheck} = req.params;
	
	if(isCheck == "true"){
	   console.log("do insert");
		doSave = await saveAssign(materiId, userId);
		console.log(doSave);
	}else{
	   console.log("do delete");
		doDelete = await deleteAssign(assignId);
		console.log(doDelete);
	}

	jsonResult = {code: "9200", result: "OK"}
	res.status(200).json(jsonResult);

	})();
});

async function saveAssign(materiId, accountId){
	const sql = "Insert into materi_assign (materi_id, account_id) values("+materiId+", "+accountId+")";
	// return pool.query(sql);
	return resultWithId(sql);
}

async function deleteAssign(materiAssignId){
	const sql = "Delete from materi_assign where id = "+materiAssignId;
	// return pool.query(sql);
	return resultArray(sql);

}


module.exports = router;


