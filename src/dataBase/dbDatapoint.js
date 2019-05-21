//let datapoint= require ('../logic/datapoint.js');


function ins(dpt){
    return  `INSERT INTO datapoints (DPTname,DPTvalueType,DPTdescription,DPTnotes, DPTsupported)
    VALUES ('${dpt.DPTname}', '${dpt.DPTvalueType}', '${dpt.DPTdescription}', '${dpt.DPTnotes}', ${dpt.DPTsupported}); `
};

function upd(dpt){
    return  `UPDATE datapoints
    SET DPTvalueType = '${dpt.DPTvalueType}', 
    DPTdescription = '${dpt.DPTdescription}',
    DPTnotes = '${dpt.DPTnotes}',
    DPTsupported = '${dpt.DPTsupported}'
    WHERE DPTname = '${dpt.DPTname}'; `
};

function del(dpt){
    return `DELETE FROM datapoints 
    WHERE DPTname = '${dpt.DPTname}';`
};

function get(dpt){
    return  `SELECT * FROM datapoints
    WHERE DPTname = '${dpt.DPTname}';`
}; 

function getAll(){
    return `SELECT * FROM datapoints ;`
}
module.exports ={
    ins, get, del, upd, getAll
};