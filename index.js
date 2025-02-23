const fs = require("fs");
const express = require('express');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const { apiId, apiHash } = JSON.parse(fs.readFileSync('my_api_key.json', 'utf8'));
const app = express();
const PORT = process.env.PORT || 80;
// TODO: fill this later with the value from session.save()
const stringSession = new StringSession("");

function reply404(req, res) {
  res.status(404).end(`File ${req.path} not found!`);
}

app.get('/', (req, res) => {
  // TODO: check session id, if no redirect to login
  res.sendFile(
    'login.html',
    { root: `${__dirname}/web` },
    (err) => { if (err) reply404(req, res) },
  );
});

const server = app.listen(PORT, () => {
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
