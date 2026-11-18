const {Client} = require('pg')


const sql = `CREATE TABLE IF NOT EXISTS members 
(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullname TEXT, email TEXT , password INTEGER, membership_status BOOLEAN)`


async function main(){
    console.log('Seeding...')
    const client = new Client({
    connectionString:`postgresql://omar:1423O4756m@localhost:5432/post_app`
})

await client.connect()
await client.query(sql)
await client.end()
console.log('Done!')
}

main()