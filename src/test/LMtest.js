let logicManager = require('../logic/logicManager');

let LM = new logicManager();
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

LM.dbManager.getAllDPT(LM.setDPTList); //CHECK
LM.dbManager.getAllCONN(LM.setCONNList); //CHECK
//LM.dbManager.getAllDEV(LM.setDEVList); //CHECK

let seti = setInterval((a)=>{if(a.ready){
    console.log('ready');
    clearInterval(seti)}},2000,LM);


















/*Mysql LINKS
https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
https://codeforgeek.com/nodejs-mysql-tutorial/
https://www.w3schools.com/nodejs/nodejs_mysql.asp

IMPORT/EXPORT
https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/

SHARED MEMORY WORKERS
https://lucasfcosta.com/2017/04/30/JavaScript-From-Workers-to-Shared-Memory.html

SETINTERVAL
https://javascript.info/settimeout-setinterval
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
*/