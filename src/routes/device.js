import { Router } from 'express';
import LogicManager from '../logic/logicManager.js'
const router = Router();

let LM = new LogicManager();
// /devices
router.get('/', (req, res) => {
    let response= LM.getDEVList();
    return res.send('\n'+JSON.stringify(response, null, 2)+'\n');

  });

// /devices/dev

router.get('/dev', (req, res) => {
    //req.params.devId
    let response= LM.getDEV(req.body.devId);
    res.send('\n'+JSON.stringify(response, null, 2)+'\n');
  });
  
router.post('/dev', (req, res) => {
  let response= LM.getDEV(req.body.devId);
  res.send('\n'+JSON.stringify(response, null, 2)+'\n');
  });
  
router.put('/dev', (req, res) => {
    return res.send('\n dispositivo: '+req.body.devID + ', actualizado \n');
});
  
router.delete('/dev', (req, res) => {
    return res.send('\n  dispositivo: '+req.body.devId+', eliminado \n');
}); 

// /device/dev/read
router.get('/dev/read', (req, res) => {
  let response={
    devId:req.body.devId,
    valor: true
  }
  res.send('\n'+JSON.stringify(response, null, 2)+'\n')
  //LM.readDEV(req.params.devID,res.send);
  });
  
// /device/dev/write
router.post('/dev/write', (req, res) => {
  if(!req.body.devId||!req.body.value){
      res.send('Faltan argumentos');
  }else{
    res.send('\n Valor: '+req.body.value+ ' escrito en dispositivo '+req.body.devId+'\n')
    //LM.writeDEV(req.body.devId,req.body.value,res.send);
  }
     
  });





export default router;