module.exports = {
  name: 'JupiterOne',
  acronym: 'J1',
  description: 'Search all standard Asset Types in JupiterOne',
  entityTypes: [
    'IPv4',
    'IPv4CIDR',
    'IPv6',
    'domain',
    'url',
    'MD5',
    'SHA1',
    'SHA256',
    'email',
    'cve',
    'MAC',
    'string'
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
    proxy: ''
  },
  logging: {
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  options: [
    {
      key: 'instanceId',
      name: 'Instance ID',
      description:
        "The Instance ID found in your JupiterOne instance's URL (https://<instanceID>.apps.us.jupiterone.io/).",
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'accountId',
      name: 'Account ID',
      description: 'Your JupiterOne Account ID found in Settings -> Profiles',
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'accessToken',
      name: 'Access Token',
      description: 'Your JupiterOne Access Token found in Settings -> User API Tokens',
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'searchAssetTypes',
      name: 'Search Asset Types',
      description:
        'The Asset Class Types you want to search.  Example results can be found at "https:/<instanceID>.apps.us.jupiterone.io/assets/inventory"',
      default: [
        {
          value: 'Host',
          display: 'Host'
        },
        {
          value: 'User',
          display: 'User'
        },
        {
          value: 'Finding',
          display: 'Finding'
        },
        {
          value: 'Record',
          display: 'Record'
        }
      ],
      type: 'select',
      options: [
        {
          value: 'Configuration',
          display: 'Configuration'
        },
        {
          value: 'ControlPolicy',
          display: 'ControlPolicy'
        },
        {
          value: 'Question',
          display: 'Question'
        },
        {
          value: 'Record',
          display: 'Record'
        },
        {
          value: 'Resource',
          display: 'Resource'
        },
        {
          value: 'Rule',
          display: 'Rule'
        },
        {
          value: 'Finding',
          display: 'Finding'
        },
        {
          value: 'Monitor',
          display: 'Monitor'
        },
        {
          value: 'Document',
          display: 'Document'
        },
        {
          value: 'Policy',
          display: 'Policy'
        },
        {
          value: 'Organization',
          display: 'Organization'
        },
        {
          value: 'Person',
          display: 'Person'
        },
        {
          value: 'Root',
          display: 'Root'
        },
        {
          value: 'Vendor',
          display: 'Vendor'
        },
        {
          value: 'Domain',
          display: 'Domain'
        },
        {
          value: 'DomainRecord',
          display: 'DomainRecord'
        },
        {
          value: 'DomainZone',
          display: 'DomainZone'
        },
        {
          value: 'Firewall',
          display: 'Firewall'
        },
        {
          value: 'Gateway',
          display: 'Gateway'
        },
        {
          value: 'Internet',
          display: 'Internet'
        },
        {
          value: 'IpAddress',
          display: 'IpAddress'
        },
        {
          value: 'Network',
          display: 'Network'
        },
        {
          value: 'NetworkEndpoint',
          display: 'NetworkEndpoint'
        },
        {
          value: 'NetworkInterface',
          display: 'NetworkInterface'
        },
        {
          value: 'AccessKey',
          display: 'AccessKey'
        },
        {
          value: 'AccessPolicy',
          display: 'AccessPolicy'
        },
        {
          value: 'AccessRole',
          display: 'AccessRole'
        },
        {
          value: 'Account',
          display: 'Account'
        },
        {
          value: 'Certificate',
          display: 'Certificate'
        },
        {
          value: 'CryptoKey',
          display: 'CryptoKey'
        },
        {
          value: 'Everyone',
          display: 'Everyone'
        },
        {
          value: 'Key',
          display: 'Key'
        },
        {
          value: 'PasswordPolicy',
          display: 'PasswordPolicy'
        },
        {
          value: 'Secret',
          display: 'Secret'
        },
        {
          value: 'User',
          display: 'User'
        },
        {
          value: 'UserGroup',
          display: 'UserGroup'
        },
        {
          value: 'Backup',
          display: 'Backup'
        },
        {
          value: 'Database',
          display: 'Database'
        },
        {
          value: 'DataStore',
          display: 'DataStore'
        },
        {
          value: 'Disk',
          display: 'Disk'
        },
        {
          value: 'Logs',
          display: 'Logs'
        },
        {
          value: 'Queue',
          display: 'Queue'
        },
        {
          value: 'Host',
          display: 'Host'
        },
        {
          value: 'HostAgent',
          display: 'HostAgent'
        },
        {
          value: 'Image',
          display: 'Image'
        },
        {
          value: 'Task',
          display: 'Task'
        },
        {
          value: 'Application',
          display: 'Application'
        },
        {
          value: 'ApplicationEndpoint',
          display: 'ApplicationEndpoint'
        },
        {
          value: 'Channel',
          display: 'Channel'
        },
        {
          value: 'Group',
          display: 'Group'
        },
        {
          value: 'Repository',
          display: 'Repository'
        },
        {
          value: 'Service',
          display: 'Service'
        },
        {
          value: 'Subscription',
          display: 'Subscription'
        }
      ],
      multiple: true,
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
