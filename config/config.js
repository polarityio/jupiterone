module.exports = {
  name: 'jupiterOne',
  acronym: 'JPO',
  description: '',
  entityTypes: ['*'],
  customTypes: [
    // {
    //   key: 'username',
    //   regex: /[a-zA-Z0-9_-]{3,20}/
    // },
    {
      key: 'email',
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }
  ],
  styles: ['./styles/styles.less'],
  defaultColor: 'light-blue',
  block: {
    component: {
      file: './components/block.js'
    },
    template: {
      file: './templates/block.hbs'
    }
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: '',
    rejectUnauthorized: true
  },
  logging: {
    level: 'trace' //trace, debug, info, warn, error, fatal
  },
  options: [
    {
      key: 'url',
      name: 'Jupiter One API URL',
      description: 'URL for Jupiter One API.',
      default: 'https://api.us.jupiterone.io',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'accountId',
      name: 'Account ID',
      description: '',
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'accessToken',
      name: 'Access Token',
      description: '',
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
