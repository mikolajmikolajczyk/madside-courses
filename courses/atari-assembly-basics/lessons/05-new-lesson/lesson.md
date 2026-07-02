# Loops: the X register

Filling one shelf is easy. Filling sixteen by hand would mean writing the same `sta` sixteen times. Instead you use the worker's one trick, compare-then-maybe-jump, aimed backwards to make a loop.

## X counts

**X** is the counter. Load it with a count, do some work, knock it down by one, and jump back while it's still above zero. Two instructions do the counting:

- `dex` decrements X by one. When X reaches zero, the zero flag gets set.
- `bne` branches (jumps) only while the zero flag is clear, that is, while X isn't zero yet.

Together they're the tail of a countdown loop:

```
        ldx #8            ; X = 8, the counter
loop
        ; ... do work ...
        dex               ; X = X - 1
        bne loop          ; not zero? back up to loop
                          ; zero? fall through
```

The worker still runs top to bottom. `bne` is the one line that sends it back up, eight times, until X runs out. `loop` is a **label**, a name for the line to jump to, same as the shelf names in lesson 02.

## Watch it count

A loop is the first place stepping through the code earns its keep, and the debugger is where you'll actually see the loop work. Put the cursor on the `dex` line and press `F9` to set a breakpoint. Run, and the worker stops there each time around. Watch **X** in the Registers panel: 8, 7, 6, and so on down. When X hits 0 the zero flag (`Z`) lights up in the Flags panel, and the next `bne` falls through instead of jumping.

`Shift+F10` steps one instruction at a time if you'd rather walk it by hand. `Ctrl+Enter` runs on to the next breakpoint hit. This is the whole point of the lesson: you don't need anything on screen to see a loop run, you watch it happen in the panels.

## Two registers at once

X counts how many times. But if you're filling a row of shelves, you also need to track *where*, and that's a second job for **Y**.

Here's the trick: they move in opposite directions. X counts **down** from 16 (so `bne` knows when to stop), while Y counts **up** from 0 (so each pass writes one shelf further along). One `dex`, one `iny`, every time around:

```
        ldx #16           ; counter: 16 passes
        ldy #0            ; offset: start at the first shelf
loop
        lda #$AA
        sta $3000,y       ; store into shelf $3000 + Y
        iny               ; next shelf
        dex               ; one fewer pass
        bne loop          ; not done? go again
```

`sta $3000,y` is a new shape: the `,y` means "shelf `$3000`, plus whatever's in Y." First pass Y is 0, so `$3000`. Next pass Y is 1, so `$3001`. And so on up to `$300F`. This is called indexed addressing, and it's how one instruction can hit sixteen different shelves.

## Your turn

In `src/main.a65`, fill 16 bytes starting at `$3000` with the value `$AA`, using a loop.

Set X to 16 (the counter) and Y to 0 (the offset). Each pass: load `$AA`, `sta $3000,y`, then `iny` and `dex`, and `bne` back up until X hits zero. Keep the label `start`.

Assemble, run, then type `3000` into the Memory panel. You should see sixteen `AA` bytes in a row, filled in by the loop. Set a breakpoint on `dex` and step if you want to watch them appear one at a time.