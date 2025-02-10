function generateBarChart({ stats, langs, title, bg, tColor, txtColor }) {
    let totalBytes = Object.values(stats).reduce((a, b) => a + b, 0);
    let maxBytes = Math.max(...Object.values(stats));
  
    let svgParts = [
      `<svg width="1280" height="640" viewBox="0 0 1280 640" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bg}"/> 
        <text x="640" y="50" font-size="32" font-weight="bold" text-anchor="middle" fill="${tColor}">${title}</text>`
    ];
  
    let barWidth = 80;
    let scaleFactor = 450 / maxBytes;  // Масштабування для найбільшого бару
  
    let totalBarsWidth = (barWidth * Object.keys(stats).length) + (20 * (Object.keys(stats).length - 1));  // Ширина всіх стовпців разом з проміжками
    let startX = (1280 - totalBarsWidth) / 2;  // Відстань від лівого краю для відцентрування
  
    let x = startX;
  
    for (const [lang, bytes] of Object.entries(stats)) {
      let height = bytes * scaleFactor;  // Висота пропорційно найбільшому значенню
      let color = langs[lang]?.color || tColor;
      let percentage = ((bytes / totalBytes) * 100).toFixed(1);
  
      let textFill = txtColor === "inherit" ? color : txtColor;
      let textStyle = txtColor === "inherit" ? 'filter: invert(1)' : '';
  
      svgParts.push(`
        <rect x="${x}" y="${640 - height - 40}" width="${barWidth}" height="${height}" fill="${color}" />
        <text x="${x + barWidth / 2}" y="${640 - height - 50}" font-size="18" text-anchor="middle" fill="${textFill}" style="${textStyle}">${percentage}%</text>
        <text x="${x + barWidth / 2}" y="620" font-size="18" text-anchor="middle" fill="${textFill}" style="${textStyle}">${lang}</text>
      `);
      x += barWidth + 20;  // Переміщаємо x для наступного стовпця
    }
  
    svgParts.push(`</svg>`);
    return svgParts.join('');
  }
  
  module.exports = { generateBarChart };
  