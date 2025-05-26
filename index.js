const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { createCanvas, loadImage } = require("@napi-rs/canvas");
const textLines = process.argv.slice(2);

// Config
const inputDir = "./images";
const outputDir = "./processed";
const cropWidth = 800;
const cropHeight = 600;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Process each image
fs.readdirSync(inputDir).forEach(async (file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  if (!file.match(/\.(jpg|jpeg|png)$/i)) return;

  // Load and process image
  try {
    const img = sharp(inputPath);
    const metadata = await img.metadata();

    const left = Math.floor((metadata.width - cropWidth) / 2);
    const top = Math.floor((metadata.height - cropHeight) / 2);

    const cropped = img.extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: cropWidth,
      height: cropHeight,
    });

    const darkened = await cropped.modulate({ brightness: 0.5 }).toBuffer();

    // Create canvas for overlay text
    const canvas = createCanvas(cropWidth, cropHeight);
    const ctx = canvas.getContext("2d");

    // Draw the darkened image
    const baseImage = await loadImage(darkened);
    ctx.drawImage(baseImage, 0, 0, cropWidth, cropHeight);

    // Overlay text
    ctx.fillStyle = "white";
    ctx.font = "bold 55px Courier New";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = 50;
    const totalHeight = lineHeight * textLines.length;
    const startY = cropHeight / 2 - totalHeight / 2 + lineHeight / 2;

    textLines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      ctx.fillText(line.trim(), cropWidth / 2, y);
      ctx.font = "25px Georgia";
    });

    // Save final output
    const outBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputPath.replace(/\.\w+$/, ".png"), outBuffer);
    console.log("Processed:", file);
  } catch (err) {
    console.error("Error processing", file, err);
  }
});
