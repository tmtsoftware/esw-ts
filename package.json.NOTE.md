# Notes

  * In example/package.json, set
```
    "@types/node": "20.5.9",
```

instead of newer version due to https://github.com/babel/babel/issues/15927

* Issue with old version of uuid not currently solvable using public dependencies.
  See https://github.com/keymetrics/pm2-io-apm/issues/285 (opencensus indirect dependency is EOL)

