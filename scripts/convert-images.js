/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../images');
const outputDir = path.join(__dirname, '../public/hero-sequence');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertImages() {
  try {
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    
    // Sort files to ensure correct order
    files.sort();
    
    console.log(`Found ${files.length} images to convert.`);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(inputDir, file);
      // We will name them frame-001.webp to frame-270.webp
      const fileNumber = (i + 1).toString().padStart(4, '0');
      const outputPath = path.join(outputDir, `frame-${fileNumber}.webp`);
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      if ((i + 1) % 50 === 0 || i === files.length - 1) {
        console.log(`Converted ${i + 1}/${files.length} images...`);
      }
    }
    
    console.log('Successfully converted all images to webp format!');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertImages();
