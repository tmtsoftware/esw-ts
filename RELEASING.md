# Releasing

1. Create a branch named `branch-<major>.<minor>.x` if not already exists from `master`. Example branch name `branch-3.0.x`.
   All subsequent release for this release cycle should be done on this branch. All further steps are to be done on this branch.
1. Add release notes (`notes/<version>.markdown`)
1. Update top-level `CHANGELOG.md`
1. Update top-level `README.md`
1. Update `sbt-docs` version in `plugins.sbt`
1. Update `CSW_VERSION`, `ESW_VERSION` in `.github/workflows/release.yml`
1. Update `embedded-keycloak`, `csw`, `rtm` and `esw` version in `Libs.scala`
1. Update `version` number in `package.json`
1. Update CSW and ESW versions in `integration/utils/shell.ts` and in osw-apps repo
1. Update osw-apps branch name in rtm.sh, scripts/appLauncher.sh
1. Update `<****>` with the version in `release.yml` "NPM publish" step.
    Example: If you are publishing `1.0.0`
            Replace `<****>` with the corresponding tag i.e v1.0.0.
1. Run script `./copyright.sh` in root folder to add copyright header if missing in source & test files.
1. Commit and push the changes to `branch-<major>.<minor>.x` branch. Ensure that pipeline is green for dev and paradox link check.
1. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment variable needs to be set before running `release.sh`
    Example for release 0.4.1-RC1: `PROD=true ./release.sh v0.4.1-RC1`

After release pipeline is green:

1. Verify ESW-TS is published on npm registry successfully with the expected version.
2. Update example app package.json with latest version of esw-ts.
3. Run `npm install` in example app & push `package-lock.json` & `package.json` to repo.
4. Merge this release branch to master.
