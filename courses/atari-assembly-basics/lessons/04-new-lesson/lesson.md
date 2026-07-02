# Numbers: hex and binary

You've been copying bytes like `$94` without knowing what they say. This lesson fixes that, and then you'll pick Atari colours on purpose instead of guessing.

A sheet holds one **byte**: a value from 0 to 255. That's the full range a register can carry. The value never changes; only how we write it does.

## Hex

The `$` means the number is in hexadecimal. Hex counts in sixteens, using `0`-`9` then `A`-`F` for ten through fifteen. One hex digit covers 0 to 15 exactly, so a byte is exactly two hex digits.

```
    $94
     ||
     |low digit  = 4
     high digit = 9
```

`$94` is high `9`, low `4`. In decimal that's `9*16 + 4 = 148`, but you rarely need the decimal. The point of hex is that each digit is one half of the byte, and on the Atari each half means something.

## Why hex suits Atari colour

The colour byte from lesson 01 is hue in the top half, brightness in the bottom half, which is just the two hex digits you type:

```
    $9 4
     | |
     | brightness (0-E, even)
     hue (0-F)
```

Want blue at medium brightness? Blue is `9`, medium is `4`: `$94`. Brighter? Raise the low digit: `$9A`, `$9E`. Green instead? Change the high digit: `$C4`. One digit for hue, one for brightness, set independently. That's why the whole palette is easiest to reason about in hex.

## Binary

Underneath, the machine has no digits at all. A sheet is eight switches, each on (1) or off (0). That's **binary**, written with `%`:

```
    %10010100  =  $94
     ^^^^ ^^^^
     high  low
```

Each group of four switches is one hex digit: `%1001` is `9`, `%0100` is `4`. So hex is just shorthand for binary, one digit per four bits. You'll rarely type full binary, but it's worth seeing that `$94`, `%10010100`, and `148` are the same sheet written three ways.

## Your turn

In `src/main.a65`, set the background colour again, but choose the byte yourself this time.

Pick a hue digit (0 to F) and a brightness digit (even, 0 to E), put them together as a `$` byte, load it into A, and store it to the colour shelf (`$02C8`). Keep the label `start`.

Change only the high digit and watch the hue shift. Change only the low digit and watch it lighten or darken.

Assemble, run, and press **Check**.