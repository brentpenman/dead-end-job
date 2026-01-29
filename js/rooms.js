// Dead End Job - Room Definitions
// All game rooms, title screen, and ending screen

(function() {
  'use strict';

  var rooms = {
    'title-screen': {
      id: 'title-screen',
      name: 'Dead End Job',
      background: '#1a1a2e',
      hotspots: [],
      isTitle: true
    },

    'waiting-room': {
      id: 'waiting-room',
      name: 'Waiting Room',
      background: '#2a3a2a',
      hotspots: [
        {
          id: 'bent-paperclip',
          type: 'pickup',
          x: 48,
          y: 72,
          width: 5,
          height: 6,
          label: 'Bent Paperclip',
          itemId: 'bent-paperclip',
          itemDescription: "A bent paperclip. Somebody's been stress-fiddling. Can't blame them -- eternity is long.",
          itemIcon: null
        },
        {
          id: 'ticket-machine',
          type: 'use',
          x: 65,
          y: 30,
          width: 12,
          height: 35,
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
          x: 10,
          y: 15,
          width: 12,
          height: 18,
          label: 'Motivational Poster',
          onInteract: "A motivational poster reads 'Hang in there!' Underneath, someone scrawled 'for eternity.'"
        },
        {
          id: 'poster-2',
          type: 'look',
          x: 25,
          y: 12,
          width: 10,
          height: 15,
          label: 'Another Poster',
          onInteract: "'Every day is a gift!' ...The return policy here is terrible though."
        },
        {
          id: 'waiting-chairs',
          type: 'look',
          x: 35,
          y: 55,
          width: 25,
          height: 25,
          label: 'Waiting Chairs',
          onInteract: "Plastic chairs bolted to the floor. At least I can't feel my legs anymore. Wait, can I?"
        },
        {
          id: 'water-cooler',
          type: 'look',
          x: 5,
          y: 40,
          width: 8,
          height: 30,
          label: 'Water Cooler',
          onInteract: 'The water cooler is empty. Figures. Even the water moved on before I did.'
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 80,
          y: 25,
          width: 15,
          height: 55,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'front-desk': {
      id: 'front-desk',
      name: 'Front Desk',
      background: '#3a2a2a',
      hotspots: [
        {
          id: 'clerk-npc',
          type: 'talk',
          x: 35,
          y: 20,
          width: 15,
          height: 45,
          label: 'The Clerk',
          dialogueId: 'clerk'
        },
        {
          id: 'desk-bell',
          type: 'look',
          x: 55,
          y: 55,
          width: 8,
          height: 8,
          label: 'Service Bell',
          onInteract: 'A service bell. I ring it. Nothing happens. I ring it again. Still nothing. Truly, this is the afterlife.'
        },
        {
          id: 'next-sign',
          type: 'look',
          x: 30,
          y: 8,
          width: 20,
          height: 10,
          label: '"NEXT" Sign',
          onInteract: "A neon 'NEXT' sign that's been stuck on the same number since 1987. Comforting."
        },
        {
          id: 'paperwork-pile',
          type: 'look',
          x: 60,
          y: 40,
          width: 15,
          height: 20,
          label: 'Pile of Paperwork',
          onInteract: 'A mountain of paperwork that would give a living person a heart attack. Good thing that ship has sailed.'
        },
        {
          id: 'exit-waiting',
          type: 'exit',
          x: 0,
          y: 30,
          width: 10,
          height: 50,
          target: 'waiting-room',
          label: 'Waiting Room'
        },
        {
          id: 'exit-break',
          type: 'exit',
          x: 85,
          y: 60,
          width: 12,
          height: 30,
          target: 'break-room',
          label: 'Break Room'
        },
        {
          id: 'exit-filing',
          type: 'exit',
          x: 85,
          y: 15,
          width: 12,
          height: 30,
          target: 'filing-room',
          label: 'Filing Room'
        },
        {
          id: 'exit-manager',
          type: 'exit',
          x: 45,
          y: 0,
          width: 15,
          height: 12,
          target: 'manager-office',
          label: "Manager's Office"
        }
      ]
    },

    'break-room': {
      id: 'break-room',
      name: 'Break Room',
      background: '#2a2a3a',
      hotspots: [
        {
          id: 'coffee-machine',
          type: 'look',
          x: 15,
          y: 25,
          width: 12,
          height: 30,
          label: 'Coffee Machine',
          onInteract: "A coffee machine that apparently dispenses 'existential dread' in three flavors. I'll take a dark roast."
        },
        {
          id: 'coffee-mug',
          type: 'pickup',
          x: 20,
          y: 50,
          width: 6,
          height: 8,
          label: 'Coffee Mug',
          itemId: 'coffee-mug',
          itemDescription: "A mug that says 'I Survived the Afterlife and All I Got Was This Lousy Mug.' Classic.",
          itemIcon: null
        },
        {
          id: 'vending-machine',
          type: 'use',
          x: 60,
          y: 15,
          width: 15,
          height: 45,
          label: 'Vending Machine',
          onInteract: "A vending machine. Something's stuck behind the glass. The afterlife really is just one big metaphor.",
          acceptsItem: null
        },
        {
          id: 'break-table',
          type: 'look',
          x: 30,
          y: 50,
          width: 25,
          height: 25,
          label: 'Break Table',
          onInteract: 'A break table covered in coffee rings and centuries of despair. So, a regular break table.'
        },
        {
          id: 'lost-found-box',
          type: 'look',
          x: 80,
          y: 60,
          width: 12,
          height: 18,
          label: 'Lost & Found Box',
          onInteract: "A Lost and Found box. 'Lost: my will to live. Found: irony.'"
        },
        {
          id: 'rubber-stamp',
          type: 'pickup',
          x: 42,
          y: 42,
          width: 6,
          height: 6,
          label: 'Rubber Stamp',
          itemId: 'rubber-stamp',
          itemDescription: "An official rubber stamp. Property of the Manager's Office. Probably shouldn't have been in the Lost and Found.",
          itemIcon: null,
          visibleWhen: { hasFlag: 'clerkSentToManager' }
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 0,
          y: 30,
          width: 10,
          height: 50,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'filing-room': {
      id: 'filing-room',
      name: 'Filing Room',
      background: '#3a3a2a',
      hotspots: [
        {
          id: 'cabinet-npc',
          type: 'talk',
          x: 40,
          y: 15,
          width: 18,
          height: 50,
          label: 'Sentient Filing Cabinet',
          dialogueId: 'cabinet'
        },
        {
          id: 'cabinet-row-left',
          type: 'look',
          x: 5,
          y: 10,
          width: 15,
          height: 60,
          label: 'Filing Cabinets (Left)',
          onInteract: "Rows and rows of filing cabinets. Each one holds someone's entire existence. Mine's probably misfiled under 'G' for 'Gray' or 'Grievous Accident.'"
        },
        {
          id: 'cabinet-row-right',
          type: 'look',
          x: 75,
          y: 10,
          width: 15,
          height: 60,
          label: 'Filing Cabinets (Right)',
          onInteract: "More filing cabinets. These ones are labeled 'H through N.' I wonder if they're all this chatty."
        },
        {
          id: 'dusty-floor',
          type: 'look',
          x: 25,
          y: 70,
          width: 40,
          height: 15,
          label: 'Dusty Floor',
          onInteract: 'The floor is covered in a fine layer of dust. At least something here has settled.'
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 0,
          y: 30,
          width: 10,
          height: 50,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'manager-office': {
      id: 'manager-office',
      name: "Manager's Office",
      background: '#2e2a3e',
      hotspots: [
        {
          id: 'manager-npc',
          type: 'talk',
          x: 35,
          y: 15,
          width: 15,
          height: 45,
          label: 'The Manager',
          dialogueId: 'manager'
        },
        {
          id: 'manager-desk',
          type: 'look',
          x: 25,
          y: 50,
          width: 30,
          height: 20,
          label: "Manager's Desk",
          onInteract: "A desk covered in motivational tchotchkes and a '#1 Boss' mug. Someone drank the Kool-Aid. And then died. And then kept drinking it."
        },
        {
          id: 'motivational-plaque',
          type: 'look',
          x: 65,
          y: 15,
          width: 12,
          height: 12,
          label: 'Motivational Plaque',
          onInteract: "A plaque reads 'Every Soul Counts!' with a tally mark system. There are... a lot of tally marks."
        },
        {
          id: 'potted-plant',
          type: 'look',
          x: 75,
          y: 55,
          width: 10,
          height: 25,
          label: 'Potted Plant',
          onInteract: "A fake potted plant. Even the plants here aren't alive. I'd say that's poetic if it weren't so on the nose."
        },
        {
          id: 'exit-front-desk',
          type: 'exit',
          x: 0,
          y: 30,
          width: 10,
          height: 50,
          target: 'front-desk',
          label: 'Front Desk'
        }
      ]
    },

    'ending-screen': {
      id: 'ending-screen',
      name: 'The End',
      background: '#1a2e1a',
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
