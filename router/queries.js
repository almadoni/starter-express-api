// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");


const login = (req, res) => {

	(async ()=>{

	console.log(req.body);
	const {username, password, token} = req.body;

		
	//pool.query('select * from accounts where username=$1 and password=$2',[username, password], (error, results) =>{
        //  if(error){
        //     console.log("Result :"+error);
	//     throw error
	//  }
         
	// const tologin = await doLogin(username, password);	
 	
 	doLogin1(username, password, token, res);

	 // console.log("Total :"+tologin.length)

         // if(tologin.length > 0){
         //  var up = await updateFCM(token, tologin[0].id);

	 //  res.status(200).json({code: "9200", result: tologin[0]})	
	 // }else{
	 //   res.status(200).json({code: "9999", result: "Error"})
	 // }

	//})

	})();	
}

async function doLogin1(username, password, token, res){
	const sql = "select * from accounts where username='"+username+"' and password='"+password+"'";
	pool.query(sql, (err, rst)=>{
		if(rst.length > 0){
	          var up = updateFCM(token, rst[0].id);

		  res.status(200).json({code: "9200", result: rst[0]})	
		 }else{
		   res.status(200).json({code: "9999", result: "Error"})
		 }
	});
}

async function doLogin(username, password){
	const sql = 'select * from accounts where username=$1 and password=$2';
	return pool.query(sql, [username, password]);
}

async function updateFCM(fcmId, userId){
	const sql = "update accounts set firebase_id = '"+fcmId+"' where id = "+userId;
	return pool.query(sql);
}

const getUsers = (req, res) => {

        pool.query('select * from accounts', (error, results) =>{
          if(error){
             throw error
          }

          res.status(200).json(results)

        })
}

const createUser = (req, res) =>{
	const {username, password, fullname, email, mhs_id, fcm_id} = req.body;
	pool.query("INSERT INTO accounts (username, password, fullname, email, mahasiswa_id, firebase_id) values ($1, $2, $3, $4, $5, $6)",
		[username, password, fullname, email, mhs_id, fcm_id], (error, results) =>{
		if(error){
		   throw error
		}	
		res.status(201).send(`User added with ID ${results.insertId}`);
	})
}

/*
const register = (req, res) =>{
	console.log(req.body);
        const {username, password, fullname, email, nomahasiswa} = req.body;
        pool.query("INSERT INTO accounts (username, password, fullname, email, mahasiswa_id) values ($1, $2, $3, $4, $5)",
                [username, password, fullname, email, nomahasiswa], (error, results) =>{
                if(error){
		   res.status(200).json({code: "9999", result: error});	
                   throw error
                }
                res.status(200).json({code: "9200", result: "OK"});
        })
}*/


const register = (req, res) =>{
	
	(async ()=> {
		console.log(req.body);
		const {username, password, fullname, email, nomahasiswa} = req.body;
		const doRegister = await saveRegister(username, password, fullname, email, nomahasiswa);
		var id = doRegister.insertId;
		console.log("id input accounts "+id);
		const dosave = await saveMateri(1, id);
		res.status(200).json({code: "9200", result: "OK"});
	})();
}

const util = require('util');

async function resultWithId(sql){
	var ArrBuyPrice = []
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

async function saveRegister(username, password, fullname, email, nomahasiswa){
	const sql = "INSERT INTO accounts (username, password, fullname, email, mahasiswa_id) values ('"+username+"', '"+password+"', '"+fullname+"', '"+email+"', "+nomahasiswa+")";
	// return pool.query(sql, [username, password, fullname, email, nomahasiswa]);
	return resultWithId(sql);
}

async function saveMateri(materiId, accountId){
	const sql = "insert into materi_assign (materi_id, account_id) values ($1, $2)";
	return pool.query(sql, [materiId, accountId]);
}



const updateUser = (req, res) =>{
	const id = req.params.id;
	const fcm_id = req.params.fcmid;

	pool.query("UPDATE accounts set firebase_id =$1 WHERE id = $2", [id, fcm_id], (error, results) =>{
		if(error){
		   throw error
		}
		res.status(200).json({result: "OK"})
	})
}


module.exports = {
	login,
	getUsers,
	createUser,
	updateUser,
	register,
}
