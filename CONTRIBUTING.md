# Contributing to Vizinn

First off, thank you for considering contributing to Vizinn! It's people like you that make Vizinn such a great tool and learning opportunity.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Environment Setup](#development-environment-setup)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Conventions](#coding-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community](#community)

## Getting Started

First, make sure you have a GitHub account. Then, follow these steps:

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```
   git clone https://github.com/YOUR-USERNAME/vizinn.git
   cd vizinn
   ```
3. Create a branch for your feature or bugfix:
   ```
   git checkout -b feature/amazing-feature
   ```
4. Make your changes (see [Development Workflow](#development-workflow) below)
5. Commit your changes:
   ```
   git commit -m "Add some amazing feature"
   ```
6. Push to the branch:
   ```
   git push origin feature/amazing-feature
   ```
7. Create a new Pull Request

## Development Environment Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Python >= 3.13
- Poetry (for managing backend dependencies)

### Installation

```bash
# Install monorepo dependencies
pnpm install

# Install backend dependencies (Python)
cd packages/backend
poetry install
```

### Running the Development Environment

Start both the frontend and backend for development:

```bash
# Recommended way (separate terminals)
pnpm start

# Or use any of the alternative methods described in the README
```

## Development Workflow

1. **Choose an issue** to work on from our [issues list](https://github.com/adamsnows/vizinn/issues) or create a new issue if you've identified a bug or improvement
2. **Comment on the issue** to let others know you're working on it
3. **Create a branch** using a descriptive name related to the issue
4. **Develop your solution**, making commits as you go
5. **Write or update tests** if applicable
6. **Ensure all tests pass** locally
7. **Submit your PR** (see [Pull Request Process](#pull-request-process))

## Pull Request Process

1. Ensure your PR includes a clear description of the changes and the purpose
2. Update the README.md or documentation if needed
3. The PR should work for all targeted platforms
4. Make sure all tests pass
5. Include screenshots for UI changes if applicable
6. Reference the issue number in your PR description (e.g., "Fixes #123")

## Coding Conventions

### General

- Use meaningful, descriptive names for variables, functions, and classes
- Write self-documenting code where possible
- Include comments when complex logic needs explanation

### Frontend (React Native)

- Follow the component structure already in use in the project
- Use TypeScript types/interfaces properly
- Follow the styling approach used in the project (TailwindCSS/NativeWind)

### Backend (FastAPI/Python)

- Follow PEP 8 style guide
- Include type hints
- Write docstrings for public functions
- Create appropriate SQLAlchemy models and Pydantic schemas

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, indentation)
- `refactor:` Code changes that neither fix bugs nor add features
- `test:` Adding or updating tests
- `chore:` Changes to build process, auxiliary tools, libraries

Example: `feat(auth): add email verification flow`

## Community

Join our [Discord server](https://discord.gg/GkfDbTY6xu) to:
- Get help with your contribution
- Discuss project direction
- Connect with other contributors
- Share your ideas and feedback

## Recognition

All contributors will be:
- Added to our contributors list
- Given "contributor" role on Discord
- Acknowledged in release notes

## Thank You!

Your contributions to Vizinn are greatly appreciated. As an open source project, we rely on the community to make Vizinn better. Every contribution, from code to documentation to bug reports, makes a difference!
