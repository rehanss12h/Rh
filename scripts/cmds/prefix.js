const moment = require("moment-timezone");
const { createCanvas, loadImage, registerFont } = require("canvas");

// ----------------------------
// PURPLE COSMIC FONT SETUP
// ----------------------------
let fontFamily = "Arial Black"; // default system font

try {
  const fontPath = "./fonts/PurpleCosmic.ttf"; // এখানে তোমার Purple Cosmic ফন্ট path
  if (fs.existsSync(fontPath)) {
    registerFont(fontPath, { family: "Purple Cosmic" });
    fontFamily = "Purple Cosmic";
    console.log("Purple Cosmic font loaded successfully!");
  } else {
    console.warn("Purple Cosmic font not found, using system font Arial Black");
  }
} catch (err) {
  console.warn("Font registration failed, using system font Arial Black");
}

const botStartTime = Date.now();

module.exports = {
  config: {
    name: "prefix",
    version: "3.4",
    author: "গরিবের বটের ফাইলে আবার Author? ডিরিম ভাই ডিরিম।🥹",
    role: 0,
    description: "Show bot prefix info on professional neon image with Purple Cosmic font",
    category: "⚙ Configuration"
  },

  onStart: async function({ message }) {
    return;
  },

  onChat: async function({ event, message, threadsData }) {
    const text = (event.body || event.message?.body || "").trim();
    if (!text || text.toLowerCase() !== "prefix") return;

    const globalPrefix = global.GoatBot.config.prefix;
    const threadPrefix = await threadsData.get(event.threadID, "data.prefix") || globalPrefix;

    const currentTime = moment().tz("Asia/Dhaka").format("hh:mm A");
    const uptimeMs = Date.now() - botStartTime;
    const sec = Math.floor(uptimeMs / 1000) % 60;
    const min = Math.floor(uptimeMs / (1000 * 60)) % 60;
    const hr = Math.floor(uptimeMs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const uptime = `${days}d ${hr}h ${min}m ${sec}s`;

    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // ----------------------------
    // BACKGROUND: Image or Gradient
    // ----------------------------
    try {
      const bg = await loadImage("background.jpg");
      ctx.drawImage(bg, 0, 0, width, height);
    } catch (err) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f0c29");
      gradient.addColorStop(0.5, "#302b63");
      gradient.addColorStop(1, "#24243e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // ----------------------------
    // LIGHT FLARE EFFECT
    // ----------------------------
