
function ins(proc){

    return  `INSERT INTO processes (PROCreadType,PROCcycleTime,PROCdevice)
    VALUES ('${proc.PROCreadType}', ${proc.PROCcycleTime}, '${proc.PROCdevice}'); `
};

function upd(proc){
    return  `UPDATE processes
    SET PROCreadType = '${proc.PROCreadType}', 
    PROCcycleTime = ${proc.PROCcycleTime},
    PROCdevice = '${proc.PROCdevice}'
    WHERE PROCid = ${proc.PROCid}; `
};

function del(proc){
    return `DELETE FROM processes 
    WHERE PROCid = ${proc.PROCid};`
};

function get(proc){
    return  `SELECT * FROM processes
    WHERE PROCid = ${proc.PROCid};`
}; 

function getAll() {
    return `SELECT * FROM processes;`
}
module.exports ={
    ins, get, del, upd, getAll
};