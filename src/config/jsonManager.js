
let readFile = require("fs");


readConfig = function(data,file){
    readFile(file, 'utf8', (err, fileContents) => {
        if (err) {
            console.log("Error reading file from disk:", err)
        return;
        }
        try {
        data = JSON.parse(fileContents)
        console.log(data);
        } catch(err) {
            console.log("Error reading file from disk:", err)
        }
    })
}

writeConfig= function(data,file){
    const jsonString = JSON.stringify(data)

    fs.writeFile(file, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

module.exports = jsonManager;