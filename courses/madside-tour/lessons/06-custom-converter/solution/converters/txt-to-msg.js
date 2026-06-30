// Lesson 6 — reference solution: the converter you create in converters/.
// Turns a .txt file into a screen-message `dta` table for the print loop.

export const meta = {
  id: 'txt-to-msg',
  label: 'Text → screen message',
  inputExt: ['txt'],
  optionsSchema: [
    { name: 'label', type: 'string', default: 'msg' },
  ],
}

export default async function convert(input, opts) {
  const text = new TextDecoder().decode(input).trim()
  const label = String(opts.label ?? 'msg')
  const out = `${label}\n        dta d'${text}', $ff\n`
  return { bytes: new TextEncoder().encode(out), mimeHint: 'text/x-asm', summary: `${text.length} chars` }
}
