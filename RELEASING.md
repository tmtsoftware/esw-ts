# Releasing

1. Add release notes (`notes/<version>.markdown`)
2. Update top-level `CHANGELOG.md`
3. Update top-level `README.md`
4. Update `CSW_VERSION` number in `.github/workflow/release.yml` file which points to latest compatible version
5. Update `version` number in `lib/package.json`
6. Check if `dev` pipeline is green
7. Check keycloak version of `csw` and `lib` is same
8. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment varibale needs to be set before running `release.sh`
