const http = require('http');
const opts = require('optimist').argv;

const interval = opts.interval;
const timeout = opts.timeout;

const date = new Date();

http.createServer((req, res) => {
  if (req.url === '/') {
  const timer = setInterval(() => {
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    console.log(time);
  }, interval);
  setTimeout(() => {
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const day = date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
    clearInterval(timer);
    console.log(`${time} ${day}`);
  }, timeout + 1000);
  res.end('The server is running!');
  }
}).listen(3000);

console.log('The server is running in port 3000!');
