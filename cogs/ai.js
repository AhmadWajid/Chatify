async function ai(msg) {
  const fetch = await import('node-fetch').then(mod => mod.default);
  // Your code using fetch goes here
  return "your AI Function";
}

module.exports = { ai };
