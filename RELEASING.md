# Releasing

1. Add release notes (`notes/<version>.markdown`)
2. Update top-level `CHANGELOG.md`
3. Update top-level `README.md`
4. Update `CSW_VERSION`, `ESW_VERSION` in `.github/workflow/release.yml` & Libs file which points to the latest compatible version
4. Update `ESW_UI_TEMPLATE_VERSION` in `.github/workflow/release.yml` to the latest compatible version
6. Update `version` number in `lib/package.json`
7. Check if `dev` pipeline is green
8. Update CSW and ESW versions in `shell.ts`
9. Update `embedded-keycloak` version in `Libs.scala`
10. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment variable needs to be set before running `release.sh`
11. Verify ESW-TS is published on npm registry successfully with the expected version.
