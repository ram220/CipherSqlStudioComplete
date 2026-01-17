
function validateQuery(sql){
    if(!sql){
        return {valid:false,message:"query is empty"}
    }

    const normalizedQuery=sql.trim().toUpperCase();

    if(!normalizedQuery.startsWith("SELECT")){
        return {valid:false,message:"Only SELECT statements are allowed"}
    }

    const words=["INSERT","UPDATE","CREATE","DELETE","ALERT","DROP","TRUNCATE"]

    for(let word of words){
        if(normalizedQuery.includes(word)){
            return {valid:false,message:"unsafe SQL detected"}
        }
    }

    return {valid:true}

}

module.exports=validateQuery;