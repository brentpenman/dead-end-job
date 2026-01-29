# Dead End Job

## What This Is

A web-based point-and-click adventure game in the style of LucasArts classics (Monkey Island, Day of the Tentacle). You play as Morgan Gray, a recently deceased office worker who wakes up in the Afterlife Processing Department — a crumbling, fluorescent-lit government office where the dead go to get their paperwork sorted before moving on. The game is ~5 minutes long with inventory puzzles, dialogue trees, and dry humor.

## Core Value

The game must feel like a real point-and-click adventure — explorable scenes, inventory-based puzzles, witty dialogue trees, and a satisfying short story arc from start to finish.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Title screen with "New Game" option
- [ ] 4-5 explorable rooms with distinct backgrounds
- [ ] Point-and-click movement and interaction (click hotspots to examine/use)
- [ ] Inventory system (pick up items, use items on objects/people)
- [ ] Dialogue tree system with multiple choices (Monkey Island style)
- [ ] 3-4 inventory puzzles that gate progression
- [ ] 2-3 NPCs with personality and dialogue
- [ ] Ending sequence when all puzzles solved
- [ ] Cursor changes on hover (look, interact, talk)
- [ ] Background music/sound effects (web-sourced)

### Out of Scope

- Save/load system — game is 5 minutes, not needed
- Voice acting — text only
- Multiple endings — single linear story
- Mobile/touch support — desktop browser only
- Accessibility features — out of scope for v1
- Animation/sprite movement — static scenes with hotspots

## Context

**Setting:** The Afterlife Processing Department — a soul-crushingly mundane government office where the dead must get Form 27-B stamped and approved before they can move on. Think DMV meets purgatory.

**Rooms:**
1. **Waiting Room** — Starting area. Broken ticket machine, bored souls, motivational posters with afterlife puns. Key item: take-a-number ticket (broken).
2. **Front Desk** — The Clerk (NPC) who won't help without proper forms. Dialogue tree gatekeeper. Has a bell, a "NEXT" sign, and mountains of paperwork.
3. **Break Room** — Where the stamp went missing. Coffee machine that dispenses existential dread. A vending machine with a stuck item. Key items: rubber stamp, coffee mug.
4. **Filing Room** — Walls of filing cabinets. One sentient filing cabinet that demands a specific item before giving up your file. Key item: Form 27-B.
5. **Manager's Office** — Final room. The Manager (NPC) who stamps your form. Locked until you have everything. Ending sequence plays here.

**Puzzle Flow:**
1. Try to talk to Clerk → needs a ticket number
2. Fix ticket machine (combine items) → get number
3. Talk to Clerk with number → needs Form 27-B
4. Go to Filing Room → cabinet wants something in trade
5. Find trade item in Break Room → get Form 27-B
6. Return to Clerk → needs Manager's stamp
7. Find stamp in Break Room → bring to Manager's Office
8. Manager stamps form → ending sequence

**Tone:** Dry, deadpan humor. The absurdity of bureaucracy persisting after death. NPCs are weary but oddly endearing. Morgan is sarcastic but kind.

**Art Budget (10 Gemini images max):**
1. Title screen
2. Waiting Room background
3. Front Desk background
4. Break Room background
5. Filing Room background
6. Manager's Office background
7. Morgan portrait (for dialogue)
8. Clerk portrait (for dialogue)
9. Filing Cabinet portrait (for dialogue)
10. Ending scene

**Other assets (web-sourced):**
- Cursor icons (pointer, magnifying glass, speech bubble, hand)
- Inventory item sprites (simple icons or CSS-drawn)
- UI elements (inventory bar, dialogue box)
- Sound effects and ambient music (freesound.org, opengameart.org)

**Tech Stack:**
- Vanilla HTML5 / CSS3 / JavaScript (no frameworks)
- DOM-based rendering (no canvas needed for static scenes)
- CSS for transitions and hover effects
- Single index.html entry point with modular JS

## Constraints

- **Asset budget**: Max 10 custom Gemini-generated images — plan usage carefully
- **Scope**: ~5 minutes playtime — resist feature creep
- **Testing**: Automated via Chrome browser tools (no manual user testing)
- **Tech**: Vanilla web stack only — no build tools, no frameworks, no npm

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Theme: Afterlife bureaucracy | Contained setting, natural puzzle structure, humor potential | — Pending |
| Vanilla JS, no framework | Small game, no build complexity, instant load | — Pending |
| DOM-based (not Canvas) | Easier hotspot interaction, CSS styling, accessibility | — Pending |
| 5 rooms | Fits 10-image budget with portraits to spare | — Pending |
| Linear puzzle chain | 5-minute game doesn't need branching puzzles | — Pending |

---
*Last updated: 2026-01-29 after initialization*
