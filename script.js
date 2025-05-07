const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Liste automatique des chemins d’images
const imagePaths = [];
for (let i = 1; i <= 400; i++) {
  imagePaths.push(`Insta2/image${i}.jpg`);
}

let images = [];
let loaded = 0;

// Charger toutes les images
imagePaths.forEach((src, i) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loaded++;
    if (loaded === imagePaths.length) {
      startAnimation();
    }
  };
  images[i] = img;
});

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
function drawRandomImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Choisir une image aléatoire
  const img = images[Math.floor(Math.random() * images.length)];

  // Calculer position et taille (si besoin, adapte selon ton layout)
  const w = canvas.width * 0.8;
  const h = canvas.height * 0.8;
  const x = (canvas.width - w) / 2;
  const y = (canvas.height - h) / 2;

  // Afficher l'image
  ctx.drawImage(img, x, y, w, h);

  // Choisir un délai aléatoire entre 400ms et 800ms
  const delay = 300 + Math.random() * 1200;

  // Relancer l'affichage après ce délai
  setTimeout(drawRandomImage, delay);
}

// Lancer la première image
drawRandomImage();



