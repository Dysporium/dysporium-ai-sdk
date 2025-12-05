# Dysporium SDK Documentation

This is the documentation site for Dysporium SDK, built with [Mintlify](https://mintlify.com).

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The docs will be available at `http://localhost:3000` (or the port Mintlify assigns).

### Building

Build the documentation site:

```bash
pnpm build
```

## Project Structure

```
apps/docs/
├── mint.json          # Mintlify configuration
├── getting-started.mdx # Getting started page
├── installation.mdx   # Installation guide
├── quickstart.mdx     # Quickstart tutorial
├── concepts/          # Core concepts
├── guides/            # How-to guides
├── examples/          # Code examples
└── api-reference/    # API documentation
```

## Documentation Structure

- **Get Started** - Installation and quickstart guides
- **Core Concepts** - Architecture and design principles
- **API Reference** - Complete API documentation
- **Guides** - Step-by-step tutorials
- **Examples** - Real-world code examples

## Adding Content

1. Create a new `.mdx` file in the appropriate directory
2. Add frontmatter with `title` and `description`
3. Update `mint.json` navigation to include the new page
4. Use Mintlify components like `<Card>`, `<Accordion>`, etc.

## API Reference Generation

The API reference is configured to auto-generate from TypeScript source code. Update the `api` section in `mint.json` to configure which packages to document.

## Deployment

Mintlify can be deployed to:
- Mintlify Cloud (recommended)
- Vercel
- Netlify
- Any static hosting

See [Mintlify Deployment Docs](https://mintlify.com/docs/deployment) for details.

