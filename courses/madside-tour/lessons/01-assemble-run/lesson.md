# 1 · Assemble & Run

Welcome to madside. This lesson is the loop you'll use everywhere: **edit →
watch the build → run → check**. You won't write assembly here — just drive
madside.

## madside builds as you type

There's no "compile" button. Every edit re-runs the MADS assembler in the
background and updates the **Output** panel (below the editor). Green = it built;
**red shows the error and the line it's on**.

Open `src/main.a65`. Right now the Output panel is **red**: one line is commented
out, so a label it needs (`msg`) is undefined. Read the error — it names the file
and line.

## Task

1. **Uncomment** the one line marked `TODO` (delete the leading `; `). It's the
   message data the program prints.
2. Watch the **Output** panel flip to **green**.
3. Press **Ctrl+Enter** (or ▶) to run — `HELLO MADSIDE!` appears top-left. The
   `run start` line tells madside where to begin.
4. Press **Check**.

That's the whole loop. Every other lesson is a variation on it.
