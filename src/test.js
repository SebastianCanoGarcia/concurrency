const { runWithConcurrency } = require('./concurrency');

/**
 * Simulates a test for the concurrency function with async tasks.
 */
async function runTest() {
  const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
  const maxConcurrency = 2;

  // Simulated async tasks with randomized latency
  const tasks = urls.map(url => {
    return async () => {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
      return `Response for ${url}`;
    };
  });

  const expected = urls.map(url => `Response for ${url}`);
  const result = await runWithConcurrency(tasks, maxConcurrency);

  const passed = JSON.stringify(result) === JSON.stringify(expected);

  if (passed) {
    console.log('✅ Test passed');
  } else {
    console.error('❌ Test failed');
    console.log('Expected:', expected);
    console.log('Received:', result);
  }
}

// Run the test if this script is executed directly
if (require.main === module) {
  runTest();
}
