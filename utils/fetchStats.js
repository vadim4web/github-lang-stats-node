const axios = require('axios');
require('dotenv').config();

const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;
const GITHUB_API_URL = 'https://api.github.com';

const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
};

async function fetchUserRepos(username) {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, { headers });
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching repositories:', error);
        return [];
    }
}

async function fetchLanguageStats(username) {
    const repos = await fetchUserRepos(username);
    const stats = {};

    for (const repo of repos) {
        const langResponse = await axios.get(repo.languages_url, { headers });
        for (const [lang, bytes] of Object.entries(langResponse.data)) {
            stats[lang] = (stats[lang] || 0) + bytes;
        }
    }

    return stats;
}

module.exports = { fetchLanguageStats };
