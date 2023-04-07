const path = require('path');

module.exports = {
    STATIC_PATH: path.resolve(__dirname, '..', 'public'),
    PORT: ProcessingInstruction.env.PORT || 5000
}