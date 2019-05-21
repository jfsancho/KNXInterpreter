let constants = {};

constants.CONFIG = {
   
};

constants.DB={
    HOST: "localhost",
    USER: "BISProjects",
    PASSWORD: "knx",
    DATABASE: "KNXData"
}

constants.PROCreadType={
    ONCHANGE: "onchange",
    CYCLE: "cycle"
}

constants.DTPvalueType ={
    NUMBER: "number",
    BOOLEAN: "boolean",
    STRING: "string"
}

constants.Threads={
    FILENAME:'../logic/processThread.js'
}

module.exports = constants;