# Intro

There's one idea to get before you write any code in this course. Once it clicks, the rest gets easier.

## A worker at a tiny desk

Picture a worker. Fast, not clever. Does one small thing, then the next, and never stops to think.

His desk is tiny. It holds three sheets of paper at a time, no more. These three spots are the **registers**, and they have names:

- **A**, in the middle, where almost all the work happens.
- **X** and **Y**, on either side. Mostly for counting.

## The warehouse

Next door is a huge warehouse. Thousands of shelves, each holding one sheet with a number on it. This is the **memory** (RAM). Every shelf has an address: shelf `000`, shelf `001`, and so on up.

A **sheet** is a number the worker can carry. A **shelf** is where that number sits when it's not on the desk. The worker can only work with sheets that are on the desk, so anything in the warehouse has to be fetched first.

That fetching is the whole job:

1. walk to the shelf,
2. take the sheet,
3. walk back,
4. put it in A, X, or Y,
5. do something,
6. walk over and drop a sheet back on a shelf.

Grab, do, drop. Two of those steps have names you'll use constantly:

- Grab a sheet into A → `lda` (load A)
- Drop A back onto a shelf → `sta` (store A)

That's two instructions. You're already part way in.

## Why not just "a variable"?

In Python you write `x = 5` and forget about it. That `x` is a sheet on some shelf: cheap to store, slower to reach.

A register is the sheet already on the desk. No address, instant to use, but there are only three spots and the worker keeps needing them back. That's why assembly is a constant stream of grabbing and dropping.

## Where's the "if"?

The CPU has no `if`, no `while`, no functions. The worker reads the program top to bottom, one line at a time, always. It has exactly one way to break out of that straight line: compare two sheets, then maybe jump to a different line.

That's it. Every `if`, every loop, every menu in every game ever shipped is built from compare-then-maybe-jump. Python writes those compares and jumps for you. Here you write them yourself.

## The whole machine

```
    DESK (registers)              WAREHOUSE (memory / RAM)
  +----+ +----+ +----+          [000][001][002][003]...
  | A  | | X  | | Y  |          [ 12][   ][ 07][   ]
  +----+ +----+ +----+          ... thousands of shelves ...
     ^  lda (grab)                        |
     |___________________________________|
                sta (drop)
```

## The short version

1. Three spots on the desk: A, X, Y.
2. `lda` grabs a sheet off a shelf, `sta` drops one back.
3. The worker runs top to bottom, but can jump.
4. Everything else is a trick built on those.

Next you'll turn the screen a colour with a single store.