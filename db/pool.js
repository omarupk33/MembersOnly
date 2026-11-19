const {Pool} = require('pg')


module.exports = new Pool({
    connectionString:`postgresql://omar:1423O4756m@localhost:5432/post_app`
})