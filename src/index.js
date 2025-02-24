const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const loginRouter = require('./loginRouter.js');
const { logRequest } = require('./utils.js');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/login', loginRouter);

// TODO: TLS channel
// TODO: public key encryption
// TODO: auto logout when inactive
app.get('/', (req, res) => {
  logRequest(req);
  if (req.cookies.sess_id) {
    // TODO: loads telegram session from string or file
    // TODO: fill this later with the value from session.save()
    // const stringSession = new StringSession("");
    return;
  }
  res.redirect('/login');
});

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
  console.log(`Server listening at port ${server.address().port}...`);
});
