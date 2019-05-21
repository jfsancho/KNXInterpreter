let knx =require('knx')
let dbManager =require('../dataBase/dbManager.js')
let infoBean= require('../logic/information.js');

let connection = knx.Connection({

    // ip address and port of the KNX router or interface
    ipAddr: '192.168.0.15', ipPort: 3671,
    // the KNX physical address we'd like to use
    physAddr: '1.1.5',
    // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
    loglevel: 'info',
    // do not automatically connect, but use connection.Connect() to establish connection
    manualConnect: false,  
    // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
    forceTunneling: false,
    // wait at least 10 millisec between each datagram
    minimumDelay: 10,
    // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
    suppress_ack_ldatareq: true,
    // define your event handlers here:
     handlers: {
      connected: function() {
        console.log('Connected!');
        //connection.write('0/0/1',1);
        readT(50000);
      },
      event: function (evt, src, dest, value) {
      /*console.log("%s **** KNX EVENT: %j, src: %j, dest: %j, value: %j",
        new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        evt, src, dest, value);*/
      },
      // get notified on connection errors
      error: function(connstatus) {
        console.log("**** ERROR: %j", connstatus);
      }
     }
    
    });

    var bc1;
    function readValues(){
    
    //var bc2 = new knx.Datapoint({ga: '0/0/101', dpt: 'DPT1.001'},connection);
    console.log('hola');
    //connection.write('0/0/1',1);
    
    //leer un valor
    
    bc1.read((src,res)=>{console.log(src + ' '+res)});
    //bc2.read((src,res)=>{console.log(src + ' '+res)});
    //console.log(connection.fsm.status);
    //console.log(connection.status);
    }
    // leer n veces el mismo valor
  
    function readN(n){
      var bc1 = new knx.Datapoint({ga: '0/0/1', dpt: 'DPT1.001'}, connection);
      console.time('loop');
      for(let i=0;i<=n;i++){
        bc1.read(()=>{
          if(i===(n-1)){
            console.timeEnd('loop');
          }
        });
      }
      //console.timeEnd('loop')
    }

    function counter(i){
      
      return i;
      
      }

    function readT(m){
      var bc1 = new knx.Datapoint({ga: '0/0/1', dpt: 'DPT1.001'}, connection);
      let s=Date.now();
      let c=0;
      let inter = setInterval((s,m)=>{
      

        bc1.read();
        c = counter(c + 1);
        console.log('c: '+c)
        if((Date.now()-s)>=m){
          clearInterval(inter);
          console.log(Date.now()-s);
          console.log(c);
        }
      },1000,s,m,c); 
    }

    function insertINFO(value,dev){
      let inf= Object.assign({} , infoBean);
        inf.INFOvalue=value;
        inf.INFOdevice=dev;
        dbManager.insertINFO(inf);
    }