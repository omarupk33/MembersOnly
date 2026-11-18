const pool = require('./pool')


// err here
async function registerUser(fullname, email, password, membership_status) {
  const { rows } = await pool.query(`INSERT INTO members 
    (fullname, email, password, membership_status) 
    VALUES
    ($1, $2, $3, $4);
`,[fullname, email, password, membership_status]);
  return rows;
}


const findUser = async(username)=>{
    const getUser = await pool.query(`SELECT * FROM users
        WHERE id = $1;`, [username])
        console.log(getUser)
        return getUser.rows
}


module.exports = {registerUser, findUser}