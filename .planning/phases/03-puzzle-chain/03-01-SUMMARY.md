---
phase: 03-puzzle-chain
plan: 01
subsystem: gameplay-mechanics
tags:
  - puzzles
  - progression-gating
  - inventory-system
  - dialogue-actions
  - game-state
requires:
  - 02-01-world-building
  - 02-02-dialogue-content
provides:
  - playable-puzzle-chain
  - visibility-gating-system
  - ending-trigger-mechanism
affects:
  - 04-01-art-polish
  - 04-02-audio-integration
tech-stack:
  added: []
  patterns:
    - visibleWhen conditional hotspots
    - onSceneRender visibility hook
    - dialogue action triggerEnding
key-files:
  created: []
  modified:
    - js/rooms.js
    - js/game.js
    - js/scene.js
    - js/dialogues.js
    - js/dialogue.js
key-decisions:
  - decision: "Use visibleWhen property on hotspot data for visibility gating"
    rationale: "Clean data-driven approach keeps logic separate from rendering"
    impact: "Extensible pattern for future conditional hotspots"
  - decision: "Gate Manager stamp-form choice on hasItem rubber-stamp instead of readyToStamp flag"
    rationale: "Simpler than reactive flag computation, rubber-stamp is the more gated item"
    impact: "Player must have stamp to see final dialogue option"
  - decision: "Remove both form-27b and rubber-stamp during stamping sequence"
    rationale: "Items are consumed in the ending -- cleaner inventory state"
    impact: "Prevents player from trying to use items after completion"
  - decision: "Add triggerEnding as dialogue action type"
    rationale: "Dialogue engine needs to trigger game state transitions"
    impact: "Dialogue system can now initiate ending sequence"
duration: 2 minutes
completed: 2026-01-29
---

# Phase 3 Plan 1: Puzzle Implementation Summary

**One-liner:** Full puzzle chain with bent-paperclip ticket fix → Clerk gating → coffee-for-form trade → visibility-gated stamp → Manager ending trigger

## Performance

- **Duration:** 2 minutes
- **Start:** 2026-01-29T18:32:25Z
- **End:** 2026-01-29T18:34:15Z
- **Tasks:** 2/2 completed
- **Files modified:** 5

## What We Accomplished

Implemented the complete three-puzzle progression chain that makes Dead End Job playable from title screen to ending:

**PZL-01: Ticket Machine Fix**
- Added bent paperclip pickup item to Waiting Room
- Wired ticket machine to accept bent-paperclip via acceptsItem
- Set hasTicketNumber flag on successful use
- Unlocks Clerk "I have a number" dialogue path

**PZL-02: Filing Cabinet Coffee Trade**
- Coffee mug pickup already existed from Phase 2
- Cabinet dialogue already had trade logic (Phase 2)
- Verified form-27b item given and coffee-mug removed
- Unlocks Clerk "I have Form 27-B" dialogue path

**PZL-03: Rubber Stamp Visibility & Manager Completion**
- Gated rubber stamp visibility on clerkSentToManager flag
- Only appears after Clerk sends player to Manager
- Manager dialogue now gates stamp-form choice on hasItem rubber-stamp
- Stamping sequence removes both items and triggers ending via dialogue action

**Visibility Gating System**
- Added Game.onSceneRender() hook called after Scene.render()
- Hides hotspots based on visibleWhen conditions (hasFlag, notFlag)
- Hides already-picked-up items on scene re-entry
- Extensible pattern for future conditional content

**Ending Trigger Mechanism**
- Extended dialogue engine with triggerEnding action support
- Manager goodbye node calls Game.triggerEnding() after 500ms delay
- Ending screen displays with "FORM 27-B: APPROVED"
- Play Again button resets state and returns to title

## Task Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Wire puzzle hotspots and visibility gating | ec6dcc9 | js/rooms.js, js/game.js, js/scene.js |
| 2 | Update dialogue trees and wire ending trigger | 436e79d | js/dialogues.js, js/dialogue.js |

## Files Created

None -- all changes were modifications to existing systems.

## Files Modified

**js/rooms.js**
- Added bent-paperclip pickup hotspot to waiting-room
- Wired ticket-machine acceptsItem, useItemText, wrongItemText, onUseItem callback
- Added visibleWhen: { hasFlag: 'clerkSentToManager' } to rubber-stamp

**js/game.js**
- Added onSceneRender() method for visibility gating
- Checks visibleWhen conditions (hasFlag, notFlag)
- Hides picked-up items on re-entry

**js/scene.js**
- Added Game.onSceneRender() call at end of Scene.render()
- Placed after hotspot creation loop for visibility filtering

**js/dialogues.js**
- Reordered Manager start choices (stamp-form before have-form-only)
- Changed stamp-form condition from hasFlag readyToStamp to hasItem rubber-stamp
- Added removeItem form-27b to stamp-form action
- Added removeItem rubber-stamp and triggerEnding to goodbye action

**js/dialogue.js**
- Extended executeAction() to support triggerEnding action
- Calls Game.triggerEnding() after 500ms delay

## Decisions Made

1. **visibleWhen property pattern:** Used data-driven approach on hotspot definitions rather than hardcoding visibility logic in Scene.render(). Clean separation of concerns, easy to extend.

2. **rubber-stamp gating logic:** Gate final Manager choice on hasItem rubber-stamp instead of computed readyToStamp flag. Since stamp only appears after form is obtained (via Clerk progression), having stamp implies having form. Simpler than reactive flag computation.

3. **Item removal during stamping:** Remove both form-27b and rubber-stamp during Manager dialogue sequence. Items are consumed for the ending -- prevents edge cases of player trying to re-use them.

4. **triggerEnding as dialogue action:** Extended dialogue engine action types to include triggerEnding. Dialogue trees can now trigger game state transitions, making story progression seamless.

## Deviations from Plan

None -- plan executed exactly as written. All puzzle logic, visibility gating, and ending triggers implemented per specification.

## Issues Encountered

None. All systems integrated cleanly:
- Existing Inventory.useOnHotspot() already supported onUseItem callbacks
- Dialogue engine already supported action execution with setFlag, giveItem, removeItem
- Only needed to extend with triggerEnding action type
- visibleWhen pattern fits naturally with existing hotspot data structure

## Next Phase Readiness

**Phase 3 Plan 2 (if exists):** Ready. Puzzle chain complete and testable.

**Phase 4 (Art & Audio):**
- All placeholder interactions are playable and verifiable
- Custom cursor icons can replace CSS cursors
- Background images can replace color backgrounds
- Sound effects can be added to puzzle interactions (ticket machine *CLUNK*, stamp sound)
- Typewriter sound can be added to dialogue text
- Music can be added to title, gameplay, and ending screens

**Testing notes:**
- Full playthrough: title → pick up paperclip → fix ticket → Clerk → pick up coffee → Cabinet trade → Clerk again → pick up stamp (now visible) → Manager → ending
- Verify stamp invisible until clerkSentToManager flag set
- Verify picked-up items don't reappear on scene re-entry
- Verify ending triggers after Manager stamps form
- Verify Play Again resets all state correctly

**Known edge cases handled:**
- Player can't skip progression (each step requires previous completion)
- Items already picked up hidden via onSceneRender
- Dialogue engine prevents interaction with hotspots while open (Game.dialogueOpen flag)
- Conditional dialogue choices only appear when requirements met

The game is now fully playable from start to finish. Phase 3 complete pending verification.
