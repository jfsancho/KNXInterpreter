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

router.post('/dev', (req, res) => {
  //no funciona correctamente el promise
  new Promise(function(resolve, reject) {
    LM.dbManager.insertDEV(req.body,{callback:LM.createDEV, item:req.body})
    resolve({msg:'dispositivo: '+req.body.DEVgroupAddress + ', creado'});
    }).then(response=>{
      res.send(response);
    }).catch(err=>{
      res.send({msg:'dispositivo: '+req.body.DEVgroupAddress + ', no se pudo crear',
              error: err});
    })

  });
  
router.post('/dev/get', (req, res) => {
  let response= LM.getDEV(req.body.devId);
  res.send(response);
  });
  
router.put('/dev', (req, res) => {
  new Promise(function(resolve, reject) {
    //console.log(typeof {callback: LM.updateDEV, item:req.body})
    
    LM.dbManager.updateDEV(req.body,{callback:LM.updateDEV, item:req.body})
    resolve({msg:'dispositivo: '+req.body.DEVgroupAddress + ', actualizado'});
  }).then(response=>{
    res.send(response);
  }).catch(err=>{
    res.send({msg:'dispositivo: '+req.body.DEVgroupAddress + ', no se pudo actualizar',
              error: err});
  })
    
});
  
router.delete('/dev', (req, res) => {
    return res.send('\n  dispositivo: '+req.body.devId+', eliminado \n');
}); 

// /device/dev/read
router.post('/dev/read', (req, res) => {
  //LM.readDEV(req.body.devId,res.send);
  let KNXdpt=LogicManager.instance.getKNXdpt(req.body.devId);
        if(KNXdpt){
            
            KNXdpt.read((src,response)=>{
                console.log(response);
                
                res.send({value:response,devId:req.body.devId});
            });
        }
        else{
            res.send({value:'El dispositivo '+ devID + 'no existe'});
        }
});
  
// /device/dev/write
router.post('/dev/write', (req, res) => {
  if(!req.body.devId||!req.body.value){
      res.send({msg:'Faltan argumentos'});
  }else{
    LM.writeDEV(req.body.devId,req.body.value,res.send);
    
    res.send({msg: 'Valor: '+req.body.value+ ' escrito en dispositivo '+req.body.devId});
  }
     
  });





export default router;