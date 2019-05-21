let dbManager= require('../dataBase/dbManager.js');

let dbDatapoint = require('../dataBase/dbDatapoint.js');

let datapoint =require('../logic/datapoint.js');

let dt1=datapoint;
dt1.DPTname='DPT1.001';
dt1.DPTvalueType='boolean';
dt1.DPTdescription='switch';
dt1.DPTnotes=  " enc: { 0 : off, 1 : on } ";
dt1.DPTsupported=1;

console.log(dt1);

let dt2= Object.create(dt1);
dt2.DPTname='DPT1.010';
dt2.DPTvalueType='boolean';
dt2.DPTdescription='start/stop';
dt2.DPTnotes=  "enc : { 0 : Stop, 1 : Start }";
dt2.DPTsupported=1;


let sql;
let sqlResponse= function(result){
    
    console.log(result);
}

//insert
dbManager.openCon();
//insert
sql=dbDatapoint.ins(dt2);
dbManager.doQuery(sql,sqlResponse);

/*//update
sql=dbDatapoint.upd(dt2);
dbManager.doQuery(sql,sqlResponse);
//get
sql=dbDatapoint.get(dt2);
dbManager.doQuery(sql,sqlResponse);
//getALL
sql=dbDatapoint.getAll();
dbManager.doQuery(sql,sqlResponse);
//delete
//sql=dbDatapoint.del(dt2);
//dbManager.doQuery(sql,sqlResponse);
*/
dbManager.endCon();


