# Releasing

1. Add release notes (`notes/<version>.markdown`)
1. Update top-level `CHANGELOG.md`
1. Update top-level `README.md`
1. Update `CSW_VERSION`, `ESW_VERSION` in `.github/workflow/release.yml` & Libs file which points to the latest compatible version
1. Update `embedded-keycloak` version in `Libs.scala`
1. Update `version` number in `lib/package.json`
1. Update CSW and ESW versions in `shell.ts`
1. Check if `dev` pipeline is green
1. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment variable needs to be set before running `release.sh`
1. Verify ESW-TS is published on npm registry successfully with the expected version.
