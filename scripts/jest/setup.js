const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Make Enzyme functions available in all test files without importing.
Enzyme.configure({adapter: new Adapter()});
