// test.js

// Import the function from concurrency.js
const { fetchWithConcurrency } = require('./concurrency');

/**
 * Runs a test to check that fetchWithConcurrency works correctly.
 */
async function runTest() {
  const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
  const maxConcurrency = 2;

  // Expected simulated responses
  const expected = urls.map(url => `Response for ${url}`);

  // Run the function
  const result = await fetchWithConcurrency(urls, maxConcurrency);

  // Verify output
  const passed = JSON.stringify(result) === JSON.stringify(expected);

  if (passed) {
    console.log('✅ Test passed');
  } else {
    console.error('❌ Test failed');
    console.log('Expected:', expected);
    console.log('Received:', result);
  }
}

// Automatically run the test if executed directly
if (require.main === module) {
  runTest();
}
