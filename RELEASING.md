# Releasing

1. Add release notes (`notes/<version>.markdown`)
2. Update top-level `CHANGELOG.md`
3. Update top-level `README.md`
4. Update `CSW_VERSION` number in `.github/workflow/release.yml` & Libs file which points to latest compatible version
5. Update `ESW_VERSION` number in `.github/workflow/release.yml` & Libs file which points to latest compatible version
6. Update `version` number in `lib/package.json`
7. Check if `dev` pipeline is green
8. Update csw and esw versions in `shell.ts`
9. Update `embedded-keycloak` version in `Libs.scala`
10. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment variable needs to be set before running `release.sh`
11. Verify esw-ts is publised on npm registry successfully with expected version.
