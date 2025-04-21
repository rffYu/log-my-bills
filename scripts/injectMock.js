const fs = require('fs');
const path = require('path');

const input = process.argv[2] || './mock/mockState.json';
const output = path.resolve(__dirname, '../.runtime-mock.json');

try {
  const mock = fs.readFileSync(input, 'utf-8');
  fs.writeFileSync(output, mock);
  console.log(`✅ Injected mock data to ${output}`);
} catch (err) {
  console.error('❌ Failed to inject mock data:', err);
}

