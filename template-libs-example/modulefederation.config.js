const {moduleFederationConfig} = require('@kne/modules-dev');
const env = require('@kne/modules-dev/lib/env');

/**
 * 如果当前package被包含在 moduleFederationConfig.shared中请打开该段代码的注释
 * */

const shared = Object.assign({}, moduleFederationConfig.shared);
delete shared["@kne/react-form"];

module.exports = Object.assign({}, moduleFederationConfig, {
    exposes: {
        './components': env.manifestPath
    }, shared
});
