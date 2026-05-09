const http = require("http");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Saturday</title>
  <style>
    html {
      height: 100%;
    }

    html,
    body {
      margin: 0;
      min-height: 100%;
      color: #fff;
    }

    body {
      display: grid;
      place-items: center;
      font-family: system-ui, sans-serif;
      font-size: clamp(1.5rem, 5vw, 3rem);
      background: linear-gradient(
        125deg,
        #701a3d,
        #9d174d,
        #db2777,
        #f472b6,
        #db2777,
        #701a3d
      );
      background-size: 320% 320%;
      animation: bg-shift 14s ease-in-out infinite;
      /* Perspective on the grid box so nested 3D is not flattened by the layout root. */
      -webkit-perspective: clamp(520px, 95vmin, 1600px);
      -webkit-perspective-origin: 50% 42%;
      perspective: clamp(520px, 95vmin, 1600px);
      perspective-origin: 50% 42%;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }

    .stage {
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }

    .tumble {
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      animation: tumble 18s ease-in-out infinite;
    }

    .hello-wrap {
      margin: 0;
      text-align: center;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
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
      -webkit-transform-style: preserve-3d;
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
        transform: rotateX(18deg) rotateY(-36deg) translateZ(0);
      }
      33% {
        transform: rotateX(-12deg) rotateY(12deg) translateZ(36px);
      }
      66% {
        transform: rotateX(10deg) rotateY(32deg) translateZ(-24px);
      }
    }

    @keyframes hello {
      0%,
      100% {
        transform: translateY(0) translateZ(0) scale(1);
        letter-spacing: 0;
      }
      45% {
        transform: translateY(-0.12em) translateZ(48px) scale(1.02);
        letter-spacing: 0.02em;
      }
      55% {
        transform: translateY(-0.08em) translateZ(28px) scale(1.01);
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
        background: #db2777;
      }

      .tumble,
      .hello-wrap,
      .rotate {
        animation: none;
      }

      .tumble {
        transform: rotateX(14deg) rotateY(-22deg);
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
    console.log(
      "\x1b[33mIf old servers are suspended (Ctrl+Z), run `fg` then exit with Ctrl+C, or close those terminals.\x1b[0m",
    );
  }
  console.log(
    `\x1b[95m\x1b[1mhttp://localhost:${bound}\x1b[0m — painted pink`,
  );
};

// Do not pass onListening to listen() on each port retry — Node stacks that as
// extra "listening" listeners and triggers MaxListenersExceededWarning.
server.on("listening", onListening);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    currentPort += 1;
    if (currentPort > portCeiling) {
      console.error(
        `No free port from ${preferredPort} through ${portCeiling}.`,
      );
      process.exit(1);
    }
    server.listen(currentPort);
    return;
  }
  throw err;
});

server.listen(currentPort);
