- `cp config.example.js config.js`
- `npm i`
- create config for smtp `https://ethereal.email`
- `npm start` or debug

<b> Send Mail ~ POST "/"

Body example

```json
{
  "from": "John Doe <johmdoe@mail.com>",
  "to": ["yourmail@gmail.com"],
  "subject": "[TEST] target: mailer ",
  "html": "<b>Markdown</b></p>"
}
```

## Docker

- install and config docker
- `docker-compose up` (`-d` to detach)
- *extra* `docker-compose down && docker-compose up --build`
