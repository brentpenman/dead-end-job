// Dead End Job - Game State Manager
// Central game state and scene management

(function() {
  'use strict';

  var GameState = {
    currentScene: 'test-room-a',
    inventory: [],
    flags: {},
    scenes: {}
  };

  window.Game = {
    // Initialize game
    init: function() {
      console.log('Game initializing...');
      this.registerTestScenes();
      Scene.render(GameState.currentScene);
      console.log('Game initialized');
    },

    // Register test scenes for Phase 1 verification
    registerTestScenes: function() {
      GameState.scenes['test-room-a'] = {
        id: 'test-room-a',
        name: 'Test Room A',
        background: '#2a3a4a',
        hotspots: [
          {
            id: 'exit-to-b',
            type: 'exit',
            x: 80,
            y: 40,
            width: 15,
            height: 50,
            target: 'test-room-b',
            label: 'Door to Room B'
          },
          {
            id: 'poster',
            type: 'look',
            x: 10,
            y: 20,
            width: 12,
            height: 15,
            label: 'Faded poster',
            onInteract: 'A motivational poster reads: "Hang in there!"'
          },
          {
            id: 'npc-bob',
            type: 'talk',
            x: 40,
            y: 30,
            width: 10,
            height: 40,
            label: 'Bob',
            dialogueId: 'bob-intro'
          }
        ]
      };

      GameState.scenes['test-room-b'] = {
        id: 'test-room-b',
        name: 'Test Room B',
        background: '#4a2a3a',
        hotspots: [
          {
            id: 'exit-to-a',
            type: 'exit',
            x: 5,
            y: 40,
            width: 15,
            height: 50,
            target: 'test-room-a',
            label: 'Door to Room A'
          },
          {
            id: 'window',
            type: 'look',
            x: 50,
            y: 10,
            width: 20,
            height: 25,
            label: 'Window',
            onInteract: 'Through the grimy window, you see the city lights far below.'
          },
          {
            id: 'coffee-cup',
            type: 'pickup',
            x: 70,
            y: 60,
            width: 8,
            height: 10,
            label: 'Coffee cup',
            itemId: 'coffee-cup'
          }
        ]
      };
    },

    // Scene transition
    changeScene: function(sceneId) {
      if (!GameState.scenes[sceneId]) {
        console.error('Scene not found:', sceneId);
        return;
      }

      var container = document.getElementById('scene-container');
      container.classList.add('scene-fade-out');

      setTimeout(function() {
        GameState.currentScene = sceneId;
        Scene.render(sceneId);
        container.classList.remove('scene-fade-out');
        container.classList.add('scene-fade-in');
      }, 400);
    },

    // Inventory management
    addItem: function(item) {
      if (!this.hasItem(item.id)) {
        GameState.inventory.push(item);
        console.log('Added item:', item.name);
        return true;
      }
      return false;
    },

    removeItem: function(itemId) {
      var index = GameState.inventory.findIndex(function(item) {
        return item.id === itemId;
      });
      if (index !== -1) {
        var removed = GameState.inventory.splice(index, 1)[0];
        console.log('Removed item:', removed.name);
        return true;
      }
      return false;
    },

    hasItem: function(itemId) {
      return GameState.inventory.some(function(item) {
        return item.id === itemId;
      });
    },

    // Game state flags
    setFlag: function(key, value) {
      GameState.flags[key] = value;
      console.log('Flag set:', key, '=', value);
    },

    getFlag: function(key) {
      return GameState.flags[key];
    },

    // Text feedback display
    showText: function(text) {
      var display = document.getElementById('text-display');
      display.textContent = text;
      display.classList.add('visible');

      setTimeout(function() {
        display.classList.remove('visible');
      }, 3000);
    },

    // Get current scene data
    getScene: function(sceneId) {
      return GameState.scenes[sceneId || GameState.currentScene];
    },

    // Get current scene ID
    getCurrentSceneId: function() {
      return GameState.currentScene;
    }
  };

})();
