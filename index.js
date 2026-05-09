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
      background: #0b57d0;
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

const preferredPort = Number(process.env.PORT) || 3000;
const portCeiling = preferredPort + 30;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

let currentPort = preferredPort;

const onListening = () => {
  const addr = server.address();
  const bound = addr && typeof addr === "object" ? addr.port : currentPort;
  if (bound !== preferredPort) {
    console.log(
      `\x1b[33mPort ${preferredPort} in use — bound to ${bound}\x1b[0m`,
    );
  }
  console.log(
    `\x1b[34m\x1b[1mhttp://localhost:${bound}\x1b[0m — painted blue`,
  );
};

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    currentPort += 1;
    if (currentPort > portCeiling) {
      console.error(
        `No free port from ${preferredPort} through ${portCeiling}.`,
      );
      process.exit(1);
    }
    server.listen(currentPort, onListening);
    return;
  }
  throw err;
});

server.listen(currentPort, onListening);
