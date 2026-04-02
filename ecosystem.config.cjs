// ecosystem.config.cjs
// PM2 configuration for Hostinger VPS
module.exports = {
  apps: [
    {
      name: 'cavalcantemelo',
      script: '.next/standalone/server.js',
      cwd: '/var/www/cavalcantemelo',
      instances: 2, // Match vCPU count
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
      // Logs
      error_file: '/var/log/cavalcantemelo/error.log',
      out_file: '/var/log/cavalcantemelo/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // Restart policy
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 5000,
      // Graceful
      kill_timeout: 5000,
      listen_timeout: 10000,
      wait_ready: true,
    },
  ],
}
