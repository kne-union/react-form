const { moduleFederationConfig } = require('@kne/modules-dev');
const { manifestPath } = require('@kne/modules-dev/lib/env');

const shared = Object.assign({}, moduleFederationConfig.shared);

delete shared['@kne/react-form'];

module.exports = Object.assign({}, moduleFederationConfig, {
  exposes: {
    './components': manifestPath
  }, shared
});
