"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./contact-page.module.css";

type Locale = "ru" | "en";
type Status = "idle" | "running" | "finished";
type Like = { x: number; y: number; radius: number; pulse: number };
type Obstacle = { x: number; width: number; height: number; hit: boolean };

const WIDTH = 960;
const HEIGHT = 420;
const GROUND = 342;
const DURATION = 30;

const copy = {
  ru: {
    score: "лайков",
    time: "секунд",
    best: "рекорд",
    start: "НАЧАТЬ КОНТЕНТ-СПРИНТ",
    restart: "СЫГРАТЬ ЕЩЁ РАЗ",
    hint: "Пробел / ↑ / тап — прыжок",
    ready: "Собирайте лайки и перепрыгивайте токсичные комментарии",
    result: "ВАША СКИДКА",
    promo: "ПРОМОКОД",
    copied: "СКОПИРОВАНО",
    copy: "КОПИРОВАТЬ",
    claim: "ЗАБРАТЬ СКИДКУ",
  },
  en: {
    score: "likes",
    time: "seconds",
    best: "best",
    start: "START THE CONTENT SPRINT",
    restart: "PLAY AGAIN",
    hint: "Space / ↑ / tap to jump",
    ready: "Collect likes and jump over toxic comments",
    result: "YOUR DISCOUNT",
    promo: "PROMO CODE",
    copied: "COPIED",
    copy: "COPY",
    claim: "CLAIM DISCOUNT",
  },
} as const;

const rounded = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
};

function drawLike(ctx: CanvasRenderingContext2D, like: Like) {
  const scale = 1 + Math.sin(like.pulse) * 0.08;
  ctx.save();
  ctx.translate(like.x, like.y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#90bee9";
  ctx.beginPath();
  ctx.arc(0, 0, like.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "700 21px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("♥", 0, 1);
  ctx.restore();
}

function drawCharacter(ctx: CanvasRenderingContext2D, x: number, y: number, run: number) {
  const bob = Math.sin(run) * 2;
  ctx.save();
  ctx.translate(x, y + bob);

  ctx.strokeStyle = "#1c1c1c";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(20, 51);
  ctx.lineTo(13 + Math.sin(run) * 5, 71);
  ctx.moveTo(32, 51);
  ctx.lineTo(39 - Math.sin(run) * 5, 71);
  ctx.stroke();

  rounded(ctx, 8, 23, 37, 36, 12);
  ctx.fillStyle = "#8992e4";
  ctx.fill();
  ctx.strokeStyle = "#1c1c1c";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#ffd5bd";
  ctx.beginPath();
  ctx.arc(27, 14, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1c1c1c";
  ctx.beginPath();
  ctx.arc(25, 10, 15, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(38, 12, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1c1c1c";
  ctx.beginPath();
  ctx.arc(23, 15, 1.5, 0, Math.PI * 2);
  ctx.arc(32, 15, 1.5, 0, Math.PI * 2);
  ctx.fill();

  rounded(ctx, 34, 30, 17, 25, 3);
  ctx.fillStyle = "#1c1c1c";
  ctx.fill();
  rounded(ctx, 36, 32, 13, 18, 2);
  ctx.fillStyle = "#cee3a7";
  ctx.fill();
  ctx.fillStyle = "#1c1c1c";
  ctx.font = "700 8px Arial";
  ctx.textAlign = "center";
  ctx.fillText("♥", 42.5, 44);
  ctx.restore();
}

export default function ContactGame({ locale }: { locale: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const stateRef = useRef({
    status: "idle" as Status,
    score: 0,
    time: DURATION,
    playerY: GROUND - 72,
    velocity: 0,
    likes: [] as Like[],
    obstacles: [] as Obstacle[],
    likeTimer: 0,
    obstacleTimer: 0,
    elapsed: 0,
    last: 0,
    run: 0,
    flash: 0,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [best, setBest] = useState(0);
  const [copied, setCopied] = useState(false);
  const t = copy[locale];
  const discount = score >= 18 ? 10 : score >= 10 ? 7 : 5;
  const promoCode = `IAM-LIKE-${discount}`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = Number(window.localStorage.getItem("iam-contact-game-best") || 0);
      if (Number.isFinite(stored)) setBest(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const syncCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== WIDTH * ratio || canvas.height !== HEIGHT * ratio) {
      canvas.width = WIDTH * ratio;
      canvas.height = HEIGHT * ratio;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return ctx;
  }, []);

  const draw = useCallback(() => {
    const ctx = syncCanvas();
    if (!ctx) return;
    const game = stateRef.current;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#f7f7f5");
    gradient.addColorStop(0.55, "#ffffff");
    gradient.addColorStop(1, "#e8f4ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "rgba(28,28,28,.08)";
    ctx.lineWidth = 1;
    for (let x = -((game.elapsed * 55) % 48); x < WIDTH; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HEIGHT);
      ctx.stroke();
    }
    for (let y = 36; y < HEIGHT; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#1c1c1c";
    ctx.fillRect(0, GROUND, WIDTH, 4);
    ctx.fillStyle = "rgba(206,227,167,.55)";
    ctx.fillRect(0, GROUND + 4, WIDTH, HEIGHT - GROUND - 4);

    game.likes.forEach((like) => drawLike(ctx, like));
    game.obstacles.forEach((obstacle) => {
      rounded(ctx, obstacle.x, GROUND - obstacle.height, obstacle.width, obstacle.height, 8);
      ctx.fillStyle = obstacle.hit ? "#c5c5c5" : "#f55d1c";
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "700 14px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("@!?", obstacle.x + obstacle.width / 2, GROUND - obstacle.height / 2);
    });

    drawCharacter(ctx, 118, game.playerY, game.run);
    if (game.flash > 0) {
      ctx.fillStyle = `rgba(245,93,28,${game.flash * 0.22})`;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  }, [syncCanvas]);

  const finish = useCallback(() => {
    const game = stateRef.current;
    game.status = "finished";
    setStatus("finished");
    setScore(game.score);
    setTime(0);
    setBest((current) => {
      const next = Math.max(current, game.score);
      window.localStorage.setItem("iam-contact-game-best", String(next));
      return next;
    });
  }, []);

  const loop = useCallback(function gameLoop(now: number) {
    const game = stateRef.current;
    if (game.status !== "running") {
      draw();
      return;
    }
    if (!game.last) game.last = now;
    const dt = Math.min((now - game.last) / 1000, 0.034);
    game.last = now;
    game.elapsed += dt;
    game.time = Math.max(0, DURATION - game.elapsed);
    game.likeTimer -= dt;
    game.obstacleTimer -= dt;
    game.run += dt * (game.playerY >= GROUND - 72 ? 12 : 3);
    game.flash = Math.max(0, game.flash - dt * 3);

    game.velocity += 1850 * dt;
    game.playerY += game.velocity * dt;
    if (game.playerY > GROUND - 72) {
      game.playerY = GROUND - 72;
      game.velocity = 0;
    }

    if (game.likeTimer <= 0) {
      const heights = [88, 116, 154];
      game.likes.push({ x: WIDTH + 25, y: GROUND - heights[Math.floor(Math.random() * heights.length)], radius: 19, pulse: 0 });
      game.likeTimer = 0.62 + Math.random() * 0.38;
    }
    if (game.obstacleTimer <= 0) {
      game.obstacles.push({ x: WIDTH + 50, width: 38, height: 45 + Math.random() * 18, hit: false });
      game.obstacleTimer = 2.35 + Math.random() * 1.25;
    }

    const speed = 290 + game.elapsed * 2.7;
    const player = { x: 118, y: game.playerY, w: 52, h: 72 };
    game.likes.forEach((like) => {
      like.x -= speed * dt;
      like.pulse += dt * 7;
    });
    game.obstacles.forEach((obstacle) => { obstacle.x -= speed * dt; });

    game.likes = game.likes.filter((like) => {
      const hit = like.x + like.radius > player.x && like.x - like.radius < player.x + player.w && like.y + like.radius > player.y && like.y - like.radius < player.y + player.h;
      if (hit) {
        game.score += 1;
        setScore(game.score);
        return false;
      }
      return like.x > -50;
    });
    game.obstacles.forEach((obstacle) => {
      if (obstacle.hit) return;
      const hit = obstacle.x < player.x + player.w - 8 && obstacle.x + obstacle.width > player.x + 8 && GROUND - obstacle.height < player.y + player.h - 4;
      if (hit) {
        obstacle.hit = true;
        game.score = Math.max(0, game.score - 1);
        game.flash = 1;
        setScore(game.score);
      }
    });
    game.obstacles = game.obstacles.filter((obstacle) => obstacle.x > -60);
    setTime(Math.ceil(game.time));
    draw();

    if (game.time <= 0) finish();
    else rafRef.current = requestAnimationFrame(gameLoop);
  }, [draw, finish]);

  const start = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    stateRef.current = {
      status: "running", score: 0, time: DURATION, playerY: GROUND - 72, velocity: 0,
      likes: [], obstacles: [], likeTimer: 0.55, obstacleTimer: 2.4, elapsed: 0, last: 0, run: 0, flash: 0,
    };
    setScore(0);
    setTime(DURATION);
    setCopied(false);
    setStatus("running");
    canvasRef.current?.focus();
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const jump = useCallback(() => {
    const game = stateRef.current;
    if (game.status === "idle" || game.status === "finished") {
      start();
      return;
    }
    if (game.playerY >= GROUND - 74) game.velocity = -720;
  }, [start]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [draw]);

  const copyPromo = async () => {
    await navigator.clipboard.writeText(promoCode);
    setCopied(true);
  };

  const claim = () => {
    window.dispatchEvent(new CustomEvent("iam:open-lead", { detail: { label: `${locale === "ru" ? "Скидка за игру" : "Game discount"} ${discount}% · ${promoCode}` } }));
  };

  return (
    <div className={styles.gameShell} data-game-status={status}>
      <div className={styles.gameHud} aria-live="polite">
        <div><strong>{score}</strong><span>{t.score}</span></div>
        <div><strong>{time}</strong><span>{t.time}</span></div>
        <div><strong>{best}</strong><span>{t.best}</span></div>
      </div>
      <div className={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={styles.gameCanvas}
          width={WIDTH}
          height={HEIGHT}
          tabIndex={0}
          aria-label={locale === "ru" ? "Игра: собирайте лайки и перепрыгивайте комментарии" : "Game: collect likes and jump over comments"}
          onPointerDown={jump}
          onKeyDown={(event) => {
            if ([" ", "ArrowUp", "w", "W"].includes(event.key)) {
              event.preventDefault();
              jump();
            }
          }}
        />
        {status !== "running" ? (
          <div className={styles.gameOverlay}>
            {status === "idle" ? (
              <>
                <p>{t.ready}</p>
                <button type="button" onClick={start}>{t.start}</button>
                <span>{t.hint}</span>
              </>
            ) : (
              <div className={styles.gameResult}>
                <span>{t.result}</span>
                <strong>{discount}%</strong>
                <small>{t.promo}</small>
                <code>{promoCode}</code>
                <div>
                  <button type="button" onClick={copyPromo}>{copied ? t.copied : t.copy}</button>
                  <button type="button" onClick={claim}>{t.claim}</button>
                </div>
                <button className={styles.replay} type="button" onClick={start}>{t.restart}</button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <p className={styles.gameCaption}>{t.hint} · {locale === "ru" ? "5% за прохождение, до 10% за результат" : "5% for finishing, up to 10% for a high score"}</p>
    </div>
  );
}
