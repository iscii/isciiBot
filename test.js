//shell commands
const execSync = require('child_process').execSync;
const output = execSync('netsh wlan show profiles', { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);