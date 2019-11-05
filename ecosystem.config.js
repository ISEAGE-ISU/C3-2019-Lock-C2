module.exports = {
  apps : [{
    name: 'C2',
    script: 'bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      // host : '',
      ref  : 'origin/master',
      repo : 'git@git.iseage.org:ISEAGE/ccdc_2019/lock-c2.git',
      path : '/srv/lock-c2',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
