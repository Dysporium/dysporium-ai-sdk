#!/usr/bin/env node

/**
 * Restores workspace:* dependencies after publishing
 * This reverts the resolved versions back to workspace:* for local development
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

function getPackageNames(dir) {
  const names = new Set();
  if (!fs.existsSync(dir)) return names;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const packagePath = path.join(dir, entry.name, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (pkg.name) {
          names.add(pkg.name);
        }
      }
    }
  }
  return names;
}

function restorePackageJson(filePath, packageNames) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let modified = false;
  
  const restoreDeps = (deps) => {
    if (!deps) return;
    for (const [name, version] of Object.entries(deps)) {
      // Check if it's a workspace package and has a version range (like ^1.0.0)
      if (packageNames.has(name) && typeof version === 'string' && version.startsWith('^')) {
        deps[name] = 'workspace:*';
        modified = true;
      }
    }
  };
  
  restoreDeps(pkg.dependencies);
  restoreDeps(pkg.peerDependencies);
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✓ Restored workspace dependencies in ${path.relative(workspaceRoot, filePath)}`);
    return true;
  }
  return false;
}

const packageNames = getPackageNames(packagesDir);

if (packageNames.size === 0) {
  console.warn('No packages found to restore dependencies for');
  process.exit(0);
}

let restoredCount = 0;

function processPackages(dir) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const packagePath = path.join(dir, entry.name, 'package.json');
      if (fs.existsSync(packagePath)) {
        if (restorePackageJson(packagePath, packageNames)) {
          restoredCount++;
        }
      }
    }
  }
}

processPackages(packagesDir);

if (restoredCount > 0) {
  console.log(`\n✓ Restored workspace dependencies in ${restoredCount} package(s)`);
} else {
  console.log('No dependencies found to restore');
}
