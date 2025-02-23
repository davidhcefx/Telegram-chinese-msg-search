const fs = require('fs');
const readline = require("readline");
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { dialogs } = require("telegram/client");

const { apiId, apiHash } = JSON.parse(fs.readFileSync('my_api_key.json', 'utf8'));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log('Loading interactive example...');
  const sess = await new Promise((resolve) =>
    rl.question('Please provide session string if any: ', resolve)
  );
  console.log(sess);
  const stringSession = new StringSession(sess || "");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question('Please enter your number: ', resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question('Please enter your password: ', resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question('Please enter the code you received: ', resolve)
      ),
    onError: (err) => console.log(err),
  });
  console.log('You should now be connected.');
  console.log(client.session.save()); // Save this string to avoid logging in again

//  await client.sendMessage('me', { message: 'Hello!' });

//  for await (const msg of client.iterMessages('me', {search: "路跑"})) {
//    console.log(msg.id, msg.text);
//  }

//  const messages = await client.getMessages('me', {
//    limit: undefined,
//    filter: Api.InputMessagesFilterEmpty,
//  });
//  console.log(messages.total);
//  console.log(messages[0]);
//  const kw = await new Promise((resolve) =>
//    rl.question('Please provide your keyword: ', resolve)
//  );
//  for (const msg of messages) {
//    if (msg.message === undefined) {
//      continue
//    }
//    if (msg.message.indexOf(kw, 0) > 0) {
//      console.log(msg.date, msg.message, '\n');
//    }
//  }

  const dialog = await dialogs.getDialogs(client, {
    limit: undefined,
    archived: false,
  });
  console.log(dialog.total);
  console.log(dialog[0]);
  for (const d of dialog) {
    console.log(`${d.title} (${d.entity.username})`);
  }

})();
