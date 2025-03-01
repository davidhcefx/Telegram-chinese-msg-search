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
rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted)
    rl.output.write("*");
  else
    rl.output.write(stringToWrite);
};

async function poc() {
  console.log('Loading interactive example...');
  const sess = await new Promise((resolve) =>
    rl.question('Please provide session string if any: ', resolve)
  );
  const stringSession = new StringSession(sess || "");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  let password;
  if (sess.length == 0) {
    rl.stdoutMuted = true;
    console.log('Please enter your password: ');
    password = await new Promise((resolve) =>
      rl.question('', resolve)
    );
    rl.stdoutMuted = false;
  }

  // await client.connect();
  // if (!await client.checkAuthorization()) {
  //   // login needed
  //   await client.signInUser({ apiId, apiHash }, {
  //     phoneNumber: async () =>
  //       new Promise((resolve, reject) =>
  //         reject({errorMessage: 'RESTART_AUTH_WITH_QR'})),
  //       // new Promise((resolve) =>
  //       //   rl.question('Please enter your number: ', resolve)
  //       // ),
  //     password: async () =>
  //       new Promise((resolve) => { console.log('passwd'); resolve(password); }),
  //     qrCode: async (qrcode) =>
  //       new Promise((resolve) => {
  //         // display qrcode
  //         console.log(`tg://login?token=${qrcode.token.toString("base64url")}`);
  //       }),
  //     phoneCode: async () =>
  //       new Promise((resolve) =>
  //         rl.question('Please enter the code you received: ', resolve)
  //       ),
  //     onError: (err) => console.error(err),
  //   });
  // }

  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question('Please enter your number: ', resolve)
      ),
    password: async () =>
      new Promise((resolve) => resolve(password)),
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

  // const messages = await client.getMessages('me', {
  //   limit: undefined,
  //   filter: Api.InputMessagesFilterEmpty,
  // });
  // console.log(messages.total);
  // console.log(messages[0]);
  // while (true) {
  //   const kw = await new Promise((resolve) =>
  //     rl.question('keyword: ', resolve)
  //   );
  //   if (kw.length == 0) {
  //     break;
  //   }
  //   for (const msg of messages) {
  //     if (msg.message === undefined) {
  //       continue
  //     }
  //     if (msg.message.indexOf(kw, 0) >= 0) {
  //       console.log(msg.date, msg.message, '\n');
  //     }
  //   }
  // }

 const dialog = await dialogs.getDialogs(client, {
   limit: undefined,
   archived: false,
 });
 console.log(dialog.total);
 console.log(dialog[0]);
 for (const d of dialog) {
   console.log(`${d.title} (${d.entity.username})`);
 }

//  const rlt = await client.invoke(new Api.auth.LogOut({}));
//  console.log(rlt);

};

poc().finally(() => {
  process.exit()
});
