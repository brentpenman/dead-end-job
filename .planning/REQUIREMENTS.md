# Requirements: Dead End Job

**Defined:** 2026-01-29
**Core Value:** The game must feel like a real point-and-click adventure — explorable scenes, inventory puzzles, witty dialogue trees, and a satisfying short story arc.

## v1 Requirements

### Engine

- [ ] **ENG-01**: Game renders scenes as full-screen backgrounds with clickable hotspots
- [ ] **ENG-02**: Cursor changes appearance based on what it hovers over (look, use, talk)
- [ ] **ENG-03**: Player can navigate between rooms by clicking exits
- [ ] **ENG-04**: Scene transitions feel smooth (fade or similar)

### Inventory

- [ ] **INV-01**: Player can pick up items and they appear in an inventory bar
- [ ] **INV-02**: Player can select an inventory item and use it on a hotspot
- [ ] **INV-03**: Player can examine inventory items for a description
- [ ] **INV-04**: Items are removed from inventory when used correctly

### Dialogue

- [ ] **DLG-01**: Clicking an NPC opens a dialogue box with branching choices
- [ ] **DLG-02**: Dialogue choices change based on game state (items held, puzzles solved)
- [ ] **DLG-03**: NPC portraits display during dialogue
- [ ] **DLG-04**: Player can exit dialogue at any time

### Puzzles

- [ ] **PZL-01**: Ticket machine puzzle — combine items to fix it, get a number
- [ ] **PZL-02**: Filing cabinet puzzle — trade an item to receive Form 27-B
- [ ] **PZL-03**: Stamp puzzle — find the stamp and bring it to the Manager
- [ ] **PZL-04**: Puzzles gate progression (can't skip ahead)

### Scenes

- [ ] **SCN-01**: Title screen with game name and "New Game" button
- [ ] **SCN-02**: Waiting Room — starting area with ticket machine, exit to Front Desk
- [ ] **SCN-03**: Front Desk — Clerk NPC, exits to Waiting Room, Break Room, Filing Room
- [ ] **SCN-04**: Break Room — vending machine, coffee machine, stamp location
- [ ] **SCN-05**: Filing Room — filing cabinets, sentient cabinet NPC
- [ ] **SCN-06**: Manager's Office — Manager NPC, final stamp interaction
- [ ] **SCN-07**: Ending screen — congratulations, game complete

### Content

- [ ] **CNT-01**: Each hotspot has an examine description (flavor text)
- [ ] **CNT-02**: Each NPC has personality reflected in dialogue (Clerk: bored, Cabinet: grumpy, Manager: cheerful)
- [ ] **CNT-03**: Morgan has sarcastic internal monologue for examine actions
- [ ] **CNT-04**: Game has dry humor throughout (afterlife bureaucracy jokes)

### Audio

- [ ] **AUD-01**: Background ambient music (looping, office/elevator style)
- [ ] **AUD-02**: Sound effects for key interactions (pickup, door, dialogue open)

### Art

- [ ] **ART-01**: 5 room backgrounds generated via Gemini (Waiting Room, Front Desk, Break Room, Filing Room, Manager's Office)
- [ ] **ART-02**: 3 character portraits generated via Gemini (Morgan, Clerk, Filing Cabinet)
- [ ] **ART-03**: Title screen image generated via Gemini
- [ ] **ART-04**: Ending scene image generated via Gemini
- [ ] **ART-05**: Inventory item icons (CSS/SVG or web-sourced)
- [ ] **ART-06**: Cursor icons for interaction modes (web-sourced or CSS)

## v2 Requirements

### Polish

- **POL-01**: Save/load game state
- **POL-02**: Hint system for stuck players
- **POL-03**: Mobile/touch support
- **POL-04**: Character walking animations
- **POL-05**: Multiple endings based on dialogue choices

## Out of Scope

| Feature | Reason |
|---------|--------|
| Save/load | Game is 5 minutes, not needed |
| Voice acting | Text-only keeps scope small |
| Mobile support | Desktop browser only for v1 |
| Sprite animation | Static scenes with hotspots, keeps art budget manageable |
| Multiple endings | Linear story for v1 scope |
| Build tools/bundlers | Vanilla JS, no toolchain needed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ENG-01 | Phase 1 | Complete |
| ENG-02 | Phase 1 | Complete |
| ENG-03 | Phase 1 | Complete |
| ENG-04 | Phase 1 | Complete |
| INV-01 | Phase 1 | Complete |
| INV-02 | Phase 1 | Complete |
| INV-03 | Phase 1 | Complete |
| INV-04 | Phase 1 | Complete |
| DLG-01 | Phase 1 | Complete |
| DLG-02 | Phase 1 | Complete |
| DLG-03 | Phase 1 | Complete |
| DLG-04 | Phase 1 | Complete |
| PZL-01 | Phase 3 | Pending |
| PZL-02 | Phase 3 | Pending |
| PZL-03 | Phase 3 | Pending |
| PZL-04 | Phase 3 | Pending |
| SCN-01 | Phase 2 | Pending |
| SCN-02 | Phase 2 | Pending |
| SCN-03 | Phase 2 | Pending |
| SCN-04 | Phase 2 | Pending |
| SCN-05 | Phase 2 | Pending |
| SCN-06 | Phase 2 | Pending |
| SCN-07 | Phase 2 | Pending |
| CNT-01 | Phase 2 | Pending |
| CNT-02 | Phase 2 | Pending |
| CNT-03 | Phase 2 | Pending |
| CNT-04 | Phase 2 | Pending |
| AUD-01 | Phase 4 | Pending |
| AUD-02 | Phase 4 | Pending |
| ART-01 | Phase 4 | Pending |
| ART-02 | Phase 4 | Pending |
| ART-03 | Phase 4 | Pending |
| ART-04 | Phase 4 | Pending |
| ART-05 | Phase 4 | Pending |
| ART-06 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0

---
*Requirements defined: 2026-01-29*
*Last updated: 2026-01-29 after roadmap creation*
