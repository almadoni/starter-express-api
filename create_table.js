const db = require("./db_config");

let sql = `CREATE TABLE IF NOT EXISTS favorite_songs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(64),
        artist VARCHAR(64)
    );`;

let sql_account = `CREATE TABLE IF NOT EXISTS accounts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    created_on datetime default current_timestamp,
    last_login datetime default current_timestamp,
    session_id VARCHAR(100),
    firebase_id VARCHAR(255),
    mahasiswa_id VARCHAR(100),
    status VARCHAR(100),
    active integer default 0
);`;

let sql_answer = `CREATE TABLE IF NOT EXISTS answer (
    id integer PRIMARY KEY AUTOINCREMENT,
    option1 VARCHAR(255) NOT NULL,
    option2 VARCHAR(255) NOT NULL,
    option3 VARCHAR(255) NOT NULL,
    option4 VARCHAR(255) NOT NULL,
    option_answer integer NOT NULL,
    question_id integer,
    option5 VARCHAR(255)
);`;

let sql_commentar = `CREATE TABLE IF NOT EXISTS commentar (
    id integer PRIMARY KEY AUTOINCREMENT,
    discussion_id integer,
    comment VARCHAR(255) NOT NULL,
    user_id integer,
    created_date datetime default current_timestamp
);`;

let sql_discussion = `CREATE TABLE IF NOT EXISTS discussion (
    id integer PRIMARY KEY AUTOINCREMENT,
    materi VARCHAR(255) NOT NULL,
    posted_by integer,
    create_date datetime default current_timestamp,
    actived integer DEFAULT 0
);`;

let sql_exam = `CREATE TABLE IF NOT EXISTS exam (
    id integer PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    materi_id integer NOT NULL,
    create_date datetime default current_timestamp
);`;

let sql_materi = `CREATE TABLE IF NOT EXISTS materi (
    id integer PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    create_date datetime default current_timestamp,
    path VARCHAR(255)
);`;

let sql_materi_assign = `CREATE TABLE IF NOT EXISTS materi_assign (
    id integer PRIMARY KEY AUTOINCREMENT,
    materi_id integer NOT NULL,
    account_id integer NOT NULL,
    create_date datetime default current_timestamp
);`;

let sql_poin_exam = `CREATE TABLE IF NOT EXISTS poin_exam (
    id integer PRIMARY KEY AUTOINCREMENT,
    exam_id integer,
    user_id integer,
    transaction_number VARCHAR(100),
    score integer NOT NULL,
    create_date datetime default current_timestamp,
    status integer
);`;

let sql_poin_exam_detail = `CREATE TABLE IF NOT EXISTS poin_exam_detail (
    id integer PRIMARY KEY AUTOINCREMENT,
    poin_exam_id integer,
    answer integer,
    istrue boolean,
    created_date datetime default current_timestamp,
    answer_id integer
);`;

let sql_question = `CREATE TABLE IF NOT EXISTS question (
    id integer PRIMARY KEY AUTOINCREMENT,
    exam_id integer,
    name text NOT NULL,
    create_by integer NOT NULL,
    create_date datetime default current_timestamp
);`;

let sql_usage_history = `CREATE TABLE IF NOT EXISTS usage_history (
    id integer PRIMARY KEY AUTOINCREMENT,
    user_id integer,
    type VARCHAR(100) NOT NULL,
    description VARCHAR(150),
    create_date datetime default current_timestamp
);`;

db.run(sql_usage_history, (err, result) => {
  if (err) throw err;
  console.log("Table created");
});

db.close();
