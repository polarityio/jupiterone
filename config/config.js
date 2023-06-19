module.exports = {
  name: 'jupiterOne',
  acronym: 'JPO',
  description: '',
  entityTypes: ['*'],
  customTypes: [
    {
      key: 'username',
      regex: /[a-zA-Z0-9_-]{3,20}/
    }
  ],
  defaultColor: 'light-blue',
  styles: ['./client/styles.less'],
  block: {
    component: {
      file: './client/block.js'
    },
    template: {
      file: './client/block.hbs'
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
      key: 'instanceId',
      name: 'Instance ID',
      description: 'The Instance ID found in your JupiterOne instances URL (https://<instanceID>.apps.us.jupiterone.io/).',
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'accountId',
      name: 'Account ID',
      description: '',
      default: '',
      type: 'text',
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
    },
    {
      key: 'searchAssetTypes',
      name: 'Search Asset Types',
      description: 'A comma separated list Asset Class Types you want to search.  These can found on this page "https:/<instanceID>.apps.us.jupiterone.io/assets/inventory"',
      default: 'Host, User, Finding, Record',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
