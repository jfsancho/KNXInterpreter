
function ins(info){

    return  `INSERT INTO information (INFOvalue,INFOdate,INFOdevice)
    VALUES ('${info.INFOvalue}', NOW(), '${info.INFOdevice}'); `
};

function upd(info){
    return  `UPDATE information
    SET INFOvalue = '${info.INFOvalue}', 
    INFOdate = NOW(),
    INFOdevice = '${info.INFOdevice}'
    WHERE INFOid = ${info.INFOid}; `
};

function del(info){
    return `DELETE FROM information 
    WHERE INFOid = ${info.INFOid};`
};

function get(info){
    return  `SELECT * FROM information
    WHERE INFOid = ${info.INFOid};`
}; 

module.exports ={
    ins, get, del, upd
};