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
      color: #fff;
      display: grid;
      place-items: center;
      font-family: system-ui, sans-serif;
      font-size: clamp(1.5rem, 5vw, 3rem);
      background: linear-gradient(
        125deg,
        #064e2b,
        #0d7d3d,
        #16a34a,
        #0d7d3d,
        #064e2b
      );
      background-size: 320% 320%;
      animation: bg-shift 14s ease-in-out infinite;
    }

    p {
      margin: 0;
      text-align: center;
      text-shadow: 0 0.08em 0.35em rgba(0, 0, 0, 0.35);
      animation: hello 5s ease-in-out infinite;
    }

    @keyframes bg-shift {
      0%,
      100% {
        background-position: 0% 40%;
      }
      50% {
        background-position: 100% 60%;
      }
    }

    @keyframes hello {
      0%,
      100% {
        transform: translateY(0) scale(1);
        letter-spacing: 0;
      }
      45% {
        transform: translateY(-0.12em) scale(1.02);
        letter-spacing: 0.02em;
      }
      55% {
        transform: translateY(-0.08em) scale(1.01);
        letter-spacing: 0.06em;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html,
      body {
        animation: none;
        background: #0d7d3d;
      }

      p {
        animation: none;
      }
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
    `\x1b[32m\x1b[1mhttp://localhost:${bound}\x1b[0m — painted green`,
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
