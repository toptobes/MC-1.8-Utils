const fs = require('fs');

const dest = "C:\\Users\\wanna\\AppData\\Roaming\\.minecraft\\config\\ChatTriggers\\modules\\CarburettorUtilities\\"

if (!fs.existsSync(dest)){
    fs.mkdirSync(dest);
}

fs.readdirSync("../src").forEach(file => {
    copyFileToCTModule(file)
});

function copyFileToCTModule(file) {
    fs.copyFile(`../src/${file}`, dest + file, err => {
        if (err) throw err;
        console.log(`${file} was copied to destination`);
    });
}