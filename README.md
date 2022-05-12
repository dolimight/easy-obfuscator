# Easy Obfuscator

Automatically obfuscates all the js and mjs files in you project and outputs them in a new directory (public)
while also copying all the other files in the orginal directory (private).

## Installation

Install using npm

```bash
  npm install easy-obfuscator
```

Node Js

```javascript
const { EasyJavaScriptObfuscator } = require("easy-obfuscator");

var easyJavaScriptObfuscator = new EasyJavaScriptObfuscator(); // default source: private, destination: public, ignores: []
easyJavaScriptObfuscator.obfuscateDirectory();
```
