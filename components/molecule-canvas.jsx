'use client';
import { useEffect, useRef } from "react";

const MoleculeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let points = []; // Масив точок (молекул)
    const numPoints = 300; // Кількість точок
    const connectionRadius = 100; // Радіус з'єднання
    const pointSpeed = 0.1; // Швидкість руху точок

    // Функція для оновлення розмірів canvas
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints(); // Переініціалізація точок при зміні розміру
    };

    // Ініціалізація точок
    const initPoints = () => {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * pointSpeed,
          vy: (Math.random() - 0.5) * pointSpeed,
        });
      }
    };

    // Оновлення розмірів при завантаженні та зміні розміру вікна
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Функція для малювання точок та ліній
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Малюємо лінії між точками
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRadius) {
            ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Малюємо точки
      for (let i = 0; i < points.length; i++) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Функція для оновлення позицій точок
    const updatePoints = () => {
      for (let i = 0; i < points.length; i++) {
        // Рухаємо точку
        points[i].x += points[i].vx;
        points[i].y += points[i].vy;

        // Відбиваємо точку від країв canvas
        if (points[i].x < 0 || points[i].x > canvas.width) points[i].vx *= -1;
        if (points[i].y < 0 || points[i].y > canvas.height) points[i].vy *= -1;
      }
    };

    // Функція для анімації
    const animate = () => {
      updatePoints(); // Оновлюємо позиції точок
      draw(); // Малюємо точки та лінії
      requestAnimationFrame(animate); // Запускаємо наступний кадр анімації
    };

    // Запуск анімації
    animate();

    // Прибирання обробників подій при видаленні компонента
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default MoleculeCanvas;