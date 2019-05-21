
let mysql = require('mysql');
let constants = require('../config/constants.js');
let dbDatapoint = require('../dataBase/dbDatapoint.js');
let dbConnection = require('../dataBase/dbConnection.js');
let dbDevice = require('../dataBase/dbDevice.js');
let dbProcess = require('../dataBase/dbProcess.js');
let dbInformation = require ('../dataBase/dbInformation.js');

let constDB=constants.DB;


class dbManager{
    

  constructor(){
    this.mysqlCon = mysql.createPool({
      connectionLimit : 100,
      host      : constDB.HOST,
      user      : constDB.USER,
      password  : constDB.PASSWORD,
      database  : constDB.DATABASE,
      debug     : false
    });
  }

  openCon(){
    this.mysqlCon.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.'); // show on GUI
      });
  }

  endCon(){
    this.mysqlCon.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.'); // show on GUI
      });
  };

  doQuery(sql,callback){
    this.mysqlCon.query(sql, function (err, rows) {
      
      if (err) throw err;
      rows=JSON.parse(JSON.stringify(rows));

      if(callback){
        callback(rows);
      }
      console.log("1 record inserted"); 
    });
  }; 


  insertDPT(dpt,callback){
    let sql=dbDatapoint.ins(dpt);
    this.doQuery(sql,callback);
  }

  insertCONN(conn,callback){
    let sql=dbConnection.ins(conn);
    this.doQuery(sql,callback);
  }

  insertDEV(dev,callback){
    let sql=dbDevice.ins(dev);
    this.doQuery(sql,callback);
  }

  insertPROC(proc,callback){
    let sql=dbProcess.ins(proc);
    this.doQuery(sql,callback);
  }

  insertINFO(info,callback){
    let sql=dbInformation.ins(info);
    this.doQuery(sql,callback);
  }

  //DELETES
  deleteDPT(dpt,callback){
    let sql=dbDatapoint.del(dpt);
    this.doQuery(sql,callback);
  }

  deleteCONN(conn,callback){
    let sql=dbConnection.del(conn);
    this.doQuery(sql,callback);
  }

  deleteDEV(dev,callback){
    let sql=dbDevice.del(dev);
    this.doQuery(sql,callback);
  }

  deletePROC(proc,callback){
    let sql=dbProcess.del(proc);
    this.doQuery(sql,callback);
  }

  deleteINFO(info,callback){
    let sql=dbInformation.del(info);
    this.doQuery(sql,callback);
  }

  //UPDATES
  updateDPT(dpt,callback){
    let sql=dbDatapoint.upd(dpt);
    this.doQuery(sql,callback);
  }

  updateCONN(conn,callback){
    let sql=dbConnection.upd(conn);
    this.doQuery(sql,callback);
  }

  updateDEV(dev,callback){
    let sql=dbDevice.upd(dev);
    this.doQuery(sql,callback);
  }

  updatePROC(proc,callback){
    let sql=dbProcess.upd(proc);
    this.doQuery(sql,callback);
  }

  updateINFO(info,callback){
    let sql=dbInformation.upd(info);
    this.doQuery(sql,callback);
  }

  //GETS
  getDPT(dpt,callback){
    let sql=dbDatapoint.get(dpt);
    this.doQuery(sql,callback);
  }

  getCONN(conn,callback){
    let sql=dbConnection.get(conn);
    this.doQuery(sql,callback);
  }

  getDEV(dev,callback){
    let sql=dbDevice.get(dev);
    this.doQuery(sql,callback);
  }

  getPROC(proc,callback){
    let sql=dbProcess.get(proc);
    this.doQuery(sql,callback);
  }

  getINFO(info,callback){
    let sql=dbInformation.get(info);
    this.doQuery(sql,callback);
  }

  //getALL
  getAllDPT(callback){
    let sql=dbDatapoint.getAll();
    this.doQuery(sql,callback);
  }

  getAllCONN(callback){
    let sql=dbConnection.getAll();
    this.doQuery(sql,callback);
  }

  getAllDEV(callback){
    let sql=dbDevice.getAll();
    this.doQuery(sql,callback);
  }

  getAllPROC(callback){
    let sql=dbProcess.getAll();
    this.doQuery(sql,callback);
  }

} 
 

module.exports = new dbManager();