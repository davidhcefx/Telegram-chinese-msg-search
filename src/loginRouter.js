const express = require('express');
const { reply404, logRequest } = require('./utils.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  logRequest(req);
  // if (req.query.phone) {
  // }

  // TODO: check query and provide respective login form
  res.sendFile(
    'login.html',
    { root: `${__dirname}/../static` },
    (err) => { if (err) reply404(req, res) },
  );
});

module.exports = router;
