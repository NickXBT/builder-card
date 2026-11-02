/**
 * GitHub API Service Helper
 * 
 * Encapsulates all interactions with the GitHub REST API.
 */

const BASE_URL = 'https://api.github.com';

/**
 * Sanitizes user input so that raw usernames, @usernames, or full URLs
 * like https://github.com/NickXBT resolve cleanly to the valid username!
 */
export function cleanUsername(input) {
  if (!input) return '';
  let cleaned = input.trim();
  // Strip protocols and domain if present
  cleaned = cleaned.replace(/^https?:\/\/(www\.)?github\.com\//i, '');
  cleaned = cleaned.replace(/^github\.com\//i, '');
  // Strip leading @
  cleaned = cleaned.replace(/^@+/, '');
  // Strip trailing slashes or subpaths (e.g., username/repo -> username)
  cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0].trim();
  return cleaned;
}

/**
 * Helper to handle HTTP response status codes and throw descriptive errors.
 */
async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  }

  // Handle specific HTTP status codes
  if (response.status === 404) {
    throw new Error('User not found. Please double-check the GitHub username.');
  }

  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
    if (rateLimitRemaining === '0') {
      const resetTime = response.headers.get('x-ratelimit-reset');
      const resetDate = resetTime ? new Date(resetTime * 1000).toLocaleTimeString() : 'shortly';
      throw new Error(`GitHub API rate limit reached (60 requests/hr). Limit resets at ${resetDate}.`);
    }
    throw new Error('Access forbidden by GitHub API. You may have hit the hourly rate limit.');
  }

  throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
}

/**
 * Fetches user profile data.
 */
export async function fetchUserProfile(username) {
  const sanitized = cleanUsername(username);
  if (!sanitized) throw new Error('Please enter a valid GitHub username.');

  const cleanQuery = encodeURIComponent(sanitized);
  const response = await fetch(`${BASE_URL}/users/${cleanQuery}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return await handleResponse(response);
}

/**
 * Fetches user's public repositories (up to 100, sorted by updated).
 */
export async function fetchUserRepos(username) {
  const sanitized = cleanUsername(username);
  const cleanQuery = encodeURIComponent(sanitized);
  const response = await fetch(`${BASE_URL}/users/${cleanQuery}/repos?sort=updated&per_page=100`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return await handleResponse(response);
}

/**
 * Fetches user's public events (latest 10).
 */
export async function fetchUserEvents(username) {
  const sanitized = cleanUsername(username);
  const cleanQuery = encodeURIComponent(sanitized);
  const response = await fetch(`${BASE_URL}/users/${cleanQuery}/events/public?per_page=10`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return await handleResponse(response);
}

/**
 * Calculates language distribution statistics based on repository primary languages.
 */
export function calculateLanguageStats(repos) {
  if (!repos || repos.length === 0) {
    return [];
  }

  const counts = {};
  let totalWithLanguage = 0;

  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      totalWithLanguage += 1;
    }
  });

  if (totalWithLanguage === 0) {
    return [];
  }

  const languageList = Object.keys(counts).map((lang) => {
    const count = counts[lang];
    const percentage = ((count / totalWithLanguage) * 100).toFixed(1);
    return {
      name: lang,
      count,
      percentage: parseFloat(percentage),
      color: getLanguageColor(lang),
    };
  });

  languageList.sort((a, b) => b.count - a.count);
  return languageList.slice(0, 5);
}

/**
 * Language colors aligned with GitHub's language syntax coloring
 */
export function getLanguageColor(language) {
  const colors = {
    JavaScript: '#F1E05A',
    TypeScript: '#3178C6',
    Python: '#3572A5',
    HTML: '#E34C26',
    CSS: '#563D7C',
    Java: '#B07219',
    'C++': '#F34B7D',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#DEA584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89E051',
    Vue: '#41B883',
    Svelte: '#FF3E00',
    R: '#198CE7',
    Jupyter: '#DA5B0B',
  };

  return colors[language] || '#94A3B8';
}
