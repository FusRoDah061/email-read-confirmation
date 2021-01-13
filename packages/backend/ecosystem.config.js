module.exports = {
  apps: [
    {
      name: 'email-visualization-notifier',
      script: './dist/server.js',
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
