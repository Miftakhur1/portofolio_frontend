import { useEffect, useRef } from "react";

export default function BackgroundStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ================= MOUSE ================= */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const trails = [];

    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (e.clientY / h - 0.5) * 2;

      trails.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 2 + 1.5,
      });

      if (trails.length > 60) trails.shift();
    };

    window.addEventListener("mousemove", onMouseMove);

    /* ================= STARS ================= */
    const stars = Array.from({ length: 6 }).map(createStar);

   function createStar() {
  const fromSide = Math.random() < 0.5;

  return {
    x: fromSide ? Math.random() * w : -100,
    y: fromSide ? -100 : Math.random() * h * 0.6,
    len: Math.random() * 90 + 70,
    speed: Math.random() * 1.2 + 0.8,
    opacity: Math.random() * 0.35 + 0.15,
  };
}

    /* ================= PLANETS ================= */
    const earth = {
      cx: w * 0.25,
      cy: h * 0.38,
      r: 60,
      angle: Math.random() * Math.PI * 2,
      speed: 0.00025,
      orbit: 22,
      px: 0,
      py: 0,
    };

    const moon = {
      parent: earth,
      r: 16,
      angle: Math.random() * Math.PI * 2,
      speed: 0.0012,
      orbit: 28,
    };

    const saturn = {
      cx: w * 0.78,
      cy: h * 0.28,
      r: 75,
      angle: Math.random() * Math.PI * 2,
      speed: -0.00018,
      orbit: 30,
      px: 0,
      py: 0,
    };

    function updateParallax(p, strength) {
      const tx = mouse.tx * strength;
      const ty = mouse.ty * strength;
      p.px += (tx - p.px) * 0.04;
      p.py += (ty - p.py) * 0.04;
    }

    function drawEarth() {
      earth.angle += earth.speed;
      updateParallax(earth, 14);

      const x = earth.cx + Math.cos(earth.angle) * earth.orbit + earth.px;
      const y = earth.cy + Math.sin(earth.angle) * earth.orbit + earth.py;

      const g = ctx.createRadialGradient(
        x - earth.r * 0.3,
        y - earth.r * 0.3,
        earth.r * 0.2,
        x,
        y,
        earth.r
      );

      g.addColorStop(0, "rgba(96,165,250,0.25)");
      g.addColorStop(0.6, "rgba(37,99,235,0.12)");
      g.addColorStop(1, "rgba(2,6,23,0.95)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, earth.r, 0, Math.PI * 2);
      ctx.fill();

      return { x, y };
    }

    function drawMoon(ex, ey) {
      moon.angle += moon.speed;

      const x = ex + Math.cos(moon.angle) * moon.orbit;
      const y = ey + Math.sin(moon.angle) * moon.orbit;

      ctx.fillStyle = "rgba(226,232,240,0.35)";
      ctx.beginPath();
      ctx.arc(x, y, moon.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSaturn() {
      saturn.angle += saturn.speed;
      updateParallax(saturn, 20);

      const x = saturn.cx + Math.cos(saturn.angle) * saturn.orbit + saturn.px;
      const y = saturn.cy + Math.sin(saturn.angle) * saturn.orbit + saturn.py;

      const g = ctx.createRadialGradient(
        x - saturn.r * 0.3,
        y - saturn.r * 0.3,
        saturn.r * 0.2,
        x,
        y,
        saturn.r
      );

      g.addColorStop(0, "rgba(226,232,240,0.45)");
      g.addColorStop(1, "rgba(71,85,105,0.9)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, saturn.r * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(226,232,240,0.35)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(x, y, saturn.r, saturn.r * 0.35, -0.4, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawMouseTrail() {
      trails.forEach((t, i) => {
        ctx.fillStyle = `rgba(147,197,253,${t.life * 0.12})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fill();

        t.life -= 0.025;
        t.size *= 0.98;

        if (t.life <= 0) trails.splice(i, 1);
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      drawMouseTrail();

      const earthPos = drawEarth();
      drawMoon(earthPos.x, earthPos.y);
      drawSaturn();

      stars.forEach((s) => {
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y - s.len);
        ctx.stroke();

        s.x += s.speed * 1.5;
        s.y += s.speed; // ✅ jatuh ke bawah


        if (s.x > w + 150 || s.y > h + 150) {
        Object.assign(s, createStar());
    }
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="shooting-stars" />;
}
