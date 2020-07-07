# Releasing

1. Add release notes (`notes/<version>.markdown`)
1. Update top-level `CHANGELOG.md`
1. Update top-level `README.md`
1. Update `CSW_VERSION` number in `.github/workflow/release.yml` file which points to latest compatible version
1. Update `version` number in `lib/package.json`
1. Check if `dev` pipeline is green
1. Check keycloak version of `csw` and `lib` is same
1. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment varibale needs to be set before running `release.sh`
