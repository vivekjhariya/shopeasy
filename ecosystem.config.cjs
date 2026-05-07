const config = {
  apps: [{
    name: 'shopeasy-frontend',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

module.exports = config;