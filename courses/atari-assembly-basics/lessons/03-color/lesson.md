# Memory: your own shelves

Lesson 02 used a wired shelf. Most shelves aren't wired to anything, though. They're plain storage, and they're yours. This lesson writes a value to one, then reads it back later.

## A variable is a shelf

Storing is the same `sta` you already know. Reading back is `lda` without a `#`:

```
        lda #$07          ; load 7 into A
        sta $CB           ; store it on shelf $CB
        ; ... later ...
        lda $CB           ; load shelf $CB back into A
```

Both `sta $CB` and `lda $CB` have no `#`, so they mean the shelf, not the number. That's the whole distinction from last lesson, now going the other direction: writing to memory and reading it back.

## Naming a shelf

Writing `$CB` everywhere is a good way to fat-finger the wrong address. Give the shelf a name once and use the name:

```
score   = $CB             ; "score" now means shelf $CB

        lda #$00
        sta score
        ; ... later ...
        lda score
```

That's a **label**. You'll see labels name a line too, so the worker knows where to jump. Same mechanism either way: a name the assembler swaps back to a number.

A quick word on layout, because it isn't just for looks. The assembler here is MADS, and it tells labels from instructions by **which column they start in**. A label goes hard against the left edge, in column 1: `score`, `start`, `loop`. Everything else, the instructions and directives, is indented. That's why every listing in this course looks the way it does. If you accidentally indent a label (without a trailing colon), MADS thinks it's a macro call and throws an error. Left edge for names, indented for instructions, and you're fine.

## Zero page

The first 256 shelves, `$00` to `$FF`, are special. They're by the door: the worker reaches them faster and the instruction to use them is a byte shorter. This front row is the **zero page**, and it's where your small, frequently used variables belong.

But you can't just grab any zero-page shelf. The operating system is running underneath your program and keeps a lot of them for itself. Scribble on one of those and you'll crash the machine or get weird behaviour. Here's the rough layout:

```
  $00 - $7F   OS. hands off.
  $80 - $CA   used by BASIC and the floating-point routines
  $CB - $D1   free. safe to use, always.
  $D2 - $FF   free if you're not using floating-point math
```

For this course, `$CB` to `$D1` is your sandbox: seven shelves that nothing else touches. That's plenty for a variable or two. When you need more later, `$D2`-`$FF` opens up as long as you steer clear of the math routines.

So put `hue` on `$CB`, not somewhere down in OS territory.

## The rest of the warehouse

Zero page is just the first 256 shelves. The warehouse runs all the way up to `$FFFF` (65535), but not all of it is yours, and some of it isn't even RAM. Here's the big picture:

```
  $0000 - $00FF   zero page (covered above)
  $0100 - $01FF   the stack. the CPU's, not yours. leave it.
  $0200 - $06FF   OS workspace and system data
  $0700 - $1FFF   used by DOS and buffers when a disk is attached
  $2000 - $BFFF   RAM. this is your space.
  $C000 - $FFFF   ROM: the OS and, in the middle, the hardware registers
```

Your program loads at `$2000` (that's what `org $2000` in the skeleton means), and everything from there up to about `$BFFF` is open RAM for your code and data. That's roughly 40 KB, plenty.

The top band, `$C000-$FFFF`, is where the OS ROM lives, along with the hardware registers around `$D000` that your program talks to (the colour shelf writes through to one of these). You can't use this band as scratch storage: it's fixed code and machine controls, not shelves you own.

(The colour shelf `$02C8` from lesson 01 is a special case. It lives down in the OS workspace, so it's real RAM, but the OS reads it every frame and copies it out to the actual hardware. That's why writing there changes the screen. You'll meet a few of these "the OS watches this shelf for you" addresses as you go.)

One shelf that isn't fixed: the screen. Its memory sits near the top of your RAM, but the exact address shifts with the graphics mode and how much RAM is installed, so the OS keeps a pointer to it (at `$58`/`$59`) rather than pinning it down. You'll use that pointer in lesson 04.

There's a twist worth knowing, even if you won't use it yet. This is an XL/XE machine, and it actually has a full 64 KB of RAM, including RAM sitting *underneath* the OS ROM up in that `$C000-$FFFF` band. The ROM just covers it up. You can flip a switch (a hardware register called PORTB) to hide the ROM and expose that hidden RAM, about 14 KB of it, minus the `$D000-$D7FF` hole for the chips, which can never be switched away. The catch is that with the OS banked out you lose its help, so it's an advanced move. File it away; for this course, `$2000-$BFFF` is all the room you need.

## Your turn

In `src/main.a65`, make a zero-page shelf named `hue`. Write a value to it, then read it back into A.

Name the shelf (`hue = $CB`), store a value with `sta hue`, then `lda hue` to read it back. Keep the label `start`.

Assemble, run, and press **Check**. It reads `hue` to confirm your value is there.

To watch the value yourself, set a breakpoint (`F9`) on the line after `sta hue` and run. Once the program is stopped there, type `CB` into the Memory panel to see your byte on the shelf, or look next to the `hue =` line, where the editor shows the variable's value right in the gutter.

These live values only show while the program is paused and you're stepping. Let it run freely and they vanish, because the program is racing through instructions and there's no single "current" value to show. Stop on a breakpoint and they come back.