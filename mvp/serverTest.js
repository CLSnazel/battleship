const TCP = require('./tcp');

const myArgs = process.argv.slice(2);
const myConnection = new TCP(myArgs[0], Number(myArgs[1]), Number(myArgs[2]));
process.stdin.on('data', (data) => {
  if(data === '\\q\n'){
    process.exit();
  }
  myConnection.writeTest(data);
})