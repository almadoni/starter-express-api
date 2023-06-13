var XLSX = require('xlsx')

const express = require('express');
const pool = require('./connection').pool;

const router = express.Router();
 

const path = __dirname;

router.get('/initdata', (req, res) =>{
	console.log("path : "+path)
	var workbook = XLSX.readFile(path+'/kuis-1.xls');
	var sheet_name_list = workbook.SheetNames;
	var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
	// console.log(xlData);
	console.log("size data : "+xlData.length)
	prosesData(xlData)
	
	if(req.session.status == "Admin"){		  
		res.send(xlData);
	}else{ 
		res.send("Your not admin");
	}
});

function findAccounts(fullname,address,email){
    return new Promise(resolve => {
        var query = "SELECT * FROM accounts where fullname = $1 or email = $2";
        pool.query(query, [fullname,email], function (error, results){             
            if(error){
                console.log(error)
            } else{
                resolve(results.rows); //Kembalian berupa kontak data
            }
        });
    });
}

async function saveQuestion(examId, name){
	const sql = 'insert into question (exam_id, name, create_by) values($1, $2, 1) returning id';
	return pool.query(sql, [examId, name]);
}

async function saveAnswer(questionId, option1, option2, option3, option4, option5, answer){
	const sql = 'insert into answer (question_id, option1, option2, option3, option4, option5, option_answer) values ($1, $2, $3, $4, $5, $6, $7)';
	return pool.query(sql, [questionId, option1, option2, option3, option4, option5, answer])
}

const prosesData = async (xlData) => { 
	
	let num =0;
	let count = 0;
	for(id in xlData){
		num++
		// console.log("Number : "+num)
		var row = xlData[id]
		materi_no = row["Materi no"]
		nama_kuis = row["nama kuis"]
		question_name = row["jpertanyaan"]
		option1 = row["pilih A"]
		option2 = row["pilih B"]
		option3 = row["pilih C"]
		option4 = row["pilih D"]
		option5 = row["pilih E"]
		optionA = row["jawaban benar"]
		if(materi_no != undefined && materi_no != 'NAMA'){
			console.log(id+ "init..."+materi_no+" ---" + nama_kuis+"--"+question_name+"--"+option1+"--"+option2);
			const input = await saveQuestion(materi_no, question_name);
			console.log("return id : "+input.rows[0].id);
			console.log("num "+num);
			var questionId = input.rows[0].id;
			var numA = 0;
			if(optionA == 'A')
				numA = 1;
			else if(optionA == 'B')
				numA = 2;
			else if (optionA == 'C')
				numA = 3;
			else if (optionA == 'D')
				numA= 4;
			else if (optionA == 'E')
				numA = 5;
			const inputAnsw = await saveAnswer(questionId, option1, option2, option3, option4, option5, numA);
			//if (num == 3) break;
		}  
	} 
 
}

module.exports = router;

