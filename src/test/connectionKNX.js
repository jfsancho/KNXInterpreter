let knx = require('knx');

function createKNXconnection(conn) {

}


let connection = knx.Connection({

// ip address and port of the KNX router or interface
ipAddr: '192.168.0.15', ipPort: 3671,
// the KNX physical address we'd like to use
physAddr: '1.1.5',
// set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
loglevel: 'trace',
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
    console.log(connection.state);
    
  },
  event: function (evt, src, dest, value) {
  console.log("%s **** KNX EVENT: %j, src: %j, dest: %j, value: %j",
    new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    evt, src, dest, value);
  },
  // get notified on connection errors
  error: function(connstatus) {
    console.log("**** ERROR: %j", connstatus);
  }
 }

});
console.log(connection.state);

setTimeout(()=>console.log(connection.state),20000);

//var binary_control = new knx.Datapoint({ga: '1/0/1', dpt: 'DPT1.001'});




module.exports=connection;