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

    .stage {
      perspective: min(100vmin, 48rem);
      perspective-origin: 50% 45%;
    }

    .tumble {
      transform-style: preserve-3d;
      animation: tumble 18s ease-in-out infinite;
    }

    .hello-wrap {
      margin: 0;
      text-align: center;
      transform-style: preserve-3d;
      text-shadow:
        0 0.02em 0 #047857,
        0 0.04em 0 #065f46,
        0 0.06em 0 #064e3b,
        0 0.08em 0.12em rgba(0, 0, 0, 0.45),
        0 0.14em 0.35em rgba(0, 0, 0, 0.35);
      animation: hello 5s ease-in-out infinite;
    }

    .rotate {
      display: inline-block;
      transform-style: preserve-3d;
      transform-origin: center center;
      animation: spin-3d 22s linear infinite;
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

    @keyframes tumble {
      0%,
      100% {
        transform: rotateX(14deg) rotateY(-22deg) translateZ(0);
      }
      33% {
        transform: rotateX(-8deg) rotateY(8deg) translateZ(0.15em);
      }
      66% {
        transform: rotateX(6deg) rotateY(20deg) translateZ(-0.08em);
      }
    }

    @keyframes hello {
      0%,
      100% {
        transform: translateY(0) translateZ(0) scale(1);
        letter-spacing: 0;
      }
      45% {
        transform: translateY(-0.12em) translateZ(0.2em) scale(1.02);
        letter-spacing: 0.02em;
      }
      55% {
        transform: translateY(-0.08em) translateZ(0.12em) scale(1.01);
        letter-spacing: 0.06em;
      }
    }

    @keyframes spin-3d {
      from {
        transform: rotateZ(0deg);
      }
      to {
        transform: rotateZ(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html,
      body {
        animation: none;
        background: #0d7d3d;
      }

      .tumble,
      .hello-wrap,
      .rotate {
        animation: none;
      }

      .tumble {
        transform: rotateX(10deg) rotateY(-12deg);
      }
    }
  </style>
</head>
<body>
  <div class="stage">
    <div class="tumble">
      <p class="hello-wrap"><span class="rotate">Hello, World!</span></p>
    </div>
  </div>
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
