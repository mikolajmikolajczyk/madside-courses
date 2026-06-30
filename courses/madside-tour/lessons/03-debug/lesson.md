# 3 · The debugger

madside has a full 6502 debugger. This program does one thing — it puts **`$42`**
into address **`$0600`** and then loops forever. Use the debugger to watch it
happen.

## Breakpoints and stepping

- **F9** toggles a **breakpoint** on the cursor's line (a red dot in the gutter).
  Run with **Ctrl+Enter** and execution halts *before* that instruction.
- **F10** — step one instruction. **F11** — step one frame.

## Registers and memory

While paused, two Debug panels show the machine's state:

- **Registers** — `A`, `X`, `Y`, `SP`, `PC`, and the flags. Step and watch them.
- **Memory** — type an address like `$0600` to watch those bytes live.

## Task

No code to change — drive the debugger:

1. Put a breakpoint (**F9**) on the **`sta TARGET`** line and **Run**. It stops
   *before* the store.
2. In **Registers**, confirm **A** is `$42` (the `lda #$42` just ran).
3. Open the **Memory** viewer at **`$0600`** — still `$00`, because the store
   hasn't happened yet.
4. **Step** (F10) once. Now `$0600` is `$42`. You just watched a write land.

Press **Check** — it confirms the program builds.
