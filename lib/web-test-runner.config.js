process.env.NODE_ENV = 'test'

const { importMapsPlugin } = require('@web/dev-server-import-maps')

module.exports = {
  plugins: [
    require('@snowpack/web-test-runner-plugin')(),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/_dist_/clients/location/LocationService.js': '/_dist2_/mocks/LocationService.js',
            '/_dist_/clients/location/LocationServiceImpl.js':
              '/_dist2_/mocks/LocationServiceImpl.js'
          }
        }
      }
    })
  ]
}
