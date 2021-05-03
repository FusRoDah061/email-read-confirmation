module.exports = {
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators",
    { "legacy": true }
  ],
  presets: [
    [
      "babel-preset-gatsby",
      {
        "targets": {
          "browsers": [">0.25%", "not dead"]
        }
      }
    ]
  ]
};
