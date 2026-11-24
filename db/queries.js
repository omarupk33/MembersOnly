const pool = require('./pool')


// err here
async function registerUser(firstname, lastname, email, password, membership_status) {
  const { rows } = await pool.query(`INSERT INTO members 
    (firstname, lastname, email, password, membership_status) 
    VALUES
    ($1, $2, $3, $4, $5);
`,[firstname, lastname, email, password, membership_status]);
  return rows;
}


const findMemberByEmail = async(email)=>{
    const getUser = await pool.query(`SELECT * FROM members
        WHERE email = $1 LIMIT 1;`, [email])


        return getUser.rows[0]
}


async function addPost(firstname,newPost) {
  const { rows } = await pool.query(`INSERT INTO posts 
    (poster, content) 
    VALUES
    ($1, $2);
`,[firstname, newPost]);
  return rows;
}


async function allPosts() {
  const { rows } = await pool.query(`SELECT * FROM posts;`);
  return rows;
}


module.exports = {registerUser, findMemberByEmail, addPost, allPosts}