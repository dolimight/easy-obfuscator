const { EasyJavaScriptObfuscator } = require("./index");

var easyJavaScriptObfuscator = new EasyJavaScriptObfuscator({
  ignores: ["module", "package"],
});
easyJavaScriptObfuscator.obfuscateDirectory();
