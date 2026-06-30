# 6 · Write your own converter

Lesson 5 used a **built-in** converter. madside also runs **your own** — a tiny
JavaScript module you drop in the project under `converters/`. That's how you
turn *any* data into assembly, not just the formats that ship with madside.

## The converter contract

A converter is one file that exports two things:

```js
export const meta = {
  id: 'txt-to-msg',                 // referenced by the recipe's "converter"
  label: 'Text → screen message',
  inputExt: ['txt'],                // file extensions it accepts
  optionsSchema: [                  // options the recipe can pass
    { name: 'label', type: 'string', default: 'msg' },
  ],
}

// input: Uint8Array of the source file; opts: the recipe's options.
// Return the assembly bytes to write to the recipe's output.
export default async function convert(input, opts) {
  const text = new TextDecoder().decode(input).trim()
  const label = String(opts.label ?? 'msg')
  const out = `${label}\n        dta d'${text}', $ff\n`
  return { bytes: new TextEncoder().encode(out), mimeHint: 'text/x-asm', summary: `${text.length} chars` }
}
```

madside loads `converters/*.js` from the project, sandboxed, by content hash —
edit the file and the next build picks it up. (Courses can't *ship* plugin code,
so you'll type it in — that's the point of this lesson.)

This project already has the **recipe** (`project.json`) and the **input**
(`assets/greeting.txt`), and `src/main.a65` includes the generated output. But
the converter `txt-to-msg` doesn't exist yet, so the build is **red**.

## Task

1. Create a file **`converters/txt-to-msg.js`** (New File in the tree).
2. Paste the converter from above into it. Save.
3. The recipe now runs: `generated/greeting.a65` appears, `src/main.a65`'s `icl`
   resolves, the build goes **green**. Run it — your greeting prints.
4. Edit `assets/greeting.txt`, rebuild, watch the message change. Press **Check**.

You just extended the build with your own code. Editors work the same way.
