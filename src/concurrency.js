/**
 * Executes an array of asynchronous tasks with controlled maximum concurrency.
 * @param {Function[]} tasks - Array of async functions (each returns a Promise).
 * @param {number} maxConcurrency - Maximum number of tasks running simultaneously.
 * @returns {Promise<any[]>} - Resolves to an array of results in original task order.
 */
async function runWithConcurrency(tasks, maxConcurrency) {
  const results = new Array(tasks.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < tasks.length) {
      const index = currentIndex++;
      try {
        results[index] = await tasks[index]();
      } catch (error) {
        results[index] = null;
      }
    }
  }

  const workers = Array.from(
    { length: Math.min(maxConcurrency, tasks.length) },
    () => worker()
  );

  await Promise.all(workers);
  return results;
}

module.exports = { runWithConcurrency };
