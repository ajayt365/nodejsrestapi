const devconfig = {
  MONGO_URL: 'mongodb://nodejs:nodejs1@ds113700.mlab.com:13700/noderestapi',
}

const testconfig = {
  MONGO_URL: 'mongodb://localhost/nodejsrestapi-test',
}

const prodconfig = {
  MONGO_URL: '',
}

const defaultconfig = {
  PORT: process.env.PORT || 3002,
}

function envConfig(env) {
  switch (env) {
    case 'development':
      return devconfig
    case 'test':
      return testconfig
    default:
      return prodconfig
  }
}

export default {
  ...defaultconfig,
  ...envConfig(process.env.NODE_ENV),
}
