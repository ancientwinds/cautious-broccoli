const fs = require('fs');
const path = './dist/weather.js';
const header = '#!/usr/bin/env node\n\n';

const data = fs.readFileSync(path);
fs.writeFileSync(path, `${header}${data}`);
