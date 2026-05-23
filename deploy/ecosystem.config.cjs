// PM2 ecosystem per il microservizio API beta.
// Deploy:
//   cd /var/www/calamo-landing/api
//   pm2 start /var/www/calamo-landing/deploy/ecosystem.config.cjs
//   pm2 save
//   pm2 startup    # configura systemd autoload

module.exports = {
  apps: [
    {
      name: "calamo-api",
      cwd: "/var/www/calamo-landing/api",
      script: "server.cjs",
      env: {
        NODE_ENV: "production",
        PORT: "3050",
        DB_PATH: "/var/www/calamo-landing/api/beta-signups.db",
        ALLOWED_ORIGINS: "https://calamo.vibecanyon.com",
      },
      max_memory_restart: "200M",
      autorestart: true,
      watch: false,
      time: true,
    },
  ],
};
