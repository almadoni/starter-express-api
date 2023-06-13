const Pool = require('pg').Pool
const pool = new Pool({
	user: 'almadoni',
	host: 'localhost',
	database: 'elearning',
	password: 'doni',
	port: 5432,

})


module.exports = {
	pool,
}
