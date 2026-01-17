const {Pool}=require('pg')
    console.log(process.env.POSTGRES_URI)

const pool=new Pool({
    connectionString:process.env.POSTGRES_URI
})

pool.on('connect',()=>{
    console.log("postgrees conected");
})

module.exports=pool;