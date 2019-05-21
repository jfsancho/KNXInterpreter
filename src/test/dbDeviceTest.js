//imports
let dbManager= require('../dataBase/dbManager.js');

let dbDevice = require('../dataBase/dbDevice.js');

let device =require('../logic/device.js');

//create

let d1=device;
d1.DEVgroupAddress='0/0/4';
d1.DEVstatusAddress=null;
d1.DEVdescription='Luces';
d1.DEVdatapoint='DPT1.001';
d1.DEVconnection='192.168.0.15';



let sql;



let sqlResponse= function(result){
    console.log(result);
}
//dbManager.openCon();
//insert
sql=dbDevice.ins(d1);
dbManager.doQuery(sql,sqlResponse);
/*
//update
sql=dbDevice.upd(d1);
dbManager.doQuery(sql,sqlResponse);
//get
sql=dbDevice.get(d1);
dbManager.doQuery(sql,sqlResponse);
//getALL
sql=dbDevice.getAll();
dbManager.doQuery(sql,sqlResponse);
//delete
//sql=dbDevice.del(d1);
//dbManager.doQuery(sql,sqlResponse);

dbManager.endCon();*/