//imports
let dbManager= require('../dataBase/dbManager.js');

let dbProcess = require('../dataBase/dbProcess.js');

let process =require('../logic/process.js');

let constants =require('../config/constants.js');
//create

let p1=process;
p1.PROCreadType=constants.PROCreadType.ONCHANGE;
p1.PROCid=2;
p1.PROCcycleTime=0;
p1.PROCdevice='0/0/2';



let sql;



let sqlResponse= function(result){
    console.log(result);
}
//dbManager.openCon();
//insert
sql=dbProcess.ins(p1);
dbManager.doQuery(sql,sqlResponse);
/*
//update
sql=dbProcess.upd(p1);
dbManager.doQuery(sql,sqlResponse);
//get
sql=dbProcess.get(p1);
dbManager.doQuery(sql,sqlResponse);
//getALL
sql=dbProcess.getAll();
dbManager.doQuery(sql,sqlResponse);
//delete
sql=dbProcess.del(p1);
dbManager.doQuery(sql,sqlResponse);

dbManager.endCon();*/