#!/usr/bin/env node

/**
 * Converts pnpm workspace:* protocol to npm-compatible file: protocol
 * This script is needed because npm doesn't support workspace:* protocol
 */

const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const packagesDir = path.join(workspaceRoot, 'packages');
const appsDir = path.join(workspaceRoot, 'apps');

function getPackagePaths(dir) {
  const packages = {};
  if (!fs.existsSync(dir)) return packages;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const packagePath = path.join(dir, entry.name, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (pkg.name) {
          packages[pkg.name] = path.dirname(packagePath);
        }
      }
    }
  }
  return packages;
}

function fixPackageJson(filePath, packagePaths) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const currentDir = path.dirname(filePath);
  let modified = false;
  
  const fixDeps = (deps) => {
    if (!deps) return;
    for (const [name, version] of Object.entries(deps)) {
      if (version === 'workspace:*' && packagePaths[name]) {
        const relativePath = path.relative(currentDir, packagePaths[name]);
        const normalizedPath = relativePath.split(path.sep).join('/');
        deps[name] = `file:${normalizedPath}`;
        modified = true;
      }
    }
  };
  
  fixDeps(pkg.dependencies);
  fixDeps(pkg.devDependencies);
  fixDeps(pkg.peerDependencies);
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`Fixed workspace dependencies in ${path.relative(workspaceRoot, filePath)}`);
  }
}

const packagePaths = {
  ...getPackagePaths(packagesDir),
  ...getPackagePaths(appsDir)
};

function fixAllPackages(dir) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const packagePath = path.join(dir, entry.name, 'package.json');
      if (fs.existsSync(packagePath)) {
        fixPackageJson(packagePath, packagePaths);
      }
    }
  }
}

fixAllPackages(packagesDir);
fixAllPackages(appsDir);

const rootPackagePath = path.join(workspaceRoot, 'package.json');
if (fs.existsSync(rootPackagePath)) {
  fixPackageJson(rootPackagePath, packagePaths);
}

console.log('Workspace dependencies converted to file: protocol');

