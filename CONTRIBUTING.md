# Contributing to Avatoon

Thanks for your interest in improving **Avatoon**! Contributions of all kinds are
welcome — bug reports, feature requests, documentation fixes, and pull requests.

## Getting started

1. **Fork** the repository and clone your fork.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the library:
   ```bash
   npm run build
   ```
4. Run the example app against your local build (rebuilds the library, links it
   into `example/`, and starts the dev server):
   ```bash
   npm run example
   ```
   > While iterating on the library, run `npm run dev` in a second terminal to
   > rebuild `lib/` on change.

## Development workflow

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run build`     | Type-check and bundle the library into `lib/`       |
| `npm run dev`       | Rebuild the library in watch mode                   |
| `npm run typecheck` | Type-check without emitting                         |
| `npm run lint`      | Lint and auto-fix `src/`                            |
| `npm test`          | Run the Jest test suite with coverage               |
| `npm run example`   | Build + run the demo app against the local build    |

Before opening a pull request, please make sure the following all pass:

```bash
npm run lint
npm run build
npm test
```

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/)
and [semantic-release](https://github.com/semantic-release/semantic-release) to
automate versioning and changelog generation. Please format commit messages as:

```
<type>(optional scope): <description>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `build`.

Examples:

```
feat: add blink animation to T2 avatars
fix: prevent viseme flicker when audio is paused
docs: clarify the visemeJson format
```

## Pull requests

- Keep PRs focused — one logical change per PR is easier to review.
- Update the README/types when you change public API.
- Add or update tests for behavior changes where practical.
- Make sure CI is green.

## Reporting bugs & requesting features

Please use the issue templates under
[**New issue**](https://github.com/khaledalam/avatoon/issues/new/choose). Include
a minimal reproduction (a StackBlitz/CodeSandbox link is ideal) and your
environment details (React, three, and `@react-three/fiber` versions).

## Code of conduct

By participating, you agree to abide by our
[Code of Conduct](./CODE_OF_CONDUCT.md).
