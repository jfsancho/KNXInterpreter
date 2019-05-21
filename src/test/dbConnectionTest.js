//imports
let dbManager= require('../dataBase/dbManager.js');

let dbConnection = require('../dataBase/dbConnection.js');

let connection =require('../logic/connection.js');

//create

let c1=connection;

c1.CONNipAddress='192.168.0.20'
c1.CONNipPort=3671;
c1.CONNphysAddress='1.1.3'
c1.CONNminDelay=10;

let sql;



let sqlResponse= function(result){
    console.log(result);
}
//dbManager.openCon();
//insert
sql=dbConnection.ins(c1);
dbManager.doQuery(sql,sqlResponse);

//update
//sql=dbConnection.upd(c1);
//dbManager.doQuery(sql,sqlResponse);
//get
//sql=dbConnection.get(c1);
//dbManager.doQuery(sql,sqlResponse);
//getALL
//sql=dbConnection.getAll();
//dbManager.doQuery(sql,sqlResponse);
//delete
//sql=dbConnection.del(c1);
//dbManager.doQuery(sql,sqlResponse);

//dbManager.endCon();