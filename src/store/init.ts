// store/init.ts
let preloadedState = {};

if (true) {
  try {
    const mock = require('../../.runtime-mock.json');
    preloadedState = mock;
    console.log('🧪 Loaded mock state');
  } catch (err) {
    console.warn('⚠️ No mock state injected');
  }
}

export default preloadedState;
