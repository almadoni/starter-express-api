const pool = require('./connection').pool;

const login = (req, res) => {

	(async ()=>{

	console.log(req.body);
	const {username, password, token} = req.body;

		
	//pool.query('select * from accounts where username=$1 and password=$2',[username, password], (error, results) =>{
        //  if(error){
        //     console.log("Result :"+error);
	//     throw error
	//  }
         
	const tologin = await doLogin(username, password);	
	 console.log("Total :"+tologin.rows.length)

         if(tologin.rows.length > 0){
          var up = await updateFCM(token, tologin.rows[0].id);

	  res.status(200).json({code: "9200", result: tologin.rows[0]})	
	 }else{
	   res.status(200).json({code: "9999", result: "Error"})
	 }

	//})

	})();	
}

async function doLogin(username, password){
	const sql = 'select * from accounts where username=$1 and password=$2';
	return pool.query(sql, [username, password]);
}

async function updateFCM(fcmId, userId){
	const sql = 'update accounts set firebase_id = $1 where id = $2';
	return pool.query(sql, [fcmId, userId]);
}

const getUsers = (req, res) => {

        pool.query('select * from accounts', (error, results) =>{
          if(error){
             throw error
          }

          res.status(200).json(results.rows)

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
		var id = doRegister.rows[0].id;
		console.log("id input accounts "+id);
		const dosave = await saveMateri(1, id);
		res.status(200).json({code: "9200", result: "OK"});
	})();
}

async function saveRegister(username, password, fullname, email, nomahasiswa){
	const sql = "INSERT INTO accounts (username, password, fullname, email, mahasiswa_id) values ($1, $2, $3, $4, $5) returning id";
	return pool.query(sql, [username, password, fullname, email, nomahasiswa]);
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
