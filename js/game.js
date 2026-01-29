// Dead End Job - Game State Manager
// Central game state and scene management

(function() {
  'use strict';

  var GameState = {
    currentScene: 'title-screen',
    inventory: [],
    flags: {},
    scenes: {}
  };

  window.Game = {
    // Initialize game
    init: function() {
      console.log('Game initializing...');
      this.registerRooms();
      Scene.render(GameState.currentScene);

      // Initialize inventory system if available
      if (typeof Inventory !== 'undefined' && Inventory.init) {
        Inventory.init();
      }

      // Initialize dialogue system if available
      if (typeof Dialogue !== 'undefined' && Dialogue.init) {
        Dialogue.init();
      }

      // Register all NPC dialogues
      if (typeof Dialogues !== 'undefined' && Dialogues.registerAll) {
        Dialogues.registerAll();
      }

      // Show title screen if on title scene
      var currentScene = this.getScene();
      if (currentScene && currentScene.isTitle) {
        this.showTitleScreen();
      }

      console.log('Game initialized');
    },

    // Register all rooms from Rooms module
    registerRooms: function() {
      var allRooms = Rooms.getAll();
      for (var id in allRooms) {
        if (allRooms.hasOwnProperty(id)) {
          GameState.scenes[id] = allRooms[id];
        }
      }
      console.log('Registered', Object.keys(GameState.scenes).length, 'rooms');
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

    getInventory: function() {
      return GameState.inventory;
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
    },

    // Show title screen overlay
    showTitleScreen: function() {
      var container = document.getElementById('scene-container');
      var overlay = document.createElement('div');
      overlay.className = 'title-overlay';

      overlay.style.background = 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 100%)';

      var title = document.createElement('h1');
      title.textContent = 'Dead End Job';

      var subtitle = document.createElement('p');
      subtitle.textContent = 'A Pointless Adventure in the Afterlife';

      var button = document.createElement('button');
      button.textContent = 'New Game';
      button.onclick = function() {
        Game.startGame();
      };

      overlay.appendChild(title);
      overlay.appendChild(subtitle);
      overlay.appendChild(button);
      container.appendChild(overlay);
    },

    // Start the game
    startGame: function() {
      var overlay = document.querySelector('.title-overlay');
      if (overlay) {
        overlay.remove();
      }
      this.changeScene('waiting-room');
    },

    // Show ending screen overlay
    showEndingScreen: function() {
      var container = document.getElementById('scene-container');
      var overlay = document.createElement('div');
      overlay.className = 'ending-overlay';
      overlay.style.background = 'radial-gradient(ellipse at center, rgba(255,200,50,0.15) 0%, rgba(0,0,0,0.7) 100%)';

      var title = document.createElement('h1');
      title.textContent = 'FORM 27-B: APPROVED';

      var p1 = document.createElement('p');
      p1.textContent = "Congratulations! You've successfully navigated the Afterlife Processing Department.";

      var p2 = document.createElement('p');
      p2.textContent = 'Morgan Gray can finally move on... to whatever comes next.';

      var button = document.createElement('button');
      button.textContent = 'Play Again';
      button.onclick = function() {
        Game.restartGame();
      };

      overlay.appendChild(title);
      overlay.appendChild(p1);
      overlay.appendChild(p2);
      overlay.appendChild(button);
      container.appendChild(overlay);
    },

    // Restart the game
    restartGame: function() {
      var overlay = document.querySelector('.ending-overlay');
      if (overlay) {
        overlay.remove();
      }

      // Reset game state
      GameState.inventory = [];
      GameState.flags = {};
      GameState.currentScene = 'title-screen';

      // Re-render title screen
      Scene.render('title-screen');

      // Update inventory display if available
      if (typeof Inventory !== 'undefined' && Inventory.render) {
        Inventory.render();
      }

      this.showTitleScreen();
    },

    // Trigger ending sequence
    triggerEnding: function() {
      var self = this;
      this.changeScene('ending-screen');

      // Wait for scene transition to complete
      setTimeout(function() {
        self.showEndingScreen();
      }, 400);
    },

    // Scene render hook for visibility gating
    onSceneRender: function(sceneId) {
      // Hide hotspots based on puzzle state
      var container = document.getElementById('scene-container');
      var hotspots = container.querySelectorAll('.hotspot');

      hotspots.forEach(function(el) {
        var data = el._hotspotData;
        if (!data) return;

        // Check visibleWhen condition
        if (data.visibleWhen) {
          var visible = true;
          if (data.visibleWhen.hasFlag) {
            visible = !!Game.getFlag(data.visibleWhen.hasFlag);
          }
          if (data.visibleWhen.notFlag) {
            visible = !Game.getFlag(data.visibleWhen.notFlag);
          }
          if (!visible) {
            el.style.display = 'none';
          }
        }

        // Hide pickup hotspots for items already in inventory
        if (data.type === 'pickup' && data.itemId && Game.hasItem(data.itemId)) {
          el.style.display = 'none';
        }
      });
    }
  };

})();
