const express = require('express');
const { getPubKey } = require('./keyStore.js');
const { reply404, logRequest } = require('./utils.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  logRequest(req);
  // TODO: set as cookie is not a good idea...
  const pubKey = getPubKey(req.ip, Date.now());
  res.cookie('pubkey', pubKey, {
    maxAge: 15 * 60 * 1000,  // 15 minutes
    secure: true,
  });
  res.sendFile(
    'login.html',
    { root: `${__dirname}/../static` },
    (err) => { if (err) reply404(req, res) },
  );
});

router.post('/', (req, res, next) => {
  logRequest(req);
  // TODO: do the auth and provide another form
  res.end('end');
})

module.exports = router;
