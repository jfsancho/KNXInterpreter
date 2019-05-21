//imports
let dbManager= require('../dataBase/dbManager.js');

let dbInformation = require('../dataBase/dbInformation.js');

let information =require('../logic/information.js');

let constants =require('../config/constants.js');
//create

let i1=information;
i1.INFOid=1;
i1.INFOvalue='1';
i1.INFOdevice='0/0/1';



let sql;



let sqlResponse= function(result){
    console.log(result);
}
dbManager.openCon();
//insert
sql=dbInformation.ins(i1);
dbManager.doQuery(sql,sqlResponse);

//update
sql=dbInformation.upd(i1);
dbManager.doQuery(sql,sqlResponse);
//get
sql=dbInformation.get(i1);
dbManager.doQuery(sql,sqlResponse);

//delete
sql=dbInformation.del(i1);
dbManager.doQuery(sql,sqlResponse);

dbManager.endCon();