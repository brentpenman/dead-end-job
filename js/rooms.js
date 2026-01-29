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
          id: 'ticket-machine',
          type: 'use',
          x: 65,
          y: 30,
          width: 12,
          height: 35,
          label: 'Ticket Machine',
          onInteract: 'A broken take-a-number machine.',
          acceptsItem: null
        },
        {
          id: 'poster-1',
          type: 'look',
          x: 10,
          y: 15,
          width: 12,
          height: 18,
          label: 'Motivational Poster',
          onInteract: 'A poster.'
        },
        {
          id: 'poster-2',
          type: 'look',
          x: 25,
          y: 12,
          width: 10,
          height: 15,
          label: 'Another Poster',
          onInteract: 'Another poster.'
        },
        {
          id: 'waiting-chairs',
          type: 'look',
          x: 35,
          y: 55,
          width: 25,
          height: 25,
          label: 'Waiting Chairs',
          onInteract: 'Plastic chairs.'
        },
        {
          id: 'water-cooler',
          type: 'look',
          x: 5,
          y: 40,
          width: 8,
          height: 30,
          label: 'Water Cooler',
          onInteract: 'A water cooler.'
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
          onInteract: 'A bell.'
        },
        {
          id: 'next-sign',
          type: 'look',
          x: 30,
          y: 8,
          width: 20,
          height: 10,
          label: '"NEXT" Sign',
          onInteract: 'A sign.'
        },
        {
          id: 'paperwork-pile',
          type: 'look',
          x: 60,
          y: 40,
          width: 15,
          height: 20,
          label: 'Pile of Paperwork',
          onInteract: 'Paperwork.'
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
          onInteract: 'A coffee machine.'
        },
        {
          id: 'vending-machine',
          type: 'use',
          x: 60,
          y: 15,
          width: 15,
          height: 45,
          label: 'Vending Machine',
          onInteract: 'A vending machine.',
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
          onInteract: 'A table.'
        },
        {
          id: 'lost-found-box',
          type: 'look',
          x: 80,
          y: 60,
          width: 12,
          height: 18,
          label: 'Lost & Found Box',
          onInteract: 'A box.'
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
          itemDescription: 'An official-looking rubber stamp.',
          itemIcon: null
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
          onInteract: 'Cabinets.'
        },
        {
          id: 'cabinet-row-right',
          type: 'look',
          x: 75,
          y: 10,
          width: 15,
          height: 60,
          label: 'Filing Cabinets (Right)',
          onInteract: 'Cabinets.'
        },
        {
          id: 'dusty-floor',
          type: 'look',
          x: 25,
          y: 70,
          width: 40,
          height: 15,
          label: 'Dusty Floor',
          onInteract: 'The floor.'
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
          onInteract: 'A desk.'
        },
        {
          id: 'motivational-plaque',
          type: 'look',
          x: 65,
          y: 15,
          width: 12,
          height: 12,
          label: 'Motivational Plaque',
          onInteract: 'A plaque.'
        },
        {
          id: 'potted-plant',
          type: 'look',
          x: 75,
          y: 55,
          width: 10,
          height: 25,
          label: 'Potted Plant',
          onInteract: 'A plant.'
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
