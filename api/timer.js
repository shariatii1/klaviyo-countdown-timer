const { createCanvas } = require('@napi-rs/canvas');

module.exports = async (req, res) => {
  const { end, bg = "000000", color = "ffffff", label = "Time left:" } = req.query;
  const endTime = new Date(end);
  const now = new Date();
  const timeLeft = Math.max(0, endTime - now);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const canvas = createCanvas(600, 120);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = `#${bg}`; ctx.fillRect(0, 0, 600, 120);
  ctx.fillStyle = `#${color}`; ctx.font = "28px Arial"; ctx.fillText(label, 20, 40);
  ctx.font = "bold 36px Arial"; ctx.fillText(`${days}d ${hours}h ${minutes}m ${seconds}s`, 20, 90);

  const buffer = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.status(200).end(buffer);
};
