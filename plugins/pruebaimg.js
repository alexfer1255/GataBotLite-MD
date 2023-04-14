/*import Jimp from 'jimp'

const handler = async (m, { conn, text }) => {
const image = await Jimp.create(1200, 800, 0xffffffff)
const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
image.print( font, 0, 0, { text: 'GataBot', alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 1200, 800)
const buffer = await image.getBufferAsync(Jimp.MIME_JPEG)
await conn.sendFile(m.chat, buffer, 'img.jpg', 'Mensaje', m)
}

handler.command = /^pruebaimg$/i
export default handler*/


import Jimp from 'jimp';


function shuffleText(text) {
  let shuffledText = '';
  while (text.length > 0) {
    const randomIndex = Math.floor(Math.random() * text.length);
    shuffledText += text.charAt(randomIndex);
    text = text.slice(0, randomIndex) + text.slice(randomIndex + 1);
  }
  return shuffledText;
}

const handler = async (m, { conn, text }) => {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const gridSize = 12; 
  const grid = [];

  
  for (let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      grid[i].push(letters.charAt(randomIndex));
    }
  }

  
  const sopaDeLetras = grid.map(row => row.join(' ')).join('\n');

  
  const image = await Jimp.create(1200, 800, 0xffffffff);
  image.print(font, 0, 0, sopaDeLetras, 1200, 800);

  
  const searchText = shuffleText(text.toLowerCase()); 
  const textWidth = Jimp.measureText(font, searchText);
  const textHeight = Jimp.measureTextHeight(font, searchText, 800);
  const x = Math.floor(Math.random() * (1200 - textWidth)); 
  const y = Math.floor(Math.random() * (800 - textHeight));
  image.print(font, x, y, searchText);

  
  const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
  await conn.sendFile(m.chat, buffer, 'img.jpg', 'Mensaje', m);
};

handler.command = /^pruebaimg$/i;
export default handler;
