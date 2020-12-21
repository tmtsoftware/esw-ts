module.exports = {
  "buildOptions": {
    "clean": true,
    "sourceMaps": false
  },
  "mount": {
    "public": "/",
    "src": "/_dist_",
    "test": "/_dist2_"
  },
  "plugins": [
    ["@snowpack/plugin-typescript"]
  ],
  "installOptions": {
    "polyfillNode": true
  }
}
