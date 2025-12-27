# Changesets

This folder manages versioning and changelogs for the Dysporium SDK packages.

## Quick Start

### 1. Create a Changeset (after making changes)

```bash
pnpm changeset
```

You'll be prompted to:
- Select which packages were affected (`@dysporium-sdk/core`, `@dysporium-sdk/provider`, `@dysporium-sdk/openai`, `@dysporium-sdk/anthropic`, `@dysporium-sdk/qwen`, `@dysporium-sdk/utils`)
- **Select which packages should have a MAJOR bump** (this is a multi-select prompt)
  - **Press Space** to select/deselect packages for major bumps
  - **Press Enter** when done (you can select none, some, or all)
  - If you don't select any packages for major, you'll be asked about minor vs patch next
- If no major bumps were selected, choose between `patch` or `minor` for the remaining packages
- Write a summary describing the change

**Important:** The prompt "Which packages should have a major bump?" is asking you to SELECT packages that need major bumps. If you want patch or minor, press Space to DESELECT all packages, then press Enter. You'll then be asked about minor vs patch.

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

### Choosing the Right Bump Type

- **patch** (x.0.1): Bug fixes, small non-breaking changes
- **minor** (x.1.0): New features, backward-compatible changes
- **major** (1.0.0): Breaking changes that require users to update their code

**Note:** When packages are linked, selecting "major" for any package will bump all packages to major. Only use major for actual breaking changes.

## Documentation

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Common Questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
