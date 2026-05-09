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
      animation: hue-freak 4s linear infinite;
    }

    html,
    body {
      margin: 0;
      min-height: 100%;
      color: #fff;
      overflow: hidden;
    }

    body {
      display: grid;
      place-items: center;
      font-family: system-ui, sans-serif;
      font-size: clamp(1.75rem, 6vw, 3.5rem);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: linear-gradient(
        -45deg,
        #0f172a,
        #7c3aed,
        #db2777,
        #f97316,
        #eab308,
        #22c55e,
        #0ea5e9,
        #0f172a
      );
      background-size: 500% 500%;
      animation: bg-rave 2.8s ease-in-out infinite;
      -webkit-perspective: clamp(520px, 95vmin, 1600px);
      -webkit-perspective-origin: 50% 42%;
      perspective: clamp(520px, 95vmin, 1600px);
      perspective-origin: 50% 42%;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }

    body::before {
      content: "";
      position: fixed;
      inset: -60%;
      z-index: 0;
      background: conic-gradient(
        from 0deg,
        #f0f,
        #ff0,
        #0ff,
        #f0f
      );
      opacity: 0.22;
      mix-blend-mode: hard-light;
      animation: vortex 7s linear infinite;
      pointer-events: none;
    }

    .stage {
      position: relative;
      z-index: 1;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }

    .tumble {
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      animation: tumble 18s ease-in-out infinite;
    }

    .wrap {
      text-align: center;
      max-width: 95vw;
      filter: drop-shadow(0 0 0.08em #0ff) drop-shadow(0 0 0.12em #f0f);
      animation: glow-pulse 1.1s ease-in-out infinite alternate;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }

    .hello-wrap {
      margin: 0;
      text-align: center;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      text-shadow:
        0 0.02em 0 #a16207,
        0 0.04em 0 #854d0e,
        0 0.06em 0 #713f12,
        0 0.08em 0.12em rgba(66, 32, 6, 0.5),
        0 0.14em 0.35em rgba(0, 0, 0, 0.35);
      animation: hello 2.45s cubic-bezier(0.33, 1.15, 0.55, 1) infinite;
    }

    .wild {
      display: inline-block;
      animation: chaos-move 1.8s linear infinite;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
    }

    .spin {
      display: inline-block;
      transform-origin: center center;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      animation: spin-3d 3.2s linear infinite;
    }

    .pulse {
      display: inline-block;
      animation: wobble-scale 0.65s ease-in-out infinite alternate;
    }

    @keyframes bg-rave {
      0%,
      100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes hue-freak {
      0% {
        filter: hue-rotate(0deg) saturate(1.5) contrast(1.1);
      }
      100% {
        filter: hue-rotate(360deg) saturate(1.5) contrast(1.1);
      }
    }

    @keyframes vortex {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes glow-pulse {
      from {
        filter: drop-shadow(0 0 0.06em #0ff) drop-shadow(0 0 0.1em #f0f);
      }
      to {
        filter: drop-shadow(0 0 0.18em #ff0) drop-shadow(0 0 0.22em #f0f);
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
        transform: translate3d(0, 0, 0) scale(1);
        letter-spacing: 0;
      }
      12% {
        transform: translate3d(0, -0.03em, 6px) scale(1.01);
      }
      28% {
        transform: translate3d(0, -0.52em, 64px) scale(1.06);
        letter-spacing: 0.05em;
      }
      40% {
        transform: translate3d(0, 0, 12px) scale(0.96);
      }
      50% {
        transform: translate3d(0, -0.22em, 44px) scale(1.03);
        letter-spacing: 0.03em;
      }
      60% {
        transform: translate3d(0, 0, 0) scale(1);
      }
      72% {
        transform: translate3d(0, -0.1em, 22px) scale(1.02);
      }
      82%,
      92% {
        transform: translate3d(0, 0, 0) scale(1);
        letter-spacing: 0;
      }
    }

    @keyframes chaos-move {
      0% {
        transform: translate(0, 0) rotate(0deg) skew(0deg, 0deg) scale(1);
      }
      8% {
        transform: translate(3vw, -2vh) rotate(-4deg) skew(6deg, -2deg)
          scale(1.05);
      }
      16% {
        transform: translate(-4vw, 1vh) rotate(5deg) skew(-5deg, 4deg)
          scale(0.96);
      }
      24% {
        transform: translate(2vw, 3vh) rotate(-6deg) skew(3deg, 5deg)
          scale(1.08);
      }
      32% {
        transform: translate(-3vw, -3vh) rotate(7deg) skew(-8deg, 0deg)
          scale(1.02);
      }
      40% {
        transform: translate(5vw, 1vh) rotate(-3deg) skew(2deg, -6deg)
          scale(0.94);
      }
      48% {
        transform: translate(-2vw, 2vh) rotate(4deg) skew(-3deg, 3deg)
          scale(1.1);
      }
      56% {
        transform: translate(1vw, -4vh) rotate(-8deg) skew(7deg, 2deg)
          scale(1);
      }
      64% {
        transform: translate(-5vw, -1vh) rotate(6deg) skew(-4deg, -5deg)
          scale(1.06);
      }
      72% {
        transform: translate(4vw, 2vh) rotate(-2deg) skew(5deg, -3deg)
          scale(0.98);
      }
      80% {
        transform: translate(-1vw, -2vh) rotate(3deg) skew(-2deg, 6deg)
          scale(1.04);
      }
      88% {
        transform: translate(2vw, 4vh) rotate(-5deg) skew(4deg, 3deg)
          scale(1);
      }
      96%,
      100% {
        transform: translate(0, 0) rotate(0deg) skew(0deg, 0deg) scale(1);
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

    @keyframes wobble-scale {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.18);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        animation: none;
        filter: none;
      }

      body {
        animation: none;
        filter: none;
        background: #ca8a04;
        background-size: auto;
      }

      body::before {
        animation: none;
        opacity: 0;
      }

      .wrap {
        animation: none;
        filter: none;
      }

      .tumble,
      .hello-wrap,
      .wild,
      .spin,
      .pulse {
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
      <div class="wrap">
        <p class="hello-wrap">
          <span class="wild">
            <span class="spin"><span class="pulse">Hello, World!</span></span>
          </span>
        </p>
      </div>
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
    `\x1b[35m\x1b[1mhttp://localhost:${bound}\x1b[0m — maximum chaos`,
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
