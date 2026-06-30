# 7 · The project manifest

Every project has a **`project.json`** — its manifest. It says *what* the project
is and *how* to build it. Open it and madside shows a **visual editor** (a form
with dropdowns) alongside the raw JSON.

## What's in it

```json
{
  "version": 2,
  "name": "madside-tour-07",
  "main": "src/main.a65",        // the entry source the assembler builds
  "machine": "atari-xl",         // which machine (Atari, NES, …)
  "toolchain": "mads",           // which assembler
  "run": { "default": { "audio": true } },
  "panels": ["registers", "memory"],    // which debug panels to show
  "build": { "args": ["-d:BGCOL=$84"] } // raw flags passed to the assembler
}
```

- **`machine`** / **`toolchain`** pick the hardware + assembler (the dropdowns).
- **`run.default.audio`** turns emulator sound on or off.
- **`panels`** chooses which debug panels appear.
- **`build.args`** go straight to the toolchain. For MADS, `-d:NAME=val`
  **defines a symbol** before assembly — configure a build without touching code.

## The red build

This lesson's `src/main.a65` reads a symbol **`BGCOL`** that the source never
defines — so the **Output** panel is **red** (*BGCOL undefined*). The fix isn't
in the code; it's in the manifest.

## Task

Open **`project.json`** and add a build argument that defines `BGCOL` as `$84`
(use the manifest editor's JSON view, or edit the file directly):

```json
"build": { "args": ["-d:BGCOL=$84"] }
```

Output goes green; run with **Ctrl+Enter** and the background is colour `$84`.
Change the value, rebuild, watch it follow. Press **Check** — it confirms the
build, which only succeeds once the manifest defines `BGCOL`.

That's the tour. You've driven every core part of madside — go build something.
