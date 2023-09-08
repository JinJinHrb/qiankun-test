const deps = require('../package.json').dependencies;


function genSharedConfig(dependencies) {
	return Object.keys(dependencies).reduce(
		(config, depKey) => ({
			...config,
			[depKey]: {
				singleton: true,
				requiredVersion: dependencies[depKey],
			},
		}),
		{},
	)
}

/** @type {() => ConstructorParameters<typeof import('webpack').container.ModuleFederationPlugin>[0]} */
module.exports = () => {
  return {
    name: 'app2_entry',
    filename: 'app2-entry-file',
    library: {
      type: 'umd',
      name: 'app2_entry',
    },
    // remotes: {
    //   app1: 'app1_entry@http://localhost:3002/app1-entry-file'
    // },
    exposes: {
      './Button': './src/components/Button.tsx',
    },
    shared: {
      // ...genSharedConfig(deps),
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