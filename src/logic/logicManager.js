let dbManag= require('../dataBase/dbManager.js');
let constants = require('../config/constants.js');
let knx = require('knx');
let infoBean= require('../logic/information.js');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');




class LogicManager {

    /*cacheFlags = { //para saber si las listas estan actualizadas con respecto a la DB.
        dpt: false,
        conn: false,
        dev:false,
        proc:false,
        info: false
    }*/

    //listas
    //dptList;
    //connList;
    //devList;
    //procList;
    //infoList;
    //KNXdptList;
    //KNXconnList;
    //processThreads;

    //dataBase
    //dbManager;

    constructor(){
        
        if (!!LogicManager.instance) {
            
            return LogicManager.instance;
        }

        this.cacheFlags = { //para saber si las listas estan actualizadas con respecto a la DB.
            dpt: false,
            conn: false,
            dev:false,
            proc:false,
            info: false
        }
        this.dbManager=dbManag;
        this.ready=false
        

        if(!this.cacheFlags.dpt){
            this.dbManager.getAllDPT(this.setDPTList);
        }
        if (!this.cacheFlags.dev){
            //se inicializan las conexiones y los dispositivos
            this.dbManager.getAllCONN(this.setCONNList);
        }
        
        LogicManager.instance = this;
        
        return this
    }

    

    initDEV(){
        LogicManager.instance.KNXdptList= new Set();
        for(let dev of LogicManager.instance.devList){
            LogicManager.instance.createKNXdpt(dev);

        }

    }


    initCONN(){
        LogicManager.instance.KNXconnList=new Set();
        for(let conn of LogicManager.instance.connList){
            LogicManager.instance.createKNXconn(conn);
        }

    }

    initPROC(){
        LogicManager.instance.processThreads= new Set();
        for(let proc of LogicManager.instance.procList){
            LogicManager.instance.createProcessThread(proc);
        }
        LogicManager.instance.ready=true;
        
    }

    createKNXdpt(dev){
        let knxDPT= new knx.Datapoint({ga:dev.DEVgroupAddress, dpt: dev.DEVdatapoint});
        LogicManager.instance.KNXdptList.add(knxDPT);
        let conn=LogicManager.instance.getKNXconn(dev.DEVconnection);
        //si existe la conexión, enlace el datapoint a dicha conexión
        if(conn){
            knxDPT.bind(conn);
        }

    }

    createKNXconn(conn){
        let knxCONN= new knx.Connection({
            ipAddr: conn.CONNipAddress, ipPort: conn.CONNipPort, 
            physAddr: conn.CONNphysAddress, minimumDelay: conn.CONNminDelay, 
            manualConnect: true,  forceTunneling: false, loglevel:'info',
            suppress_ack_ldatareq: true,
            handlers:{
                connected: ()=> {console.log('Connected!');},
                error: (connstatus)=> {console.log("**** ERROR: %j", connstatus);}
            }
        })
        
        knxCONN.Connect();
        LogicManager.instance.KNXconnList.add(knxCONN);

    }

    createProcessThread(proc){
        console.log(proc.PROCreadType);
        let thread=Object.create(null);
        thread={
            process:proc,
            device: LogicManager.instance.getDEV(proc.PROCdevice),
            KNXdpt: LogicManager.instance.getKNXdpt(proc.PROCdevice),
            values:{newValue:'',oldValue:''},
            interval:null,
            setValues(value,t){
                LogicManager.instance.insertINFO(value,t.device.DEVgroupAddress);},
            verifyValues(value,t){
                //verificar
                t.values.newValue=value;
                if(t.values.newValue!==t.values.oldValue){
                    t.values.oldValue=t.values.newValue;
                    LogicManager.instance.insertINFO(value,t.device.DEVgroupAddress);
                }
            },
            onChange(t){
                if(t.KNXdpt.conn.state==='idle'){
                    t.KNXdpt.read((src,response)=> t.verifyValues(response,t));}
            },
            cycleRead(t){
                if(t.KNXdpt.conn.state==='idle'){
                    t.KNXdpt.read((src,response)=> t.setValues(response,t))}
            }
        }
        let func;
        let time;

        if (thread.process.PROCreadType===constants.PROCreadType.ONCHANGE){
            func=thread.onChange;
            time=5000;
        }
        else{
            func=thread.cycleRead;
            time=thread.process.PROCcycleTime*1000;
        }
    
        let interval = setInterval((t)=>{func(t)},time,thread);
        thread.interval=interval;
        

        /*let w = new Worker(constants.Threads.FILENAME, {workerData:wd});
	
		w.on('message', (msg) => console.log(msg) );
		w.on('error',  (err) =>  console.log(err));
		w.on('exit', (code) => {LogicManager.instance.processThreads.delete(w);
            console.log(`Worker stopped with exit code ${code}`);});*/

        LogicManager.instance.processThreads.add(thread);

    }


    getKNXdpt(groupAddress){
        for(let dpt of LogicManager.instance.KNXdptList.values() ){
            if(dpt.options.ga===groupAddress){
                return dpt;
            }
        }
    }

    getKNXconn(ipAddr){
        for(let conn of LogicManager.instance.KNXconnList.values()){
            if(conn.ipAddr===ipAddr){
                return conn;
            }
        }
    }

    getDEV(groupAddress){
        for(let dev of LogicManager.instance.devList){
            if(dev.DEVgroupAddress===groupAddress){
                return dev;
            }
        }

    }

    getPROC(proccessId){
        for(let proc of LogicManager.instance.procList){
            if(proc.PROCid===proccessId){
                return proc;
            }
        }
    }


    setDPTList(list){
        LogicManager.instance.cacheFlags.dpt=true;
        LogicManager.instance.dptList=list;
    }

    setCONNList(list){
        LogicManager.instance.cacheFlags.conn=true;
        if(LogicManager.instance.KNXconnList){ 
            LogicManager.instance.connList=list;
                
        }
        else{
            LogicManager.instance.connList=list;
            LogicManager.instance.initCONN();
            LogicManager.instance.dbManager.getAllDEV(LogicManager.instance.setDEVList);
        }

    }

    setDEVList(list){
        LogicManager.instance.cacheFlags.dev=true;
        if(LogicManager.instance.KNXdptList){
            LogicManager.instance.devList=list;
        }
        else {
            LogicManager.instance.devList=list;
            LogicManager.instance.initDEV();
            LogicManager.instance.dbManager.getAllPROC(LogicManager.instance.setPROCList);
        }
        
    }

    setPROCList(list){
        LogicManager.instance.cacheFlags.proc=true;
        if(LogicManager.instance.processThreads){
            LogicManager.instance.procList=list;
        }
        else{
            LogicManager.instance.procList=list;
            //cuando llegue aca ya termino
            LogicManager.instance.initPROC();
        }
        
    }

    setINFOList(list){
        LogicManager.instance.infoList=list;
    }

    getDEVList(callback){
        if(typeof callback ==='function'){
            return callback(LogicManager.instance.devList);
        }else {
            return LogicManager.instance.devList
        }
    }

    getPROCList(callback){
        if(typeof callback ==='function'){
            return callback(LogicManager.instance.procList);
        }else {
            return LogicManager.instance.procList
        }
    }

    readDEV(dev,callback){
        let KNXdpt=LogicManager.instance.getKNXdpt(dev);
        if(KNXdpt){
            
            KNXdpt.read((src,response)=>{
                console.log(response);
                
                callback({value:response,devId:dev});
            });
        }
        else{
            callback({value:'El dispositivo '+ devID + 'no existe'});
        }
    }

    writeDEV(devId,value,callback){
        let KNXdpt=LogicManager.instance.getKNXdpt(devId);
        if(KNXdpt){
            console.log('valor: '+value);
            KNXdpt.write(value);
        }
        else{
            callback({msg:'El dispositivo '+ devID + 'no existe'});
        }
    }

    updateDEV(device){
        let dev= LogicManager.instance.getDEV(device.DEVgroupAddress);
        dev.DEVstatusAddress=device.DEVstatusAddress;
        dev.DEVconnection=device.DEVconnection;
        dev.DEVdescription=device.DEVdescription;
        dev.DEVdatapoint=device.DEVdatapoint;
        console.log(dev);
    }

    createDEV(device){
        let dev={
            DEVgroupAddress: device.DEVgroupAddress,
            DEVstatusAddress:device.DEVstatusAddress,
            DEVconnection:device.DEVconnection,
            DEVdescription:device.DEVdescription,
            DEVdatapoint:device.DEVdatapoint
        }
        LogicManager.instance.devList.push(dev);
    }


    insertINFO(value,dev){
	let inf= Object.assign({} , infoBean);
		inf.INFOvalue=value;
		inf.INFOdevice=dev;
		LogicManager.instance.dbManager.insertINFO(inf);
}

    

}

module.exports= LogicManager;