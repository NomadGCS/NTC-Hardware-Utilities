const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        loadingGif: './nomad_logo.gif'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        port: 7000, // so we dont interfere with ntc web server
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/webapps/default/index.html',
              js: './src/webapps/default/renderer.js',
              name: 'default',
              preload: {
                js: './src/webapps/default/preload.js',
              },
            },
            {
              html: './src/webapps/interlockMapper/index.html',
              js: './src/webapps/interlockMapper/renderer.js',
              name: 'interlock_mapper',
              preload: {
                js: './src/webapps/interlockMapper/preload.js',
              },
            },
            {
              html: './src/webapps/configBuilder/index.html',
              js: './src/webapps/configBuilder/renderer.js',
              name: 'config_builder',
              preload: {
                js: './src/webapps/configBuilder/preload.js',
              },
            },
          ],
        },
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
