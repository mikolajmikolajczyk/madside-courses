# 5 · The asset pipeline

Projects have data — palettes, maps, tables — not just code. madside turns data
into assembly for you with **converters** driven by **recipes**, on every build.

## How it works

- A **recipe** in `project.json` wires up a converter. This lesson's already has
  one: it runs **`csv-to-data`** on `assets/colors.csv` and writes
  **`generated/colors.a65`** — a `dta` table labelled `colors` — before each
  build.

```json
"recipes": [
  { "input": "assets/colors.csv", "output": "generated/colors.a65",
    "converter": "csv-to-data", "options": { "label": "colors" } }
]
```

- Your source pulls the result in with MADS's **`icl`** (include) directive. The
  recipe runs first, so the file is there when the assembler needs it.

Right now `src/main.a65` never includes it, so the `colors` label doesn't exist —
the **Check** will fail until you wire it up.

## Task

In `src/main.a65`, uncomment the two marked blocks:

1. The **`icl 'generated/colors.a65'`** line — this defines `colors`.
2. The two lines that load the first colour and store it to the background
   register **`COLOR4` (`$02C8`)**.

Build, then run with **Ctrl+Enter** — the background takes the first colour from
the CSV. Edit `assets/colors.csv`, rebuild, watch it change. Press **Check** (it
verifies the build *and* that `colors` is defined — proof the recipe ran and your
`icl` worked).
