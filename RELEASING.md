# Releasing

1. Add release notes (`notes/<version>.markdown`)
2. Update top-level `CHANGELOG.md`
3. Update top-level `README.md`
4. Update `CSW_VERSION` number in `.github/workflow/release.yml` file which points to latest compatible version
5. Update `version` number in `lib/package.json`
6. Check if `dev` pipeline is green
7. Update csw and esw versions in `shell.ts`
8. Update `embedded-keycloak` version in `Libs.scala`
9. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment variable needs to be set before running `release.sh`
10. Verify esw-ts is publised on npm registry successfully with expected version.
