const express = require('express');
const { getPubKey } = require('./keyStore.js');
const { reply404, logRequest } = require('./utils.js');

const router = express.Router();

function loginForPhonePasswd(req, res, next) {
  logRequest(req);
  // TODO: set as cookie is not a good idea...
  const pubKey = getPubKey(req.ip, Date.now());
  res.cookie('pubkey', pubKey, {
    maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    secure: true,
  });
  res.sendFile(
    'login.html',
    { root: `${__dirname}/../static` },
    (err) => { if (err) reply404(req, res) },
  );
}

function loginForPasscode(req, res, next) {
  logRequest(req);
  if (req.body.phone == undefined || req.body.pass == undefined) {
    // TODO: or reply json?
    next();
  }
  if (req.body.pcode == undefined) {
    // TODO: step 1
  } else {
    // TODO: step 2
  }

  // TODO: do the auth, when ok reply
  res.end('end');
}

router.get('/', loginForPhonePasswd);
router.post('/', loginForPasscode, loginForPhonePasswd);

module.exports = router;
