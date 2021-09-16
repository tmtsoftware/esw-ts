# Releasing

1. Create a branch named `branch-<major>.<minor>.x` if not already exists from `master`. Example branch name `branch-3.0.x`.
   All subsequent release for this release cycle should be done on this branch. All further steps are to be done on this branch.
1. Add release notes (`notes/<version>.markdown`)
1. Update top-level `CHANGELOG.md`
1. Update top-level `README.md`
1. Update `sbt-docs` version in `plugins.sbt`
1. Update `CSW_VERSION`, `ESW_VERSION` in `.github/workflow/release.yml` & Libs file which points to the latest compatible version
1. Update `embedded-keycloak`, `csw` and `esw` version in `Libs.scala`
1. Update `version` number in `package.json`
1. Update CSW and ESW versions in `shell.ts`
1. Update `<****>` with the version in `release.yml` NPM publish step.
    For ex: If you are publishing `1.0.0`
            Replace `<****>` with the corresponding tag i.e v1.0.0.
1. Commit and push the changes to `branch-<major>.<minor>.x` branch. Ensure that pipeline is green for dev and paradox link check.
1. Run `release.sh $VERSION$` script by providing version number argument (This triggers release workflow)
    Note: `PROD=true` environment variable needs to be set before running `release.sh`

After release pipeline is green:

1. Verify ESW-TS is published on npm registry successfully with the expected version.
1. Update the version back with `<****>` in `release.yml` NPM publish step on `branch-<major>.<minor>.x` branch.
1. Merge this release branch to master.
