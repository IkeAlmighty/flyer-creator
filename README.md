# 🖼️ Image Text Overlay Processor

This Node.js script processes every image in the `./images` folder by:

- Cropping it to a centered `800x600` region
- Darkening the image
- Overlaying multiple lines of white text centered on the image
- Saving the processed result as a `.png` file in the `./processed` directory

## 📦 Dependencies

Make sure you have Node.js installed, then install the required packages:

`npm install sharp @napi-rs/canvas`

📁 Folder Structure

```bash
your-project/
├── images/        # Place your source images here (jpg, jpeg, png)
├── processed/     # Processed images will be output here
├── script.js      # The main script file
```

## 🚀 Usage

Run the script with one or more lines of text as arguments:

`node script.js "First Line" "Second Line" "Third Line"`

Example:

`node script.js "Scones!" "Freshly Baked" "All Summer"`

This will overlay:

```bash
Scones!
Freshly Baked
All Summer
```

…centered vertically and horizontally on each image.

## 📝 Notes

- Only .jpg, .jpeg, and .png files in the ./images folder are processed.

- All output images are saved as .png, regardless of original format.

- Fonts are hardcoded to Courier New for the first line and Georgia for subsequent lines (you can customize this in the script).

## ✨ Customization

You can modify the following values in the script to adjust image size or text style:

```js
const cropWidth = 800;
const cropHeight = 600;
ctx.font = "bold 55px Courier New"; // Main font
ctx.font = "25px Georgia"; // Subsequent lines
```
