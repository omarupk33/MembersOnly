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


const findUserByEmail = async(email)=>{
    const getUser = await pool.query(`SELECT * FROM members
        WHERE email = $1 LIMIT 1;`, [email])


        return getUser.rows[0]
}


async function addPost(fullname,newPost) {
  const { rows } = await pool.query(`INSERT INTO posts 
    (poster, content) 
    VALUES
    ($1, $2);
`,[fullname, newPost]);
  return rows;
}


async function allPosts() {
  const { rows } = await pool.query(`SELECT * FROM posts;`);
  return rows;
}


module.exports = {registerUser, findUserByEmail, addPost, allPosts}