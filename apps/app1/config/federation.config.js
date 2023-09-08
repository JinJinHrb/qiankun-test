const deps = require('../package.json').dependencies;

/** @type {() => ConstructorParameters<typeof import('webpack').container.ModuleFederationPlugin>[0]} */
module.exports = () => {
  return {
    name: 'app1',
    filename: 'app1-entry-file',
    library: {
      type: 'umd',
      name: 'app1_entry',
    },
    remoteType: 'script',
    remotes: {
      app2: 'app2_entry@http://localhost:3002/app2-entry-file',
      // app3: 'app2_entry@http://localhost:3003/app3-entry-file'
    },
    exposes: {
    },
    shared: {
      react: {
        singleton: true,
        // eager: true,
        requiredVersion: deps.react,
      },
      'react-dom': {
        singleton: true,
        // eager: true,
        requiredVersion: deps['react-dom']
      }
    }
  }
}