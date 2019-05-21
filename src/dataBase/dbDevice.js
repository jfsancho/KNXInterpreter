

function ins(dev){

    return  `INSERT INTO devices (DEVgroupAddress,DEVstatusAddress,DEVdescription,DEVconnection,DEVdatapoint )
    VALUES ('${dev.DEVgroupAddress}', '${dev.DEVstatusAddress}','${dev.DEVdescription}','${dev.DEVconnection}','${dev.DEVdatapoint}'); `
};

function upd(dev){
    return  `UPDATE devices
    SET DEVstatusAddress = '${dev.DEVstatusAddress}',
    DEVdescription = '${dev.DEVdescription}',
    DEVconnection = '${dev.DEVconnection}',
    DEVdatapoint = '${dev.DEVdatapoint}'
    WHERE DEVgroupAddress = '${dev.DEVgroupAddress}'; `
};

function del(dev){
    return `DELETE FROM devices 
    WHERE DEVgroupAddress = '${dev.DEVgroupAddress}';`
};

function get(dev){
    return  `SELECT * FROM devices
    WHERE DEVgroupAddress = '${dev.DEVgroupAddress}';`
}; 

function getAll(){
    return `SELECT * FROM devices;`;
}
module.exports ={
    ins, get, del, upd, getAll
};