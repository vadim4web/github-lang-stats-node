function generateBarChart({stats, langs, title, bg, tColor, txtColor}) {
  let totalBytes = Object.values(stats).reduce((a, b) => a + b, 0);

  // Знайдемо максимальний обсяг байт для нормалізації висоти барів
  let maxBytes = Math.max(...Object.values(stats));

  let svgParts = [`<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bg}"/> 
      <text x="300" y="20" font-size="16" font-weight="bold" text-anchor="middle" fill="${tColor}">${title}</text>`];

  let barWidth = 40;
  let scaleFactor = 300 / maxBytes;  // Масштабування для найбільшого бару

  // Вираховуємо відстань між стовпцями та кількість стовпців
  let totalBarsWidth = (barWidth * Object.keys(stats).length) + (10 * (Object.keys(stats).length - 1));  // Ширина всіх стовпців разом з проміжками
  let startX = (600 - totalBarsWidth) / 2;  // Відстань від лівого краю для відцентрування

  let x = startX;

  for (const [lang, bytes] of Object.entries(stats)) {
      let height = bytes * scaleFactor;  // Висота пропорційно найбільшому значенню
      let color = langs[lang]?.color || tColor;
      let percentage = ((bytes / totalBytes) * 100).toFixed(1);

      // Якщо txtColor не заданий, застосуємо hue-rotate(180deg) до кольору сектора
      let textFill = txtColor === "inherit" ? color : txtColor;
      let textStyle = txtColor === "inherit" ? 'filter: invert(1)' : '';

      svgParts.push(`
          <rect x="${x}" y="${400 - height - 50}" width="${barWidth}" height="${height}" fill="${color}" />
          <text x="${x + barWidth / 2}" y="${400 - height - 60}" font-size="12" text-anchor="middle" fill="${textFill}" style="${textStyle}">${percentage}%</text>
          <text x="${x + barWidth / 2}" y="380" font-size="10" text-anchor="middle" fill="${textFill}" style="${textStyle}">${lang}</text>
      `);
      x += barWidth + 10;  // Переміщаємо x для наступного стовпця
  }

  svgParts.push(`</svg>`);
  return svgParts.join('');
}

module.exports = { generateBarChart };
