# 2 · The editor

madside's editor reads your assembly and builds a live index of every **column-0
label** as you type. This lesson is about *seeing* that — no writing.

The starter already builds and runs. It has a small subroutine, **`clrscr`**,
that blanks the screen, and it's documented with a comment.

## Try these

- **Hover** the word `clrscr` on the `jsr clrscr` line. A popup shows where it's
  defined, a preview, and its **doc comment** — the `;` lines written directly
  above the `clrscr` label. That's how you document a routine in place.
- **Go to definition**: jump from the `jsr clrscr` use to the `clrscr` label.
  Handy once a file grows past one screen.
- Hover `msg` and `screen` too — every label madside knows about responds.

## Task

1. Hover `clrscr` and read its doc comment. Then use **go-to-definition** to jump
   to it.
2. Add a line to its doc comment — write your own `;` line directly above the
   `clrscr` label — then hover the `jsr clrscr` again and watch your text appear
   in the popup.
3. The build stays green the whole time. Press **Check**.

A doc comment is just comments in the right place; madside does the rest.
