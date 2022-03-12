(() => {
  const setup = () => {
    const canvas = document.getElementById("falling-snow-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return {
      canvas,
      canvasContext: canvas.getContext("2d"),
      numberOfSnowBalls: 250,
    };
  };

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const createSnowBalls = (canvas, numberOfSnowBalls) =>
    [...Array(numberOfSnowBalls)].map(() => ({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      opacity: random(0.7, 1),
      radius: random(2, 4),
      speedX: random(-5, 5),
      speedY: random(1, 3),
    }));

  const drawSnowBalls = (canvasContext, snowBall) => {
    canvasContext.beginPath();
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = `rgba(255, 255, 255, ${snowBall.opacity})`;
    canvasContext.fill();
  };

  const moveSnowBalls = (snowBall) => {
    snowBall.x += snowBall.speedX;
    snowBall.y += snowBall.speedY;
  };

  const checkSnowBallCollision = (canvas, snowBall) => {
    // Check snowball is still on screen
    if (snowBall.x > canvas.width) {
      snowBall.x = 0;
    } else if (snowBall.x < 0) {
      snowBall.x = canvas.width;
    }

    if (snowBall.y > canvas.height) {
      snowBall.y = 0;
    } else if (snowBall.y < 0) {
      snowBall.y = canvas.height;
    }
  };

  const clearSnowBall = (canvas, canvasContext) =>
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  const run = () => {
    const { canvas, canvasContext, numberOfSnowBalls } = setup();
    const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);

    setInterval(() => {
      clearSnowBall(canvas, canvasContext);
      snowBalls.forEach((snowBall) => {
        drawSnowBalls(canvasContext, snowBall);
        moveSnowBalls(snowBall);
        checkSnowBallCollision(canvas, snowBall);
      });
    }, 50);
  };

  run();
})();
