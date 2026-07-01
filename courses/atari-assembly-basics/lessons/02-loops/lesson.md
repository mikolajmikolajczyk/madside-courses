# The A register

Time to make something happen on screen. No loop, no counting, just the two instructions from the intro: grab, then drop. Everything here runs through **A**, the register in the middle of the desk.

The editor already has the program skeleton set up. You just add your two lines where the comment says to.

## A wired shelf

Most shelves are ordinary. You drop a sheet, it sits there until you fetch it. But a handful are wired to the machine, and dropping a sheet on one of those changes something in the real world.

One of them controls the background colour, at address `$02C8`. Store a value there and the colour on screen changes.

## Grab, then drop

```
        lda #$44          ; load the value $44 into A
        sta $02C8         ; store A into the colour shelf
```

`lda #$44` puts the value `$44` in A. `sta $02C8` copies A onto shelf `$02C8`. The worker grabs a value, walks over, drops it on the wired shelf, and the colour on screen changes. That's it.

## The `#` changes everything

`#` means the value itself. No `#` means an address to fetch from.

- `lda #$44` loads the number `$44`.
- `lda $44` goes to shelf `$44` and loads whatever is sitting there.

Two characters apart, completely different instructions. This one catches everybody at least once.

## Look under the hood

To see what the worker actually did, you have to catch it in the act. Put the cursor on the `sta` line and press `F9` to set a **breakpoint** (a red dot appears). Run, and the program stops there before that line executes. Now three panels show you the machine's state at that exact moment:

**Registers** shows the three desk spots plus a few others. After `lda #$94` has run, A reads `94`. That's the sheet on the desk.

**Memory** shows the warehouse. Type an address into the box at the top (`02C8`) and it jumps there. Step past the `sta` with `Shift+F10` and you'll see your colour value land on that shelf.

**Flags** are the little notes the worker leaves itself (N, V, Z, C, and so on). You'll use them in lessons 04 and 05, so ignore them for now.

`Shift+F10` steps one instruction at a time, so you can walk through and watch A change and the memory update. On two lines there's not much to catch, but the habit pays off once there's a loop.

Two things worth knowing. First, these panels only show meaningful values while the program is **paused**. Let it run freely and they empty out, because the program is racing through instructions with no single moment to freeze on. Stop on a breakpoint and the values come back. Second, while you're stepping, the screen won't update: the display is drawn on its own schedule, every so many instructions, not every one. So you'll see your byte land on shelf `$02C8` in the Memory panel right away, but the colour on screen won't change until you let the program run freely. The store worked; the screen just hasn't caught up. Hit `Ctrl+Enter` to run on and it'll show.

## Your turn

Add two lines where the editor says to: load a colour into A with `lda #...`, then store it to `$02C8`.

Try `$C6` (green), `$0E` (white), or `$34` (red-brown). Two lines is all it takes.

Assemble, run, and press **Check**. It reads `$02C8` to confirm your colour landed.