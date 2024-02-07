const { CracoLibsExamplePlugin, env } = require('@kne/modules-dev');
const aliasConfig = require('./webstorm.webpack.config');

module.exports = {
  webpack: {
    alias: aliasConfig.resolve.alias, configure: (webpackConfig) => {
      const definePlugin = webpackConfig.plugins.find((plugin) => plugin.constructor.name === 'DefinePlugin');
      Object.assign(definePlugin.definitions['process.env'], {});
      return webpackConfig;
    }
  }, plugins: [{
    plugin: CracoLibsExamplePlugin, options: {
      middleware: (moduleFederationConfig) => {
        const shared = Object.assign({}, moduleFederationConfig.shared);
        delete shared['@kne/react-form'];
        return Object.assign({}, moduleFederationConfig, {
          exposes: {
            './components': env.manifestPath
          }, shared
        });
      }
    }
  }]
};
