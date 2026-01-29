# Roadmap: Dead End Job

## Overview

Build a complete point-and-click adventure game in four phases: first the core engine systems (scene rendering, inventory, dialogue), then the game world (rooms, NPCs, written content), then the puzzle chain that ties it all into a playable story, and finally the art and audio polish that makes it feel real. Each phase delivers a verifiable capability that the next phase builds on.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases (e.g., 2.1): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Engine Systems** - Scene rendering, inventory mechanics, and dialogue system
- [ ] **Phase 2: World Building** - All rooms, NPCs, hotspots, and written content
- [ ] **Phase 3: Puzzle Chain** - The three inventory puzzles wired into a gated progression
- [ ] **Phase 4: Art and Audio** - Gemini images, cursor icons, inventory sprites, music, sound effects

## Phase Details

### Phase 1: Engine Systems
**Goal**: Player can navigate scenes, pick up and use items, and have branching conversations with NPCs -- all with placeholder art
**Depends on**: Nothing (first phase)
**Requirements**: ENG-01, ENG-02, ENG-03, ENG-04, INV-01, INV-02, INV-03, INV-04, DLG-01, DLG-02, DLG-03, DLG-04
**Success Criteria** (what must be TRUE):
  1. Player sees a scene with clickable hotspots and the cursor changes appearance when hovering over them
  2. Player clicks an exit hotspot and transitions smoothly to a different scene
  3. Player clicks a pickup hotspot and the item appears in an inventory bar; selecting that item and clicking a hotspot triggers a "use" interaction
  4. Player can examine an inventory item to see its description
  5. Player clicks an NPC and a dialogue box opens with branching choices; dialogue options change based on game state; player can exit dialogue freely
**Plans**: 3 plans

Plans:
- [x] 01-01: Scene engine -- rendering, hotspots, cursor modes, room navigation, transitions
- [x] 01-02: Inventory system -- pickup, inventory bar, item selection, use-on-hotspot, examine, item removal
- [ ] 01-03: Dialogue system -- dialogue box, branching choices, NPC portraits, state-aware options, exit

### Phase 2: World Building
**Goal**: All five game rooms exist with their hotspots, all three NPCs have personality-driven dialogue, and every examinable object has flavor text
**Depends on**: Phase 1
**Requirements**: SCN-01, SCN-02, SCN-03, SCN-04, SCN-05, SCN-06, SCN-07, CNT-01, CNT-02, CNT-03, CNT-04
**Success Criteria** (what must be TRUE):
  1. Title screen displays with game name and a "New Game" button that starts the game
  2. Player can walk through all five rooms (Waiting Room, Front Desk, Break Room, Filing Room, Manager's Office) using exits, and each room has its distinct hotspots
  3. Each NPC (Clerk, Filing Cabinet, Manager) has dialogue that reflects their personality -- bored, grumpy, and cheerful respectively
  4. Clicking any hotspot to examine it shows Morgan's sarcastic internal monologue with dry afterlife-bureaucracy humor
  5. An ending screen exists and can be triggered (placeholder trigger for now)
**Plans**: 2 plans

Plans:
- [ ] 02-01: Room definitions -- title screen, all 5 rooms with hotspots and exits, ending screen, navigation graph
- [ ] 02-02: Content writing -- NPC dialogue trees (Clerk, Cabinet, Manager), hotspot examine text, Morgan's monologue voice, humor pass

### Phase 3: Puzzle Chain
**Goal**: The complete puzzle sequence works end-to-end -- from broken ticket machine to Manager stamping Form 27-B -- gating progression so the player cannot skip steps
**Depends on**: Phase 2
**Requirements**: PZL-01, PZL-02, PZL-03, PZL-04
**Success Criteria** (what must be TRUE):
  1. Player can fix the ticket machine (combine items), get a number, and use it to advance the Clerk conversation
  2. Player can trade an item to the Filing Cabinet and receive Form 27-B
  3. Player can find the stamp in the Break Room and bring it to the Manager's Office to complete the game
  4. Player cannot skip ahead -- each puzzle step is gated by the previous one (no stamp without form, no form without ticket, etc.)
**Plans**: 1 plan

Plans:
- [ ] 03-01: Puzzle implementation -- wire all three puzzles (ticket machine, filing cabinet trade, stamp delivery), progression gating, ending trigger

### Phase 4: Art and Audio
**Goal**: The game looks and sounds like a real point-and-click adventure with generated room backgrounds, character portraits, custom cursors, and ambient audio
**Depends on**: Phase 3
**Requirements**: ART-01, ART-02, ART-03, ART-04, ART-05, ART-06, AUD-01, AUD-02
**Success Criteria** (what must be TRUE):
  1. All five rooms display distinct Gemini-generated background images that establish the afterlife-office atmosphere
  2. NPC dialogue shows character portraits (Morgan, Clerk, Filing Cabinet) and the title/ending screens use generated art
  3. Cursor icons visually distinguish between look, use, and talk modes
  4. Background ambient music loops during gameplay and key interactions produce sound effects
**Plans**: 2 plans

Plans:
- [ ] 04-01: Art integration -- generate and apply room backgrounds, character portraits, title/ending art, inventory item icons, cursor icons
- [ ] 04-02: Audio integration -- source and wire ambient music loop, interaction sound effects (pickup, door, dialogue open)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Engine Systems | 2/3 | In progress | - |
| 2. World Building | 0/2 | Not started | - |
| 3. Puzzle Chain | 0/1 | Not started | - |
| 4. Art and Audio | 0/2 | Not started | - |
