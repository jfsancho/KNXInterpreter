import 'dotenv/config';
import bodyParser from 'body-parser';

import cors from 'cors';

import routes from './routes';

import LogicManager from './logic/logicManager.js'

let LM= new LogicManager();

let seti = setInterval((a)=>{if(!a.ready){
  console.log('ready');
  clearInterval(seti)}},1000,LM);



var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/devices', routes.device);
app.use('/processes', routes.process);



app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});
  
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});



app.listen(port);


console.log(' RESTful API server started on: ' + port);