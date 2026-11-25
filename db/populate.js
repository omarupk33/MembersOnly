const {Client} = require('pg')


const sql = `CREATE TABLE IF NOT EXISTS members 
(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
firstname TEXT, lastname TEXT, email TEXT, 
password TEXT, membership_status BOOLEAN)`


async function main(){
    console.log('Seeding...')
    const client = new Client({
    connectionString: process.env.DATABASEURL
})

await client.connect()
await client.query(sql)
await client.end()
console.log('Done!')
}

main()
