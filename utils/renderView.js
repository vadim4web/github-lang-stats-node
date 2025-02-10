const { generateBarChart } = require('../views/barChart');
const { generateDonutChart } = require('../views/donutChart');
const { generatePieChart } = require('../views/pieChart');
const { generateRingChart } = require("../views/ringChart");

function renderView(
  res,
  view,
  options
) {

  res.setHeader('Content-Type', 'image/svg+xml');

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
