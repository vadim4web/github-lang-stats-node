const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { updateLanguagesJSON, LANGUAGES_JSON_PATH } = require('./utils/fetchLangs');
const { fetchStats } = require('./utils/fetchStats');
const { renderView } = require('./utils/renderView');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
    const {
        user = 'vadim4web',
        view = 'pie',
        bg = "#ffffff",
        title = `${user.toUpperCase()}'s Programming Langs Stats`,
        tColor = "#000000",
        txtColor = "inherit"
    } = req.query;

    await updateLanguagesJSON();
    const langs = JSON.parse(fs.readFileSync(LANGUAGES_JSON_PATH, 'utf-8'));

    const stats = await fetchStats(user);

    const options = {
        stats,
        langs,
        bg,
        title,
        tColor,
        txtColor
    };

    renderView(res, view, options);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
