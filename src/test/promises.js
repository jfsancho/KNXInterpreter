let mysql= require('mysql');
let constants = require('../config/constants.js');

let mysqlCon = mysql.createConnection({
    host: constants.DB.HOST,
    user: constants.DB.USER,
    password: constants.DB.PASSWORD,
    database: constants.DB.DATABASE
  });

/*mysqlCon.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.'); // show on GUI
  });*/

let dpts;


function delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      mysqlCon.query('SELECT * FROM datapoints', function (err, rows) {
      
        if (err) throw err;
        rows=JSON.parse(JSON.stringify(rows));
        console.log("1 record inserted"); 

        resolve(rows);
        });
    });
  }
  
async function does(){
     return dpts = await delay()
     console.log(dpts);
}
//does();


class Rectangle {
    
   constructor(
     
   ) {
        return new Promise(function(resolve,reject){
            if (!!Rectangle.instance) {
                resolve(Rectangle.instance);
            }
            else{
                
                /*mysqlCon.query('SELECT * FROM datapoints', function (err, rows) {
      
                    if (err) throw err;
                    this.dptList=JSON.parse(JSON.stringify(rows));
                    console.log("1 record inserted"); 
                });*/

    
                Rectangle.instance = this;
                console.log(Rectangle.instance)
                resolve(this)
            }
        });
        
        
    }
  }


  rec= new Rectangle();

  console.log(typeof rec);
  console.log(rec.constructor.name)
 
  setInterval(function(){console.log(rec.constructor.name)}, 1000)
  console.log('finish');

/*LINKS
https://www.twilio.com/blog/2015/10/asyncawait-the-hero-javascript-deserved.html

*/

