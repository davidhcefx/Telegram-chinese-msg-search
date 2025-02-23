# Unofficial Telegram Message Search for Non-English (Chinese) Languages

Telegram **still refuse** to support Chinese substring search...

## Login Process

1. On first login, the phone number and password will be prompted and sent to the server.
2. Then, the user will receive authentication code from TG.
3. The authentication code will be prompted and sent to the server.
4. The TG session string will be stored as cookie to skip the next login process.

## Encryption

- Public key encryption is used to protect sensitive data.
    - Phone number
    - Password
- Input from the user is encrypted by the public key, which is provided on first login.
- Output from the server is encrypted by the public key.
- The TG session string

TODO: need to logout?



## Third Party Packages

- Telegram: will be used to interact with the official Telegram API
- Cookie-parser: will be used to parse the cookie string
- Express: will be used to host the website
