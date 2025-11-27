// 3D glowing background animation
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
for (let i = 0; i < 80; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let dot of dots) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff55";
    ctx.fill();

    dot.x += dot.dx;
    dot.y += dot.dy;

    if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
  }
  requestAnimationFrame(draw);
}
draw();

// simple form alert
document.getElementById("contactForm").addEventListener("submit", e => {
  alert("Your message is being sent! 🚀");
});
