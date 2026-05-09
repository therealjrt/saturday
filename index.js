const http = require("http");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Saturday</title>
  <style>
    html, body {
      margin: 0;
      min-height: 100%;
      background: #b30000;
      color: #fff;
      display: grid;
      place-items: center;
      font-family: system-ui, sans-serif;
      font-size: clamp(1.5rem, 5vw, 3rem);
    }
  </style>
</head>
<body>
  <p>Hello, World!</p>
</body>
</html>`;

const port = Number(process.env.PORT) || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  })
  .listen(port, () => {
    console.log(
      `\x1b[31m\x1b[1mhttp://localhost:${port}\x1b[0m — painted red`,
    );
  });
