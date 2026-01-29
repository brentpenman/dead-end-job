---
phase: 02-world-building
plan: 02
subsystem: narrative
tags: [dialogue-trees, writing, game-content, character-personality]

# Dependency graph
requires:
  - phase: 02-01
    provides: Room structure, dialogue system, inventory system
provides:
  - Three complete NPC dialogue trees with distinct personalities
  - Morgan's sarcastic examine text for all hotspots
  - Coffee mug pickup item for puzzle chain
  - State-aware conditional dialogue choices
affects: [03-puzzles-logic, future dialogue expansion]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - IIFE module pattern for dialogues.js
    - Dialogue tree registration via Dialogues.registerAll()
    - Morgan's first-person sarcastic internal monologue voice

key-files:
  created:
    - js/dialogues.js
  modified:
    - js/rooms.js
    - js/game.js
    - index.html

key-decisions:
  - "Clerk personality: bone-deep bored DMV worker"
  - "Cabinet personality: grumpy territorial librarian"
  - "Manager personality: relentlessly cheerful corporate motivator"
  - "Morgan's voice: dry, sarcastic, copes with death through dark humor"
  - "All examine text references afterlife/bureaucracy theme"

patterns-established:
  - "NPC dialogue trees use portrait color hints for future rendering"
  - "Each NPC has immediately distinguishable voice (short/caps/enthusiasm)"
  - "Examine text is 1-2 sentences max, first-person Morgan POV"
  - "Conditional dialogue choices based on hasItem and hasFlag"

# Metrics
duration: 3min
completed: 2026-01-29
---

# Phase 2 Plan 2: Dialogue & Personality Summary

**Three distinct NPC dialogue trees with state-aware branching and Morgan's dry sarcastic examine text establishing game's humor across all hotspots**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-29T13:07:17Z
- **Completed:** 2026-01-29T13:10:32Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Three complete NPC dialogue trees with distinct personalities (Clerk: bored, Cabinet: grumpy, Manager: cheerful)
- Every hotspot across 5 rooms has Morgan's sarcastic examine text
- Coffee mug pickup added to Break Room for puzzle chain
- State-aware conditional dialogue choices using hasItem and hasFlag

## Task Commits

Each task was committed atomically:

1. **Task 1: Create NPC dialogue trees** - `7b1c825` (feat)
2. **Task 2: Add Morgan's examine text** - `b2bc266` (feat)

## Files Created/Modified
- `js/dialogues.js` - Three NPC dialogue trees (Clerk, Cabinet, Manager) with branching nodes and state conditions
- `js/rooms.js` - Updated all hotspot onInteract text with Morgan's voice, added coffee-mug pickup
- `js/game.js` - Added Dialogues.registerAll() call after Dialogue.init()
- `index.html` - Added dialogues.js script reference after dialogue.js

## Decisions Made

**NPC Personality Choices:**
- **Clerk:** Bone-deep bored, monotone, existential resignation. Short sentences. Periods. Not mean, just checked out.
- **Filing Cabinet:** Grumpy, territorial, protective of files. CAPS for emphasis. Rhetorical questions. Secretly lonely.
- **Manager:** Relentlessly cheerful, loves bureaucracy unironically. Exclamation marks! CAPS enthusiasm! Corporate-speak and puns.

**Morgan's Voice:**
- Recently deceased office worker
- Dry, sarcastic, self-aware
- Copes with being dead by making jokes
- References afterlife/bureaucracy/death consistently
- First-person internal monologue

**Technical:**
- Portrait color hints in dialogue trees (gray-blue Clerk, stone Cabinet, purple Manager)
- Each dialogue tree has 7-9 nodes with branching paths
- Conditional choices appear/hide based on game state
- Coffee mug as trade item for Form 27-B from Cabinet

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - dialogue system from Phase 1 worked perfectly for implementing complex branching trees.

## Next Phase Readiness

**Ready for Phase 3 (Puzzles & Logic):**
- All NPCs have dialogue trees with logical puzzle hooks
- Clerk mentions ticket machine → Filing Room → Manager path
- Cabinet requires coffee mug trade for Form 27-B
- Manager requires form + stamp before approving
- Coffee mug pickup exists in Break Room
- Rubber stamp pickup exists in Break Room
- Flag and item conditions ready for puzzle logic wiring

**Content Quality:**
- Three distinctly recognizable NPC voices
- Consistent dry humor throughout all examine text
- Afterlife bureaucracy theme established
- Morgan's personality clear from examine text alone

**No blockers.** Phase 3 can wire puzzle interactions and victory conditions.

---
*Phase: 02-world-building*
*Completed: 2026-01-29*
