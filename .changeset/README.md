# Changesets

This folder manages versioning and changelogs for the Dysporium SDK packages.

## Quick Start

### 1. Create a Changeset (after making changes)

```bash
pnpm changeset
```

You'll be prompted to:
- Select which packages were affected (`@dysporium-sdk/core`, `@dysporium-sdk/provider`, `@dysporium-sdk/openai`, `@dysporium-sdk/anthropic`, `@dysporium-sdk/qwen`)
- Choose the semver bump type: `patch`, `minor`, or `major`
- Write a summary describing the change

This creates a markdown file in `.changeset/` describing your change.

### 2. Version Packages (before releasing)

```bash
pnpm changeset:version
```

This consumes all changeset files and:
- Bumps package versions in `package.json` files
- Updates `CHANGELOG.md` files
- Removes the consumed changeset files

### 3. Publish to npm

```bash
pnpm release
```

This builds all packages and publishes them to npm. The release script:
1. Builds all packages
2. Updates versions using changesets
3. Resolves `workspace:*` dependencies to actual versions (enables pnpm/npm installation)
4. Publishes to npm registry
5. Restores `workspace:*` dependencies for local development

**Note:** The packages are published to npm and can be installed using either `pnpm` or `npm`:
```bash
pnpm add @dysporium-sdk/core @dysporium-sdk/openai
# or
npm install @dysporium-sdk/core @dysporium-sdk/openai
```

## Configuration

Our packages are **linked** - when one package gets a version bump, all packages bump together. This ensures consistent versioning across the SDK.

## Documentation

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Common Questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
