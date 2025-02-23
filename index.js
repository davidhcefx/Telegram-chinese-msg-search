const fs = require("fs");
const express = require('express');
const cookieParser = require('cookie-parser');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const { apiId, apiHash } = JSON.parse(fs.readFileSync('my_api_key.json', 'utf8'));
const app = express();
app.use(cookieParser());

function reply404(req, res) {
  res.status(404).end(`File ${req.path} not found!`);
}

function logReq(req) {
  const pad = (s, size) => s.padEnd(size, ' ');
  console.log(Date.now(), '-', pad(req.originalUrl, 24), JSON.stringify(req.query));
}

app.get('/', (req, res) => {
  logReq(req);
  if (req.cookies.sess_id) {
    // TODO: loads telegram session from string or file
    // TODO: fill this later with the value from session.save()
    // const stringSession = new StringSession("");
    return;
  }
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  logReq(req);
  // TODO: check query and provide respective login form
  res.sendFile(
    'login.html',
    { root: `${__dirname}/web` },
    (err) => { if (err) reply404(req, res) },
  );
});

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
  console.log(`Server listening at port ${server.address().port}...`);
});



//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout,
//});

//(async () => {
//  console.log('Loading interactive example...');
//  const client = new TelegramClient(stringSession, apiId, apiHash, {
//    connectionRetries: 5,
//  });
//  await client.start({
//    phoneNumber: async () =>
//      new Promise((resolve) =>
//        rl.question('Please enter your number: ', resolve)
//      ),
//    password: async () =>
//      new Promise((resolve) =>
//        rl.question('Please enter your password: ', resolve)
//      ),
//    phoneCode: async () =>
//      new Promise((resolve) =>
//        rl.question('Please enter the code you received: ', resolve)
//      ),
//    onError: (err) => console.log(err),
//  });
//  console.log('You should now be connected.');
//  console.log(client.session.save()); // Save this string to avoid logging in again
//  await client.sendMessage('me', { message: 'Hello!' });
//})();
