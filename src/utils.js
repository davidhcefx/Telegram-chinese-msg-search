module.exports.reply404 = (req, res) => {
  res.status(404).end(`File ${req.path} not found!`);
};

module.exports.logRequest = (req) => {
  const pad = (s, size) => s.padEnd(size, ' ');
  console.log(Date.now(), '-', pad(req.originalUrl, 24), JSON.stringify(req.query));
};