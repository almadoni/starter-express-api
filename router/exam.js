// const pool = require('./connection').pool;
// const pool = require("../db_config");
const pool = require("./connection_mysql");



const getExams = (req, res) => {
	(async ()=> {
		jsonRst = {code: "9200", result: "", total_data: 0}
		const exam_list = await exams();

		var dataList = [];

		for (var i=0; i<exam_list.length; i++){
			examId = exam_list[i].id;
			const question_list = await question(examId);
			dataQuestion = []
			for (var q=0; q<question_list.length; q++){
				qId = question_list[q].id;
				qName = question_list[q].name;
				const answerList = await answers(qId);
				questionValue = {id: qId, name: qName, answers: answerList, total_answer : answerList.length}
				dataQuestion.push(questionValue)
			}

			dataExam = {exam_id : examId, questions: dataQuestion}
		

			dataList.push(dataExam);
		}
		jsonRst.result = dataList;
		jsonRst.total = dataList.length;
		res.status(200).json(jsonRst);
	})();
       
}

async function question(examId){
 	const sql = 'select * from question where exam_id = '+examId;
	return pool.query(sql);
}

async function answers(questionId){
	const sql = 'select * from answer where question_id = '+questionId;
	return pool.query(sql);
}

async function exams(){
	const sql = 'select * from exam';
	return pool.query(sql);
}

async function exam_old(materiId){
	//const sql = 'select * from exam a left join materi b on (a.materi_id = b.id) where b.id = $1';
	const sql = 'select b.* from materi a left join exam b on (a.id = b.materi_id) where a.id = '+materiId;
	return pool.query(sql);
}

const util = require('util');

async function exam_new2(materiId){ 
	console.log("exam_new2...."+materiId);

	const sql = 'select b.* from materi a left join exam b on (a.id = b.materi_id) where a.id = '+materiId; 
 
    return resultArray(sql); 
}

async function resultArray(sql){
	var ArrBuyPrice = []

    const query = util.promisify(pool.query).bind(pool);

    try {
        const rows = await query(sql);
        for (var i in rows) {
        	  console.log("isi : ");
        	  console.log(rows[i]);
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



async function exam(materiId){
	//const sql = 'select * from exam a left join materi b on (a.materi_id = b.id) where b.id = $1';
	// const sql = 'select b.* from materi a left join exam b on (a.id = b.materi_id) where a.id = '+materiId;
	// return pool.query(sql);

	var data = [];
	const sql = 'select b.* from materi a left join exam b on (a.id = b.materi_id) where a.id = '+materiId;
	pool.query(sql, function(err, rows, field){
		if(err) throw err;
		data = rows;
		console.log("isi rows "+rows);
	});
	console.log(data);
	return data;
}

function exam_new(res, materiId){
	const sql = 'SELECT q.id as q_id, q.*, a.id as a_id, a.* FROM question q left join answer a on (a.question_id = q.id) where q.exam_id = '+materiId;
	pool.query(sql, function(err, rows, fields){
		if(err) throw err;

		dataQuestion = []; 

		console.log("length : "+rows.length);

		if(rows.length > 0){
			for(var i=0; i<rows.length; i++){
				answer = {id: rows[i].a_id, option1: rows[i].option1, option2: rows[i].option2, option3: rows[i].option3,
					option4: rows[i].option4, option5: rows[i].option5, option_answer: rows[i].option_answer, question_id: rows[i].question_id
			};
				data = {id: rows[i].q_id, name: rows[i].name, answers: answer};
				dataQuestion.push(data);	
			}
			
		}
		res.status(200).json({code: "9200", result: dataQuestion});

	});
}

async function getPoin(userId, examId, trxExam){
	console.log("getPoin...");
	const sql = 'select * from poin_exam where user_id = '+userId+' and exam_id = '+examId+' and transaction_number = "'+trxExam+'" and status = 0';
	// return pool.query(sql);
	return resultArray(sql);
}
 

async function getPoinExam(examId, answerId, trxExam){
	//const sql = 'select * from poin_exam where exam_id = $1 and answer_id = $2';
	const sql = 'select a.* from poin_exam_detail a left join poin_exam b on (a.poin_exam_id = b.id) where a.poin_exam_id = '+examId+' and b.status = 0 and a.answer_id = '+answerId+' and b.transaction_number = "'+trxExam+'"';
	console.log("param examId :"+examId+" answerId:"+answerId+" trxExam"+trxExam);
	console.log("sql getPoinExam "+sql);

	// return pool.query(sql,[examId, answerId, trxExam]);
	return resultArray(sql);
}

async function setPoinExam(userId, examId, trxExam){	
	// const sql = 'INSERT into poin_exam (user_id, exam_id, score, status, transaction_number) values('+userId+', '+examId+', 0, 0,"'+trxExam+'") returning id';
	const sql = 'INSERT into poin_exam (user_id, exam_id, score, status, transaction_number) values('+userId+', '+examId+', 0, 0,"'+trxExam+'")';
	// return pool.query(sql, [userId, examId, trxExam]);
	return resultArray(sql);
}

async function setPoinExamDetail(examId, answerId, answerOptionId, isTrue){
	const sql = 'INSERT into poin_exam_detail (poin_exam_id, answer_id, answer, istrue) values ('+examId+', '+answerId+', '+answerOptionId+', '+isTrue+')';
	// return pool.query(sql,[examId, answerId, answerOptionId, isTrue]);
	return resultArray(sql);
}

async function getAnswer(id){
	const sql = 'select option_answer from answer where id = '+id;
	// return pool.query(sql,[id]);
	return resultArray(sql);
}

async function updatePoinExamDetail(poinExamId, answerId, isTrue, answer){
	const sql = 'update poin_exam_detail set answer = '+answer+', istrue = '+isTrue+' where poin_exam_id = '+poinExamId+' and answer_id = '+answerId;
	// return pool.query(sql,[poinExamId, answerId, answer, isTrue]);
	return resultArray(sql);
}

async function updatePoinExamScore(userId, examId, score, trxExam){
	const sql = 'update poin_exam set score = '+score+', status=1 where transaction_number = '+trxExam; 
       	// return pool.query(sql, [score, trxExam]);
	return resultArray(sql);
}

async function getTotalQuestion(examId){
	console.log("examId : "+examId);
	const sql = 'select count(*) as total from question where exam_id = '+examId;
	// return pool.query(sql, [examId]);
	return resultArray(sql);
}

async function getTotalAnswerExam(trxExam, examId, userId){
	const sql = "select count(a.*) as total from poin_exam_detail a left join poin_exam b on (a.poin_exam_id = b.id)  where b.exam_id = "+examId+" and b.user_id = "+userId+" and b.transaction_number ="+trxExam+" and a.istrue and b.status = 0";
	console.log(sql);
	// return pool.query(sql, [examId, userId, trxExam]);
	return resultArray(sql);
}

const getScore = (req, res) =>{
	const {trxExam, userId, examId} = req.params;

	(async ()=>{
		console.log("get Score");
		console.log(req.params);

		jsonRst = {code: "9200", result:""}

		const ex = await exam(examId);
		var currExamId = ex[0].id;

		const totalQuestion = await getTotalQuestion(currExamId);
		const totalAnswerExam = await getTotalAnswerExam(trxExam, currExamId, userId);
	        
		console.log(totalQuestion);
		console.log(totalAnswerExam);

		console.log("Total Qest "+totalQuestion[0].total);
		console.log("Total Ans " +totalAnswerExam[0].total);

		var currTotalQst = totalQuestion[0].total;
		var currTotalAExam = totalAnswerExam[0].total;
		var score = 0;
                console.log("update poin exam score : "+score);
		if(currTotalQst == 0 && currTotalAExam == 0){
			score = 0;
		}else{
			score = (currTotalAExam/currTotalQst)*100;
			score = Math.round(score);
		}
		const updateScore = await updatePoinExamScore(userId, examId, score, trxExam);
		jsonRst.result = {score: score}

		res.status(200).json(jsonRst);
		
	})();

}

const getExam = (req, res) =>{
	
	(async ()=>{
		materiId = req.params.materiId;
		console.log("getExam with materi id "+materiId);
		exam_new(res, materiId);
		// const ex = await exam(materiId);
		// console.log(ex);
		// if(ex.length > 0){
		// 	examId = ex[0].id;
		// 	const question_list = await question(examId);
          //               dataQuestion = []
          //               for (var q=0; q<question_list.length; q++){
          //                       qId = question_list[q].id;
          //                       qName = question_list[q].name;
          //                       const answerList = await answers(qId);
          //                       data = {id: qId, name: qName, answers: answerList[0]}
		// 		dataQuestion.push(data);
          //               }

       	// 		res.status(200).json({code: "9200", result: dataQuestion});

		// }
	})();

}

const savePoinExam = (req, res) =>{	
	const {userId, examId, answerId, answerOption, trxExam} = req.body;

	(async ()=> {
		console.log("save exam");
		console.log(req.body);

		jsonRst = {code: "9200", result: ""};

		const ex = await exam_new2(examId);
 
		// const ex = await exam(examId);
		var currExamId = ex[0].id;
		console.log("curr examId : "+ currExamId);

		const p = await getPoin(userId, currExamId, trxExam);
		//check apakah trx poin nya ada yg lagi jalan
		console.log("start poin with check get poin");
		console.log(p);
		
		var isiPoin = p.length;
                console.log("total isi "+isiPoin);
		
		if(isiPoin == 0){
		    //todo insert poin exam and poin exam detail
		    console.log("1. start save poin...");
		    const insertPoin = await setPoinExam(userId, currExamId, trxExam);

		    console.log("insert poin : "+insertPoin);
			
		    const answer = await getAnswer(answerId); //harus check query
                        var isAnswerTrue = false;
                        if(answer.length > 0){
                             console.log("open answer"+ answer[0].option_answer);
                             console.log("jawaban "+answerOption);
                             isAnswerTrue = answer[0].option_answer == answerOption;
                        }
		    const idInsetPoinExam = insertPoin[0].insertId;

		    console.log("2. start save poin detail... with id : "+ idInsetPoinExam)	
		    const insertPoinExamDetail = await setPoinExamDetail(idInsetPoinExam, answerId, answerOption, isAnswerTrue);
                    console.log(insertPoinExamDetail);
	
		    console.log("response id ---- : "+insertPoin[0]);
		    console.log("response id : " + insertPoin[0].insertId);
		    jsonRst.code = "9200";
		    jsonRst.result = insertPoin[0].insertId;
		}else{
		    console.log("3. lanjut kan update poin detail");	
		    console.log("update id "+p[0].id);
		    //todo update
	            //1. check poin examp detail 
		    pei = p[0].id;
		    const checkDetail = await getPoinExam(pei, answerId, trxExam);
		    console.log(checkDetail);
		    //2. insert or update
		    if(checkDetail.length > 0){		
			console.log("start poin exam detail...");
			const answer = await getAnswer(answerId); //harus check query
                        var isAnswerTrue = false;
                        if(answer.length > 0){
                             console.log("open answer"+ answer[0].option_answer);
                             console.log("jawaban "+answerOption);
                             isAnswerTrue = answer[0].option_answer == answerOption;
                        }
			console.log("4. update poin exam detail...");
			const updatePExamDetail = await updatePoinExamDetail(pei, answerId, isAnswerTrue, answerOption);
			console.log("4. done update "+updatePExamDetail);
		    }else{			
			console.log("5. insert poin exam detail");
			const answer = await getAnswer(answerId); //harus check query
			var isAnswerTrue = false;
			if(answer.length > 0){
			     console.log("open answer"+ answer[0].option_answer);
			     console.log("jawaban "+answerOption);
			     isAnswerTrue = answer[0].option_answer == answerOption;
			}
			//var poinId = checkDetail[0].poin_exam_id;    
			const insertPoinExamDetail = await setPoinExamDetail(pei, answerId, answerOption, isAnswerTrue);
			console.log("5. done insert");
			console.log(insertPoinExamDetail);    
		    }
		    jsonRst.result = "update id:"+p[0].id;
		}

		res.status(200).json(jsonRst);
	})();
}

module.exports = {
  savePoinExam,
  getExams,
  getExam,
  getScore
}
