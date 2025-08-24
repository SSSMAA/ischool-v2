module.exports = {
  apps: [{
    name: 'ischool-dev',
    script: 'npm',
    args: 'run dev',
    cwd: '/home/user/webapp',
    watch: false,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    error_file: '/home/user/webapp/logs/err.log',
    out_file: '/home/user/webapp/logs/out.log',
    log_file: '/home/user/webapp/logs/combined.log',
    time: true
  }]
}