# madside-courses

The **official, curated** course repository for [madside](https://madside.mikolajczyk.org) — the in-browser IDE for retro hardware. Courses here are the ones madside shows by default; they're plain data (Markdown + assembly + JSON), never executable plugins.

## Layout

- **`main`** (this branch) holds **`index.json`** — the catalogue madside reads to list the official courses, plus this README.
- **one orphan branch per course** (e.g. [`madside-tour`](../../tree/madside-tour)) holds that course at the repo root: `course.json` + `lessons/<id>/…`.

madside fetches each course over the jsDelivr CDN (no backend), so this repo must stay **public**.

### `index.json`

```json
{
  "version": 1,
  "courses": [
    { "id": "madside-tour", "title": "…", "description": "…", "machine": "atari-xl", "ref": "madside-tour" }
  ]
}
```

`ref` is the branch that holds the course. To add a course: push a new orphan branch with the course files, then add an entry to `index.json` on `main`. No madside code change needed.

## Course format (per branch)

```
course.json                       # { title, description, machine, order }
lessons/<id>/lesson.md            # the teaching text + a "## Task"
lessons/<id>/check.json           # { "checks": [ { "kind": "build" }, … ] }
lessons/<id>/files/…              # the starter project (project.json + src/…)
lessons/<id>/solution/…           # reference solution (not loaded into the project)
```

Checks: `build`, `label` (name, addr?), `memory` (addr, equals, afterFrames?), `register` (reg, equals, afterFrames?).

**Courses are data, not code.** `editors/` and `converters/` paths are rejected — those are reserved for project-local plugins, never course content.

## License

Course content: CC BY 4.0. Sample assembly: public domain / CC0.
