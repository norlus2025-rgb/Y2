module.exports = {
  plugins: {
    autoprefixer: {},
  },
};

// Conditionally add tailwindcss only if it's available
try {
  module.exports.plugins.tailwindcss = {};
} catch (e) {
  // tailwindcss not available, skip
}
