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
    // TODO: fill this later with the value from session.save()
    // const stringSession = new StringSession("");
    return;
  }
  res.redirect('/login');
});

app.get('/jsencrypt@3.3.2/*', (req, res) => {
  logRequest(req);
  res.sendFile(
    req.path,
    { root: `${__dirname}/../static/` },
    (err) => { if (err) reply404(req, res) },
  );
});

// final error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).end();
});

const port = process.env.PORT || 80;
const server = app.listen(port, () => {
  console.log(`Server listening at port ${server.address().port}...`);
});
