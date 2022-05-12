const fs = require("fs-extra");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

class EasyJavaScriptObfuscator {
  #source;
  #destination;
  #ignores;

  constructor(data = {}) {
    this.#source = data.source ?? "private";
    this.#destination = data.destination ?? "public";
    this.#ignores = data.ignores ?? [];
  }

  #obfuscateDir(dirPath) {
    var dirents = fs.readdirSync(dirPath, {
      encoding: "utf8",
      withFileTypes: true,
    });
    for (let i = 0; i < dirents.length; i++) {
      let dirent = dirents[i];

      if (dirent.isDirectory() && !this.#ignores.includes(dirent.name)) {
        this.#obfuscateDir(path.join(dirPath, dirent.name));
        continue;
      }

      if (
        path.extname(dirent.name) !== ".js" &&
        path.extname(dirent.name) !== ".mjs"
      )
        continue;

      let filePath = path.join(dirPath, dirent.name);
      let content = fs.readFileSync(filePath, { encoding: "utf8" });
      console.log("Obfuscating: " + filePath);

      let obfuscator = JavaScriptObfuscator.obfuscate(content);
      let obfuscatedCode = obfuscator.getObfuscatedCode();

      fs.writeFileSync(filePath, obfuscatedCode, {
        encoding: "utf8",
        flag: "w+",
      });
    }
  }

  obfuscateDirectory() {
    try {
      fs.emptyDirSync(this.#destination);
      fs.copySync(this.#source, this.#destination);
      this.#obfuscateDir(this.#destination);
      console.log("Done ✅");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports.EasyJavaScriptObfuscator = EasyJavaScriptObfuscator;
