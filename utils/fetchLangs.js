const axios = require('axios');
const yaml = require('yaml-js');
const fs = require('fs');
const path = require('path');

const LANGUAGES_YML_URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
const LANGUAGES_JSON_PATH = path.join(__dirname, '../data/languages.json');
const LAST_UPDATE_PATH = path.join(__dirname, '../data/lastUpdate.json');

// Функція для перевірки, чи потрібно оновлювати
async function checkUpdateRequired() {
    try {
        const lastUpdate = JSON.parse(fs.readFileSync(LAST_UPDATE_PATH, 'utf-8'));
        const currentTime = Date.now();
        const diff = currentTime - lastUpdate.timestamp;

        // 1000 * 60 * 60 * 24 * 7 = 7 днів
        const oneWeek = 1000 * 60 * 60 * 24 * 7; // Можна змінити на oneMonth для 30 днів

        // Якщо з останнього оновлення пройшло менше ніж 1 тиждень, не потрібно оновлювати
        if (diff < oneWeek) {
            console.log('⚡ languages.json is up to date, skipping update.');
            return false;
        }
    } catch (err) {
        console.log('⚠️ No previous update timestamp found. Proceeding with update.');
    }
    return true;
}

async function updateLanguagesJSON() {
    try {
        // Перевірка чи потрібно оновлювати
        const isUpdateRequired = await checkUpdateRequired();

        if (!isUpdateRequired) {
            return; // Якщо оновлення не потрібно, вийти
        }

        console.log('🔄 Fetching latest languages.yml...');
        const response = await axios.get(LANGUAGES_YML_URL);
        const languages = yaml.load(response.data);

        // Зберігаємо дані в JSON
        fs.writeFileSync(LANGUAGES_JSON_PATH, JSON.stringify(languages, null, 2));
        console.log('✅ languages.json updated successfully!');

        // Оновлюємо timestamp останнього оновлення
        const currentTime = Date.now();
        fs.writeFileSync(LAST_UPDATE_PATH, JSON.stringify({ timestamp: currentTime }, null, 2));

    } catch (error) {
        console.error('❌ Failed to update languages.json:', error);
    }
}

module.exports = { updateLanguagesJSON, LANGUAGES_JSON_PATH };
