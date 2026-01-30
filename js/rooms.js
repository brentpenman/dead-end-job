// Dead End Job - Room Definitions
// All game rooms, title screen, and ending screen

(function() {
  'use strict';

  var rooms = {
    'title-screen': {
      id: 'title-screen',
      name: 'Dead End Job',
      background: '#1a1a2e',
      backgroundImage: 'images/title-screen.png',
      hotspots: [],
      isTitle: true
    },

    'waiting-room': {
      id: 'waiting-room',
      name: 'Waiting Room',
      background: '#2a3a2a',
      backgroundImage: 'images/waiting-room.png',
      hotspots: [
        {
          id: 'bent-paperclip',
          type: 'pickup',
          cursorStyle: 'look',
          x: 29.27,
          y: 80.81,
          width: 4.8,
          height: 4.18,
          label: 'Bent Paperclip',
          itemId: 'bent-paperclip',
          itemDescription: "A bent paperclip. Somebody's been stress-fiddling. Can't blame them -- eternity is long.",
          itemIcon: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M12 8C12 5 16 5 16 8L16 28C16 33 24 33 24 28L24 12C24 9 20 9 20 12L20 26" fill="none" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round"/></svg>')
        },
        {
          id: 'ticket-machine',
          type: 'use',
          x: 2.46,
          y: 38.13,
          width: 12.92,
          height: 15.99,
          label: 'Ticket Machine',
          onInteract: "A take-a-number machine. It's jammed. Even in death, the machines don't work.",
          acceptsItem: 'bent-paperclip',
          useItemText: "I jam the paperclip into the mechanism and... *CLUNK*. It spits out a number. 2,147,483,647. Lucky me.",
          wrongItemText: "That's not going to unjam a ticket machine.",
          onUseItem: function() { Game.setFlag('hasTicketNumber', true); }
        },
        {
          id: 'poster-1',
          type: 'look',
          x: 18.2,
          y: 27.18,
          width: 6.89,
          height: 16.11,
          label: 'Motivational Poster',
          onInteract: "A motivational poster reads 'Hang in there!' Underneath, someone scrawled 'for eternity.'"
        },
        {
          id: 'poster-2',
          type: 'look',
          x: 25.34,
          y: 45.51,
          width: 4.8,
          height: 8.98,
          label: 'Another Poster',
          onInteract: "'Every day is a gift!' ...The return policy here is terrible though."
        },
        {
          id: 'waiting-chairs',
          type: 'look',
          x: 24.11,
          y: 53.26,
          width: 48.22,
          height: 21.03,
          label: 'Waiting Chairs',
          onInteract: "Plastic chairs bolted to the floor. At least I can't feel my legs anymore. Wait, can I?"
        },
        {
          id: 'water-cooler',
          type: 'look',
          x: 13.41,
          y: 50.43,
          width: 9.84,
          height: 30.63,
          label: 'Water Cooler',
          onInteract: 'The water cooler is empty. Figures. Even the water moved on before I did.'
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 95.08,
          y: 1.48,
          width: 4.31,
          height: 98.03,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'front-desk': {
      id: 'front-desk',
      name: 'Front Desk',
      background: '#3a2a2a',
      backgroundImage: 'images/front-desk.png',
      sceneElements: [
        {
          id: 'clerk-sprite',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          image: 'images/clerk-sprite.png'
        }
      ],
      hotspots: [
        {
          id: 'clerk-npc',
          type: 'talk',
          x: 30.26,
          y: 33.21,
          width: 16.11,
          height: 27.92,
          label: 'The Clerk',
          dialogueId: 'clerk'
        },
        {
          id: 'desk-bell',
          type: 'look',
          x: 47.11,
          y: 64.82,
          width: 6.03,
          height: 6.4,
          label: 'Service Bell',
          onInteract: 'A service bell. I ring it. Nothing happens. I ring it again. Still nothing. Truly, this is the afterlife.'
        },
        {
          id: 'next-sign',
          type: 'look',
          x: 39.24,
          y: 60.89,
          width: 7.87,
          height: 10.82,
          label: '"NEXT" Sign',
          onInteract: "A neon 'NEXT' sign that's been stuck on the same number since 1987. Comforting."
        },
        {
          id: 'paperwork-pile',
          type: 'look',
          x: 62.73,
          y: 52.03,
          width: 11.56,
          height: 12.67,
          label: 'Pile of Paperwork',
          onInteract: 'A mountain of paperwork that would give a living person a heart attack. Good thing that ship has sailed.'
        },
        {
          id: 'exit-waiting',
          type: 'exit',
          x: 0.37,
          y: 3.69,
          width: 2.95,
          height: 92.87,
          target: 'waiting-room',
          label: 'Waiting Room'
        },
        {
          id: 'exit-break',
          type: 'exit',
          x: 96.31,
          y: 1.35,
          width: 2.71,
          height: 96.56,
          target: 'break-room',
          label: 'Break Room',
          requiredFlag: 'clerkGaveDirections',
          blockedText: "The Clerk clears his throat. \"You can't go back there without a number. Take a number from the machine in the Waiting Room first.\""
        },
        {
          id: 'exit-filing',
          type: 'exit',
          x: 76.38,
          y: 35.06,
          width: 11.44,
          height: 18.94,
          target: 'filing-room',
          label: 'Filing Room',
          exitStyle: 'door',
          requiredFlag: 'clerkGaveDirections',
          blockedText: "The Clerk blocks your path. \"Number first. Machine's in the Waiting Room. I don't make the rules.\""
        },
        {
          id: 'exit-manager',
          type: 'exit',
          x: 22.14,
          y: 35.42,
          width: 9.23,
          height: 26.94,
          target: 'manager-office',
          label: "Manager's Office",
          exitStyle: 'door',
          requiredFlag: 'clerkGaveDirections',
          blockedText: "The Clerk sighs. \"You can't see the Manager without a number. Policy is policy.\""
        }
      ]
    },

    'break-room': {
      id: 'break-room',
      name: 'Break Room',
      background: '#2a2a3a',
      backgroundImage: 'images/break-room.png',
      sceneElements: [
        {
          id: 'rubber-stamp-sprite',
          x: 15.25,
          y: 43.67,
          width: 5.66,
          height: 3.44,
          image: 'images/rubber-stamp.png',
          visibleWhen: { hasFlag: 'gotForm27B' },
          itemId: 'rubber-stamp'
        }
      ],
      hotspots: [
        {
          id: 'coffee-machine',
          type: 'look',
          x: 52.28,
          y: 34.07,
          width: 8.73,
          height: 14.15,
          label: 'Coffee Machine',
          onInteract: "A coffee machine that apparently dispenses 'existential dread' in three flavors. I'll take a dark roast."
        },
        {
          id: 'coffee-mug',
          type: 'pickup',
          x: 35.55,
          y: 42.8,
          width: 3.81,
          height: 5.66,
          label: 'Coffee Mug',
          itemId: 'coffee-mug',
          itemDescription: "A mug that says 'I Survived the Afterlife and All I Got Was This Lousy Mug.' Classic.",
          itemIcon: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="18" height="20" rx="3" fill="#d4a574"/><rect x="26" y="18" width="8" height="10" rx="4" fill="none" stroke="#d4a574" stroke-width="2.5"/><path d="M10 14Q12 8 17 10Q22 6 24 14" fill="none" stroke="#e5e7eb" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/></svg>')
        },
        {
          id: 'vending-machine',
          type: 'use',
          x: 64.45,
          y: 29.15,
          width: 20.3,
          height: 36.29,
          label: 'Vending Machine',
          onInteract: "A vending machine. Something's stuck behind the glass. The afterlife really is just one big metaphor.",
          acceptsItem: null
        },
        {
          id: 'break-table',
          type: 'look',
          x: 21.77,
          y: 60.52,
          width: 58.06,
          height: 11.81,
          label: 'Break Table',
          onInteract: 'A break table covered in coffee rings and centuries of despair. So, a regular break table.'
        },
        {
          id: 'lost-found-box',
          type: 'look',
          x: 10.21,
          y: 42.93,
          width: 16.11,
          height: 22.02,
          label: 'Lost & Found Box',
          onInteract: "A Lost and Found box. 'Lost: my will to live. Found: irony.'"
        },
        {
          id: 'rubber-stamp',
          type: 'pickup',
          x: 15.25,
          y: 43.67,
          width: 5.66,
          height: 3.44,
          label: 'Rubber Stamp',
          itemId: 'rubber-stamp',
          itemDescription: "An official rubber stamp. Property of the Manager's Office. Probably shouldn't have been in the Lost and Found.",
          itemIcon: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="6" width="16" height="14" rx="3" fill="#7c3aed"/><rect x="16" y="14" width="8" height="8" fill="#6d28d9"/><rect x="6" y="28" width="28" height="8" rx="2" fill="#4c1d95"/><rect x="10" y="22" width="20" height="6" rx="1" fill="#5b21b6"/></svg>'),
          visibleWhen: { hasFlag: 'gotForm27B' }
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 0.86,
          y: 5.17,
          width: 4.06,
          height: 93.85,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'filing-room': {
      id: 'filing-room',
      name: 'Filing Room',
      background: '#3a3a2a',
      backgroundImage: 'images/filing-room.png',
      hotspots: [
        {
          id: 'cabinet-npc',
          type: 'talk',
          x: 41.7,
          y: 23.86,
          width: 19.31,
          height: 52.4,
          label: 'The Chronicler',
          dialogueId: 'cabinet'
        },
        {
          id: 'cabinet-row-left',
          type: 'look',
          x: 10.7,
          y: 14.27,
          width: 12.55,
          height: 73.55,
          label: 'Filing Cabinets (Left)',
          onInteract: "Rows and rows of filing cabinets. Each one holds someone's entire existence. Mine's probably misfiled under 'G' for 'Gray' or 'Grievous Accident.'"
        },
        {
          id: 'cabinet-row-right',
          type: 'look',
          x: 75.89,
          y: 12.55,
          width: 21.4,
          height: 79.34,
          label: 'Filing Cabinets (Right)',
          onInteract: "More filing cabinets. These ones are labeled 'H through N.' The Chronicler keeps a tight ship."
        },
        {
          id: 'dusty-floor',
          type: 'look',
          x: 33.7,
          y: 78.35,
          width: 34.56,
          height: 19.8,
          label: 'Dusty Floor',
          onInteract: 'The floor is covered in a fine layer of dust. At least something here has settled.'
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 0.98,
          y: 4.43,
          width: 2.46,
          height: 93.6,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'manager-office': {
      id: 'manager-office',
      name: "Manager's Office",
      background: '#2e2a3e',
      backgroundImage: 'images/manager-office.png',
      sceneElements: [
        {
          id: 'manager-sprite',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          image: 'images/manager-sprite.png'
        }
      ],
      hotspots: [
        {
          id: 'manager-npc',
          type: 'talk',
          x: 64.51,
          y: 34.69,
          width: 17.84,
          height: 21.53,
          label: 'The Manager',
          dialogueId: 'manager'
        },
        {
          id: 'manager-desk',
          type: 'look',
          x: 32.47,
          y: 50.18,
          width: 53.26,
          height: 24.97,
          label: "Manager's Desk",
          onInteract: "A desk covered in motivational tchotchkes and a '#1 Boss' mug. Someone drank the Kool-Aid. And then died. And then kept drinking it."
        },
        {
          id: 'motivational-plaque',
          type: 'look',
          x: 61.99,
          y: 35.79,
          width: 4.18,
          height: 6.77,
          label: 'Motivational Plaque',
          onInteract: "A plaque reads 'Every Soul Counts!' with a tally mark system. There are... a lot of tally marks."
        },
        {
          id: 'potted-plant',
          type: 'look',
          x: 73.92,
          y: 23.49,
          width: 12.79,
          height: 13.78,
          label: 'Potted Plant',
          onInteract: "A fake potted plant. Even the plants here aren't alive. I'd say that's poetic if it weren't so on the nose."
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 19.68,
          y: 22.63,
          width: 12.67,
          height: 37.39,
          target: 'front-desk',
          label: 'Front Desk',
          exitStyle: 'door'
        }
      ]
    },

    'ending-screen': {
      id: 'ending-screen',
      name: 'The End',
      background: '#1a2e1a',
      backgroundImage: 'images/ending-scene.png',
      hotspots: [],
      isEnding: true
    }
  };

  window.Rooms = {
    getAll: function() {
      return rooms;
    }
  };
})();
