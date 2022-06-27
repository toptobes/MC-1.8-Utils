const fs = require('fs');

const dest = "C:\\Users\\wanna\\AppData\\Roaming\\.minecraft\\config\\ChatTriggers\\modules\\CarburettorUtilities\\"

fs.copyFile("../src/index.js", dest + "index.js", err => {
    if (err) throw err;
    console.log("File was copied to destination");
});