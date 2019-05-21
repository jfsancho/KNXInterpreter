import { Router } from 'express';
import LogicManager from '../logic/logicManager.js'
const router = Router();
let LM = new LogicManager();

// /processes
router.get('/', (req, res) => {
  let response = LM.getPROCList();
  res.send('\n'+JSON.stringify(response, null, 2)+'\n');
  });

// /devices/dev

router.get('/proc', (req, res) => {
    //req.params.procId
    let response= LM.getPROC(req.body.procId);
    res.send('\n'+JSON.stringify(response, null, 2)+'\n');

  });
  
router.post('/proc', (req, res) => {
    return res.send('\n Se creó un nuevo proceso con el id '+3+'\n');
  });
  
router.put('/proc', (req, res) => {
    return res.send('\n proceso: '+req.body.procId + ', actualizado \n');
});
  
router.delete('/proc', (req, res) => {
    return res.send('\n proceso: '+req.body.procId+', eliminado \n');
});





export default router;