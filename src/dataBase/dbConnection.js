function ins(conn){

    return  `INSERT INTO connections (CONNipAddress,CONNipPort,CONNphysAddress,CONNminDelay )
    VALUES ('${conn.CONNipAddress}', ${conn.CONNipPort},'${conn.CONNphysAddress}',${conn.CONNminDelay}); `
};

function upd(conn){
    return  `UPDATE connections
    SET CONNipPort = ${conn.CONNipPort},
    CONNphysAddress = '${conn.CONNphysAddress}',
    CONNminDelay = ${conn.CONNminDelay}
    WHERE CONNipAddress = '${conn.CONNipAddress}';`
};

function del(conn){
    return `DELETE FROM connections 
    WHERE CONNipAddress ='${conn.CONNipAddress}';`
};
function get(conn){
    return `SELECT * FROM connections
    WHERE CONNipAddress ='${conn.CONNipAddress}';`
};

function getAll(){
    return `SELECT * FROM connections;`
}
module.exports ={
    ins, get, del, upd, getAll
};