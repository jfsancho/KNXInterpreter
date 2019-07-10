class Validator {

    validateInputs(inputData) {
  
      let errorMsg = "";
  
      if(!inputData.DEVgroupAddress.match(/^(?:(?:\d|[1-2]\d|3[0-1])\/)(?:(?:[0-7])\/)(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))$/)) {
        errorMsg +="DEVgroupAddress must to be a GA format.\n"
      }
  
      if(!inputData.DEVconnection.match(/^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/)) {
        errorMsg +="DEVconnection must to be a IP address format\n"
      }
  
      if(!inputData.DEVstatusAddress===null){
        if(!inputData.DEVstatusAddress.match(/^(?:(?:\d|[1-2]\d|3[0-1])\/)(?:(?:[0-7])\/)(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))$/)) {
          errorMsg +="DEVstatusAddress must to be a GA format.\n"
        }
      }
  
      if(!inputData.DEVdatapoint.match(/^(?:(?:DPT\d)\.)(?:(?:\d\d\d))$/)) {
        errorMsg +="DEVdatapoint must to be a datapoint format.\n"
      }
  
      if(errorMsg.length === 0){
        return true;
      } else {
        alert(errorMsg);
        return false;
      }
  
    }
  
  }
  
  export default Validator;