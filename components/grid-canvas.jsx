'use client';
import { useEffect, useRef } from "react";

const GridCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let gridSize = 50; // Розмір комірки сітки
    let cols, rows;
    let grid;

    // Функція для оновлення розмірів canvas та сітки
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / gridSize);
      rows = Math.floor(canvas.height / gridSize);

      // Ініціалізація сітки
      grid = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => ({
          x: 0,
          y: 0,
          vx: 0, // Швидкість по X
          vy: 0, // Швидкість по Y
        }))
      );
    };

    // Оновлення розмірів при завантаженні та зміні розміру вікна
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.strokeRect(
            i * gridSize + grid[i][j].x,
            j * gridSize + grid[i][j].y,
            gridSize,
            gridSize
          );
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cellX = i * gridSize + gridSize / 2;
          const cellY = j * gridSize + gridSize / 2;
          const distance = Math.sqrt((mouseX - cellX) ** 2 + (mouseY - cellY) ** 2);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            grid[i][j].vx += (cellX - mouseX) * force * 0.2; // Сильніший вплив
            grid[i][j].vy += (cellY - mouseY) * force * 0.2; // Сильніший вплив
          }
        }
      }
    };

    // Функція для повернення комірок на місце
    const returnToPosition = () => {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Сила, яка повертає комірку до початкового положення
          const returnForce = 0.1;
          grid[i][j].vx += (-grid[i][j].x) * returnForce;
          grid[i][j].vy += (-grid[i][j].y) * returnForce;

          // Зменшуємо швидкість для плавності
          grid[i][j].vx *= 0.9;
          grid[i][j].vy *= 0.9;

          // Оновлюємо позицію комірки
          grid[i][j].x += grid[i][j].vx;
          grid[i][j].y += grid[i][j].vy;
        }
      }
    };

    // Функція для анімації
    const animate = () => {
      returnToPosition(); // Повертаємо комірки на місце
      drawGrid(); // Малюємо сітку
      requestAnimationFrame(animate); // Запускаємо наступний кадр анімації
    };

    // Запуск анімації
    animate();

    // Додавання обробників подій
    canvas.addEventListener("mousemove", handleMouseMove);

    // Прибирання обробників подій при видаленні компонента
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default GridCanvas;