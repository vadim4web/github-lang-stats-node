const axios = require('axios');
const yaml = require('yaml-js');
const fs = require('fs');
const path = require('path');

const LANGUAGES_YML_URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
const LANGUAGES_JSON_PATH = path.join(__dirname, '../data/languages.json');

async function updateLanguagesJSON() {
    try {
        console.log('🔄 Fetching latest languages.yml...');
        const response = await axios.get(LANGUAGES_YML_URL);
        const languages = yaml.load(response.data);

        fs.writeFileSync(LANGUAGES_JSON_PATH, JSON.stringify(languages, null, 2));
        console.log('✅ languages.json updated successfully!');
    } catch (error) {
        console.error('❌ Failed to update languages.json:', error);
    }
}

module.exports = { updateLanguagesJSON, LANGUAGES_JSON_PATH };
