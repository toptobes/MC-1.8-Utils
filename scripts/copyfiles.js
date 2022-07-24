const fs = require("fs");
const path = require("path");

const userDataDir = process.env.APPDATA
    || (process.platform === "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share");

const dest = `${userDataDir}/.minecraft/config/ChatTriggers/modules/CarburettorUtilities/`;
const src = path.join(__dirname, "..", "src/");

if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}

fs.readdirSync(src).forEach(file => {
    copyFileToCTModule(file);
});

function copyFileToCTModule(file) {
    fs.copyFileSync(src + file, dest + file);
    console.log(`>> ${file} was copied to destination`);
}

console.log("\n>> Success!\n");