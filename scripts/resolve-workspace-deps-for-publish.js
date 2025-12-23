#!/usr/bin/env node

/**
 * Resolves workspace:* dependencies to actual version numbers for publishing
 * This ensures packages can be installed via pnpm/npm after publishing
 */

const fs = require('fs');
const path = require('path');

function findWorkspaceRoot() {
  let current = path.resolve(__dirname, '..');
  
  while (current !== path.dirname(current)) {
    const packageJson = path.join(current, 'package.json');
    const pnpmWorkspace = path.join(current, 'pnpm-workspace.yaml');
    if (fs.existsSync(packageJson) && fs.existsSync(pnpmWorkspace)) {
      return current;
    }
    current = path.dirname(current);
  }
  
  throw new Error('Could not find workspace root');
}

const workspaceRoot = findWorkspaceRoot();
const packagesDir = path.join(workspaceRoot, 'packages');

function getPackageVersions(dir) {
  const versions = {};
  if (!fs.existsSync(dir)) return versions;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const packagePath = path.join(dir, entry.name, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (pkg.name && pkg.version) {
          versions[pkg.name] = pkg.version;
        }
      }
    }
  }
  return versions;
}

function resolvePackageJson(filePath, packageVersions) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let modified = false;
  
  const resolveDeps = (deps) => {
    if (!deps) return;
    for (const [name, version] of Object.entries(deps)) {
      if (version === 'workspace:*' && packageVersions[name]) {
        // Use caret range to allow patch updates
        deps[name] = `^${packageVersions[name]}`;
        modified = true;
      }
    }
  };
  
  resolveDeps(pkg.dependencies);
  resolveDeps(pkg.peerDependencies);
  // Don't modify devDependencies as they're not published
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✓ Resolved workspace dependencies in ${path.relative(workspaceRoot, filePath)}`);
    return true;
  }
  return false;
}

const packageVersions = getPackageVersions(packagesDir);

if (Object.keys(packageVersions).length === 0) {
  console.warn('No packages found to resolve dependencies for');
  process.exit(0);
}

let resolvedCount = 0;

function processPackages(dir) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const packagePath = path.join(dir, entry.name, 'package.json');
      if (fs.existsSync(packagePath)) {
        if (resolvePackageJson(packagePath, packageVersions)) {
          resolvedCount++;
        }
      }
    }
  }
}

processPackages(packagesDir);

if (resolvedCount > 0) {
  console.log(`\n✓ Resolved workspace dependencies in ${resolvedCount} package(s)`);
  console.log('  Packages are now ready for publishing and can be installed via pnpm/npm');
} else {
  console.log('No workspace dependencies found to resolve');
}
