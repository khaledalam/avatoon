# Avatoon Example

A minimal [Vite](https://vitejs.dev/) + React app demonstrating the
[`avatoon`](../) library. This is the app deployed at
[khaledalam.net/avatoon](https://khaledalam.net/avatoon/).

## Run it against the local library

From the **repository root** (not this folder), run:

```bash
npm run example
```

This builds the library, packs it into a tarball, installs it here, and starts
the Vite dev server — so you're always testing your local `src/` changes.

## Scripts (inside this folder)

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the Vite dev server             |
| `npm run build` | Build the production demo into `dist/`|
| `npm run preview` | Preview the production build        |

> The demo depends on `avatoon` as a packed tarball (`file:../avatoon-1.0.0.tgz`)
> rather than a symlink — this guarantees a single React instance and avoids the
> "invalid hook call" error that a linked local package would cause.
