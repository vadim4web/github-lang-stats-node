function generatePieChart({stats, langs, title, bg, tColor, txtColor}) {
    let totalBytes = Object.values(stats).reduce((a, b) => a + b, 0);
    
    let svgParts = [`<svg width="1280" height="640" viewBox="0 0 1280 640" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bg}"/> 
        <text x="640" y="40" font-size="32" font-weight="bold" text-anchor="middle" fill="${tColor}">${title}</text>`];
  
    let startAngle = 0;
    let radius = 250;
    let centerX = 640, centerY = 360;  // Центруємо по середині
  
    for (const [lang, bytes] of Object.entries(stats)) {
        let percentage = bytes / totalBytes;
        let angle = percentage * 2 * Math.PI;
        let x1 = centerX + radius * Math.cos(startAngle);
        let y1 = centerY + radius * Math.sin(startAngle);
        let x2 = centerX + radius * Math.cos(startAngle + angle);
        let y2 = centerY + radius * Math.sin(startAngle + angle);
        let largeArc = percentage > 0.5 ? 1 : 0;
        let color = langs[lang]?.color || tColor;
  
        // Текстові кольори
        let textFill = txtColor === "inherit" ? color : txtColor;
        let textStyle = txtColor === "inherit" ? 'filter: invert(1)' : '';
  
        svgParts.push(`
            <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" style="filter: drop-shadow(0 0 5px ${color})" />
        `);
  
        // Визначаємо координати для тексту
        let textX = centerX + (radius + 40) * Math.cos(startAngle + angle / 2);
        let textY = centerY + (radius + 12) * Math.sin(startAngle + angle / 2);
        svgParts.push(`<text x="${textX}" y="${textY}" font-size="18" text-anchor="middle" fill="${textFill}" style="${textStyle}">${lang}</text>`);
  
        startAngle += angle;
    }
  
    svgParts.push(`</svg>`);
    return svgParts.join('');
  }
  
  module.exports = { generatePieChart };
  