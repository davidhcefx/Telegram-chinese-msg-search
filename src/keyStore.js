const crypto = require('crypto');

// key: ip
// value: {expire, pubKey, privKey}
const keyPairs = {};
const keyExpireTime = 15 * 60 * 1000; // 15 minutes

/**
 * Lookup or create a key pair. Will purge expired keys on creation.
 * @param {string} ip IP address
 * @param {number} now current time in milliseconds
 * @return {string} public key
 */
function getPubKey(ip, now) {
  if (keyPairs[ip] && now <= keyPairs[ip].expire) {
    return keyPairs[ip].pubKey;
  }
  // scan and purge expired keys
  for (const k in keyPairs) {
    if (keyPairs[k].expire < now) {
      delete keyPairs[k];
    }
  }
  const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  keyPairs[ip] = {
    expire: now + keyExpireTime,
    pubKey: publicKey,
    privKey: privateKey,
  };
  return publicKey;
}

/**
 * Lookup a private key.
 * @param {string} ip IP address
 * @return {string} private key, null if not found
 */
function getPrivKey(ip) {
  if (keyPairs[ip]) {
    return keyPairs[ip].privKey;
  }
  return null;
}

module.exports.getPubKey = getPubKey;
module.exports.getPrivKey = getPrivKey;
