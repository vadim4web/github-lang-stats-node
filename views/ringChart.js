function generateRingChart({stats, langs, title, bg, tColor, txtColor}) {
  let totalBytes = Object.values(stats).reduce((a, b) => a + b, 0);
  let outerRadius = 250; // Новий зовнішній радіус
  let innerRadius = 180; // Новий внутрішній радіус
  let centerX = 640, centerY = 360; // Нові координати центру
  let startAngle = 0;

  let svgParts = [
    `<svg width="1280" height="640" viewBox="0 0 1280 640" xmlns="http://www.w3.org/2000/svg">
     <rect width="100%" height="100%" fill="${bg}"/>
     <text x="640" y="50" font-size="32" font-weight="bold" text-anchor="middle" fill="${tColor}">${title}</text>`
  ];

  for (const [lang, bytes] of Object.entries(stats)) {
    let percentage = bytes / totalBytes;
    let angle = percentage * 2 * Math.PI;

    let x1 = centerX + outerRadius * Math.cos(startAngle);
    let y1 = centerY + outerRadius * Math.sin(startAngle);
    let x2 = centerX + outerRadius * Math.cos(startAngle + angle);
    let y2 = centerY + outerRadius * Math.sin(startAngle + angle);

    let color = langs[lang]?.color || tColor;
    let textFill = txtColor === "inherit" ? color : txtColor;
    let textStyle = txtColor === "inherit" ? 'filter: invert(1)' : '';

    // Додаємо сектор кільцевої діаграми
    svgParts.push(`
      <path d="M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${(percentage > 0.5 ? 1 : 0)} 1 ${x2} ${y2} 
              L ${centerX + innerRadius * Math.cos(startAngle + angle)} ${centerY + innerRadius * Math.sin(startAngle + angle)} 
              A ${innerRadius} ${innerRadius} 0 ${(percentage > 0.5 ? 1 : 0)} 0 
              ${centerX + innerRadius * Math.cos(startAngle)} ${centerY + innerRadius * Math.sin(startAngle)} Z" 
              fill="${color}" style="filter: drop-shadow(0 0 5px ${color})" />
    `);

    // Координати текстових підписів
    let textX = centerX + (outerRadius + 40) * Math.cos(startAngle + angle / 2);
    let textY = centerY + (outerRadius + 12) * Math.sin(startAngle + angle / 2);
    
    svgParts.push(`
      <text x="${textX}" y="${textY}" font-size="18" text-anchor="middle" fill="${textFill}" style="${textStyle}">${lang}</text>
    `);

    startAngle += angle;
  }

  svgParts.push('</svg>');
  return svgParts.join('');
}

module.exports = { generateRingChart };
