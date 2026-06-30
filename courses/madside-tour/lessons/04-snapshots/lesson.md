# 4 · Snapshots & history

madside keeps a **history** of your project so you can experiment fearlessly and
roll back. You never lose a working version to a bad idea.

## How snapshots work

- Snapshots are **content-addressed**: each one records the exact bytes of every
  file. Identical files are stored once, so history is cheap.
- madside takes an **automatic** snapshot as you work, and you can take a
  **manual** one any time (the `Save + Build + Snapshot` command, **Ctrl+S**).
- The **History** panel lists them newest-first. From there you can:
  - **Restore** a snapshot — your files become exactly what they were then.
  - **Diff** two snapshots — see which files changed (added / removed /
    modified) between them.

Restoring is safe: taking a snapshot first means you can always come back.

## Task

This is a hands-on lesson — play with history until it's second nature:

1. Build the starter (it prints a message). Press **Ctrl+S** to take a labelled
   snapshot.
2. Change the message in `msg` to anything you like and build again. A new
   snapshot appears in **History**.
3. Open **History**, **diff** the two snapshots — note `src/main.a65` shows as
   *modified*.
4. **Restore** the first snapshot. Your original message is back.

End on a version that builds, then press **Check**.
