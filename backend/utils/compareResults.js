function normalizeRows(rows){
    return rows.map(row=>{
        const sortedRows=Object.keys(row).sort().reduce((obj,key)=>{
            obj[key]=row[key]
            return obj
        },{})
        return JSON.stringify(sortedRows)
    }).sort();
}


function compareResults(resultRows,expectedRows){
    const normalizedResultRows=normalizeRows(resultRows)
    const normalizedExpectedRows=normalizeRows(expectedRows)

    if(normalizedResultRows.length!==normalizedExpectedRows.length){
        return false
    }

    for(let i=0;i<normalizedResultRows.length;i++){
        if(normalizedResultRows[i]!==normalizedExpectedRows[i]){
            return false;
        }
    }

    return true;
 
}

module.exports=compareResults