import { useRef, useEffect, useState } from "react";

export default function Snow({ count, options, intro }) {
  const canvasRef = useRef(null);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const snowflakes = [];

  const add = (item) => snowflakes.push(item(canvasRef.current));

  const update = () => snowflakes.forEach((el) => el.update());

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Dodatkowy warunek sprawdzający, czy canvas istnieje
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    snowflakes.forEach((el) => el.resized());
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Dodatkowy warunek sprawdzający, czy canvas istnieje
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    snowflakes.forEach((el) => el.draw());
  };

  const events = () => {
    window.addEventListener("resize", resize);
  };

  const loop = () => {
    draw();
    update();
    requestAnimationFrame(loop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Dodatkowy warunek sprawdzający, czy canvas istnieje
    const defaultOptions = {
      color: "white",
      radius: [0.5, 3.0],
      speed: [1, 3],
      wind: [-0.5, 3.0],
    };

    const SnowItem = (canvas, drawFn = null, opts) => {
      const options = { ...defaultOptions, ...opts };
      const { radius, speed, wind, color } = options;
      const params = {
        color,
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * -canvas.offsetHeight,
        radius: Math.random() * (radius[1] - radius[0]) + radius[0],
        speed: Math.random() * (speed[1] - speed[0]) + speed[0],
        wind: Math.random() * (wind[1] - wind[0]) + wind[0],
        isResized: false,
      };
      const ctx = canvas.getContext("2d");

      const updateData = () => {
        params.x = Math.random() * canvas.offsetWidth;
        params.y = Math.random() * -canvas.offsetHeight;
      };

      const resized = () => (params.isResized = true);

      const drawDefault = () => {
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
        ctx.fillStyle = params.color;
        ctx.fill();
        ctx.closePath();
      };

      const draw = drawFn ? () => drawFn(ctx, params) : drawDefault;

      const translate = () => {
        params.y += params.speed;
        params.x += params.wind;
      };

      const onDown = () => {
        if (params.y < canvas.offsetHeight) return;

        if (params.isResized) {
          updateData();
          params.isResized = false;
        } else {
          params.y = 0;
          params.x = Math.random() * canvas.offsetWidth;
        }
      };

      const update = () => {
        translate();
        onDown();
      };

      return {
        update,
        resized,
        draw,
      };
    };

    const init = () => {
      for (let i = 0; i < count; i++) {
        add((canvas) => SnowItem(canvas, null, options));
      }
      events();
      loop();
    };

    if (!intro) {
      init(count);
      resize();
      setCanvasInitialized(true);
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [count, options, intro]);

  return <canvas ref={canvasRef} className="snow" id="snow"></canvas>;
}
