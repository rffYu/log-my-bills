const fs = require('fs');
const path = require('path');

const input = process.argv[2] || './mock/mockStorage.json';
const output = path.resolve(__dirname, '../.runtime-mock-storage.json');

try {
  const mock = fs.readFileSync(input, 'utf-8');
  fs.writeFileSync(output, mock);
  console.log(`✅ Injected mock storage data to ${output}`);
} catch (err) {
  console.error('❌ Failed to inject mock storage data:', err);
}

