const { isMainThread, parentPort, workerData } = require('worker_threads');
let constants = require('../config/constants.js')
let dbManager= require('../dataBase/dbManager.js')
let logicManager = require('../logic/logicManager');
let info= require('../logic/information.js')

let LM;
let oldValue;
let newValue;
let KNXdpt;




function setValues(value){
	console.log('v')
	console.log(value)
	newValue=oldValue=value;
}

function verifyValues(value){
	newValue=value;
	console.log('nv')
	console.log(newValue)
	if(newValue!==oldValue){
		oldValue=newValue;
		let inf= Object.assign({},info);
		inf.INFOvalue=value;
		inf.INFOdevice=workerData.device.DEVgroupAddress;
		dbManager.insertINFO(inf);
	}

}
function onChange(){

	if(!oldValue){
		KNXdpt.read(setValues);
	}
	else{
		KNXdpt.read(verifyValues);

		
	}
}

if(!isMainThread){
	
	LM= new logicManager();
	parentPort.postMessage(LM);
	KNXdpt= LM.getKNXdpt(workerData.device.DEVgroupAddress);
	let func;
	let time;
	if (workerData.process.PROCreadType===constants.PROCreadType.ONCHANGE){
		func=onChange;
		time=1000
	}
	else{
		func=cycleRead;
		time=workerData.process.PROCcycleTime*1000;
	}

	setInterval(func,time);

	

	parentPort.on("message", message => {
		console.log(message);
		if (message.type=== 'exit') {
			parentPort.postMessage('delete');
		process.exit(0);
		
		} else if (message.type=== 'update' && message.id === workerData.process.PROCid){
			workerData.process=message.update;
		parentPort.postMessage('update');
		}
		});
		
	}



