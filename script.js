const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Liste automatique des chemins d’images
let imagePaths = [];
for (let i = 1; i <= 400; i++) {
  imagePaths.push(`Insta2/image${i}.jpg`);
}

// Effet de pixellisation
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

// Affichage et animation
function startAnimation() {
  function showNextImage() {


    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const imagePath = imagePaths[randomIndex];
    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Décider si on pixelise l'image (85% de chances)
      let toDraw = img;
      if (Math.random() < 0.85) {
        const scale = Math.random() * 0.08 + 0.0001;
        toDraw = pixelate(img, scale);
      }

      // Centrer l'image
      const scaleDisplay = 0.8;
      const w = toDraw.width * scaleDisplay;
      const h = toDraw.height * scaleDisplay;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(toDraw, x, y, w, h);
      console.log(`Image affichée : ${imagePath}`);

      // Afficher l'image pendant 1.5 secondes avant de passer à la suivante
      setTimeout(showNextImage, 400);
    };

    img.src = imagePath;
  }

  showNextImage();
}

// Démarrer l'animation
startAnimation();


