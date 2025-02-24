const express = require('express');
const { reply404, logRequest } = require('./utils.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  logRequest(req);
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
