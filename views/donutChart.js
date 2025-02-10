function generateDonutChart({stats, langs, title, bg, tColor, txtColor}) {
  let totalBytes = Object.values(stats).reduce((a, b) => a + b, 0);
  let svgParts = [`<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bg}"/> 
      <text x="300" y="20" font-size="16" font-weight="bold" text-anchor="middle" fill="${tColor}">${title}</text>`];

  let startAngle = 0;
  let radius = 140;
  let innerRadius = 80;
  let centerX = 300, centerY = 200;  // Центруємо по середині

  for (const [lang, bytes] of Object.entries(stats)) {
      let percentage = bytes / totalBytes;
      let angle = percentage * 2 * Math.PI;
      let x1 = centerX + radius * Math.cos(startAngle);
      let y1 = centerY + radius * Math.sin(startAngle);
      let x2 = centerX + radius * Math.cos(startAngle + angle);
      let y2 = centerY + radius * Math.sin(startAngle + angle);
      let largeArc = percentage > 0.5 ? 1 : 0;
      let color = langs[lang]?.color || tColor;

      // Якщо txtColor не заданий, застосуємо hue-rotate(180deg) до кольору сектора
      let textFill = txtColor === "inherit" ? color : txtColor;
      let textStyle = txtColor === "inherit" ? 'filter: invert(1)' : '';

      svgParts.push(`
          <path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} 
                   L ${centerX + innerRadius * Math.cos(startAngle + angle)} ${centerY + innerRadius * Math.sin(startAngle + angle)} 
                   A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${centerX + innerRadius * Math.cos(startAngle)} ${centerY + innerRadius * Math.sin(startAngle)} 
                   Z" fill="${color}" />
      `);

      let textX = centerX + (radius + 20) * Math.cos(startAngle + angle / 2);
      let textY = centerY + (radius + 20) * Math.sin(startAngle + angle / 2);
      svgParts.push(`<text x="${textX}" y="${textY}" font-size="10" text-anchor="middle" fill="${textFill}" style="${textStyle}">${lang}</text>`);

      startAngle += angle;
  }

  svgParts.push(`</svg>`);
  return svgParts.join('');
}

module.exports = { generateDonutChart };