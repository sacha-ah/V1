const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 📁 Générer la liste des chemins
const imagePaths = [];
for (let i = 1; i <= 400; i++) {
  imagePaths.push(`Insta2/image${i}.jpg`);
}

let images = [];
let loadedImages = [];

// Charger les images de manière asynchrone
imagePaths.forEach((src, index) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImages.push(img);
    if (loadedImages.length === 1) {
      // Commencer l’animation dès qu’une image est dispo
      startAnimation();
    }
  };
  images[index] = img; // On garde l’ordre
});

// 🎨 Effet de pixellisation
function pixelate(img, scaleFactor) {
  const w = img.width;
  const h = img.height;

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  const smallW = Math.max(1, Math.floor(w * scaleFactor));
  const smallH = Math.max(1, Math.floor(h * scaleFactor));

  tempCanvas.width = smallW;
  tempCanvas.height = smallH;
  tempCtx.drawImage(img, 0, 0, smallW, smallH);

  const finalCanvas = document.createElement('canvas');
  const finalCtx = finalCanvas.getContext('2d');
  finalCanvas.width = w;
  finalCanvas.height = h;
  finalCtx.imageSmoothingEnabled = false;
  finalCtx.drawImage(tempCanvas, 0, 0, smallW, smallH, 0, 0, w, h);

  return finalCanvas;
}

// 🌀 Animation avec délai variable
function startAnimation() {
  function drawNext() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (loadedImages.length > 0) {
      const img = loadedImages[Math.floor(Math.random() * loadedImages.length)];
      let toDraw = img;

      if (Math.random() < 0.85) {
        const scale = Math.random() * 0.08 + 0.0001;
        toDraw = pixelate(img, scale);
      }

      const scaleDisplay = 0.9;
      const w = toDraw.width * scaleDisplay;
      const h = toDraw.height * scaleDisplay;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(toDraw, x, y, w, h);
    }

    const delay = 400 + Math.random() * 400;
    setTimeout(drawNext, delay);
  }

  drawNext(); // Lancer la boucle
}

