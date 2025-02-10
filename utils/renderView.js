const { generateBarChart } = require('../views/barChart');
const { generateDonutChart } = require('../views/donutChart');
const { generatePieChart } = require('../views/pieChart');
const { generateRingChart } = require("../views/ringChart");

function renderView(
  res,
  view,
  options,
  cacheSeconds = 86400 // за замовчуванням 1 день (86400 секунд)
) {

  res.setHeader('Content-Type', 'image/svg+xml');
  // Додаємо кешування у заголовок
  res.setHeader('Cache-Control', `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=3600`);

  switch (view) {
    case 'bar':
      return res.send(generateBarChart(options));
    case 'donut':
      return res.send(generateDonutChart(options));
    case 'pie':
        return res.send(generatePieChart(options));
    case 'ring':
        return res.send(generateRingChart(options));
    default:
        return res.status(400).json({ error: 'Invalid view type' });
  }
}


module.exports = { renderView };
