# Changesets

This folder manages versioning and changelogs for the Dysporium SDK packages.

## Quick Start

### 1. Create a Changeset (after making changes)

```bash
pnpm changeset
```

You'll be prompted to:
- Select which packages were affected (`@dysporium-sdk/core`, `@dysporium-sdk/openai`, `@dysporium-sdk/provider`)
- Choose the semver bump type: `patch`, `minor`, or `major`
- Write a summary describing the change

This creates a markdown file in `.changeset/` describing your change.

### 2. Version Packages (before releasing)

```bash
pnpm version
```

This consumes all changeset files and:
- Bumps package versions in `package.json` files
- Updates `CHANGELOG.md` files
- Removes the consumed changeset files

### 3. Publish to npm

```bash
pnpm release
```

This builds all packages and publishes them to npm.

## Configuration

Our packages are **linked** - when one package gets a version bump, all packages bump together. This ensures consistent versioning across the SDK.

## Documentation

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Common Questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
