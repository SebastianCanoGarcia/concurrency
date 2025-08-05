// concurrency.js

// Simulate fetch if running in Node.js without fetch available
if (typeof fetch === 'undefined') {
  global.fetch = async function (url) {
    return {
      text: async () => `Response for ${url}`,
    };
  };
}

/**
 * Runs multiple fetches with controlled max concurrency.
 * @param {string[]} urls - Array of URLs.
 * @param {number} maxConcurrency - Max number of concurrent fetches.
 * @returns {Promise<string[]>} - Array of responses in the original order.
 */
async function fetchWithConcurrency(urls, maxConcurrency) {
  const results = new Array(urls.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < urls.length) {
      const index = currentIndex++;
      try {
        const res = await fetch(urls[index]);
        results[index] = await res.text();
      } catch (e) {
        results[index] = null;
      }
    }
  }

  const workers = Array.from(
    { length: Math.min(maxConcurrency, urls.length) },
    () => worker()
  );

  await Promise.all(workers);
  return results;
}

module.exports = { fetchWithConcurrency };
