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
        PORT: "3060",
        DB_PATH: "/var/www/calamo-landing/api/beta-signups.db",
        ALLOWED_ORIGINS: "https://calamo.vibecanyon.com",
        // SMTP via Aruba (vedi /var/www/vibecanyon/.env per riferimento).
        // Le credenziali NON sono committate qui: PM2 le legge dal file
        // /var/www/calamo-landing/api/.env, vedi server.cjs comment.
        SMTP_HOST: "smtps.aruba.it",
        SMTP_PORT: "465",
        SMTP_USER: "info@vibecanyon.com",
        // SMTP_PASS: settata via /var/www/calamo-landing/api/.env (non in git)
        SMTP_FROM: '"Calamo" <info@vibecanyon.com>',
        NOTIFICATION_TO: "info@vibecanyon.com",
      },
      max_memory_restart: "200M",
      autorestart: true,
      watch: false,
      time: true,
    },
  ],
};
