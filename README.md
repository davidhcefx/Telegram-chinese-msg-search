# Unofficial Telegram Message Search for Non-English (Chinese) Languages

Telegram **still refuse** to support Chinese substring search...

## Login Process

1. On first login, user will be asked for phone number and password.
2. User will be asked for the received authentication code (Telegram APP or SMS)
3. After login success, backend will store the session key in cookie.
4. When session is inactive for over 1 hour, user will be automatically logged out.

## Encryption and Security

- TLS channel is used to protect end-to-end conversation.
- In addition, public key encryption is used to protect sensitive data:
    - Password
    - Phone number
- On login, a public key pair is generated and sent to the browser. Thus, only backend can access the data.
- Sensitive data is never logged nor stored.

## Third Party Packages

```
                                +----------+
                                | telegram |
                                |   API    |
                                +----^-----+
 +---------+                         |
 |         |     +---------+     +--------+
 | browser |---->|  node   |---->| gramJS |
 |         |     | backend |     | module |
 +---------+     +---------+     +--------+
```

- [GramJS][]: will be used to interact with the official Telegram API
- [cookie-parser][]: will be used to parse the cookie string
- [body-parser][]: will be used to parse the POST body
- [Express][]: wil be used to host the backend

[GramJS]: https://www.npmjs.com/package/telegram
[cookie-parser]: https://www.npmjs.com/package/cookie-parser
[body-parser]: https://www.npmjs.com/package/body-parser
[Express]: https://expressjs.com/
