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

  // Audio Manager - procedural Web Audio API sounds
  var AudioManager = {
    ctx: null,
    muted: false,
    initialized: false,
    musicOscillators: [],
    musicGain: null,
    musicPlaying: false,
    noteIndex: 0,
    noteInterval: null,

    initOnInteraction: function() {
      if (this.initialized) return;
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
        console.log('Audio initialized');
      } catch (e) {
        console.warn('Web Audio API not available:', e);
      }
    },

    playMusic: function() {
      if (!this.ctx || this.musicPlaying) return;
      this.musicPlaying = true;

      // Create a gentle ambient drone with two detuned oscillators
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.musicGain.gain.linearRampToValueAtTime(this.muted ? 0 : 0.06, this.ctx.currentTime + 1);
      this.musicGain.connect(this.ctx.destination);

      var osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc1.connect(this.musicGain);
      osc1.start();

      var osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(221, this.ctx.currentTime);
      osc2.connect(this.musicGain);
      osc2.start();

      this.musicOscillators = [osc1, osc2];

      // Slowly modulate the frequency for a gentle ambient feel
      var notes = [220, 247, 262, 247, 220, 196, 220, 262];
      var self = this;
      this.noteIndex = 0;
      this.noteInterval = setInterval(function() {
        if (!self.ctx || !self.musicPlaying) return;
        var note = notes[self.noteIndex % notes.length];
        var t = self.ctx.currentTime;
        osc1.frequency.linearRampToValueAtTime(note, t + 2);
        osc2.frequency.linearRampToValueAtTime(note + 1, t + 2);
        self.noteIndex++;
      }, 4000);
    },

    stopMusic: function() {
      if (!this.musicPlaying) return;
      this.musicPlaying = false;
      if (this.noteInterval) {
        clearInterval(this.noteInterval);
        this.noteInterval = null;
      }
      if (this.musicGain) {
        this.musicGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      }
      var oscs = this.musicOscillators;
      var ctx = this.ctx;
      setTimeout(function() {
        oscs.forEach(function(o) { try { o.stop(); } catch(e) {} });
      }, 600);
      this.musicOscillators = [];
      this.musicGain = null;
    },

    playSound: function(name) {
      if (!this.ctx || this.muted) return;
      var ctx = this.ctx;
      var t = ctx.currentTime;

      if (name === 'pickup') {
        // Rising tone: 300->600Hz over 150ms
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.linearRampToValueAtTime(600, t + 0.15);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      } else if (name === 'door') {
        // Low filtered noise whoosh
        var bufferSize = ctx.sampleRate * 0.3;
        var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1);
        }
        var noise = ctx.createBufferSource();
        noise.buffer = buffer;
        var filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, t);
        filter.Q.setValueAtTime(1, t);
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.08);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.35);
      } else if (name === 'dialogue') {
        // Two quick chime tones
        var osc1 = ctx.createOscillator();
        var gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523, t);
        gain1.gain.setValueAtTime(0.12, t);
        gain1.gain.linearRampToValueAtTime(0, t + 0.1);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(t);
        osc1.stop(t + 0.12);

        var osc2 = ctx.createOscillator();
        var gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659, t + 0.08);
        gain2.gain.setValueAtTime(0, t);
        gain2.gain.setValueAtTime(0.12, t + 0.08);
        gain2.gain.linearRampToValueAtTime(0, t + 0.18);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(t + 0.08);
        osc2.stop(t + 0.2);
      } else if (name === 'completion') {
        // Ascending arpeggio: C-E-G-C
        var freqs = [262, 330, 392, 523];
        freqs.forEach(function(freq, i) {
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + i * 0.12);
          gain.gain.setValueAtTime(0, t);
          gain.gain.setValueAtTime(0.15, t + i * 0.12);
          gain.gain.linearRampToValueAtTime(0, t + i * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t + i * 0.12);
          osc.stop(t + i * 0.12 + 0.3);
        });
      }
    },

    toggleMute: function() {
      this.muted = !this.muted;
      if (this.musicGain && this.ctx) {
        this.musicGain.gain.linearRampToValueAtTime(
          this.muted ? 0 : 0.06,
          this.ctx.currentTime + 0.1
        );
      }
      // Update button icon
      var btn = document.getElementById('mute-toggle');
      if (btn) {
        btn.textContent = this.muted ? '\u{1F507}' : '\u{1F50A}';
      }
      console.log('Audio muted:', this.muted);
    }
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

      if (Game.playSound) Game.playSound('door');

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
      // Initialize audio on first user interaction and start music
      AudioManager.initOnInteraction();
      this.startMusic();
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

      // Restart music
      AudioManager.initOnInteraction();
      this.startMusic();

      // Update inventory display if available
      if (typeof Inventory !== 'undefined' && Inventory.render) {
        Inventory.render();
      }

      this.showTitleScreen();
    },

    // Trigger ending sequence
    triggerEnding: function() {
      var self = this;
      this.stopMusic();
      this.changeScene('ending-screen');

      // Wait for scene transition to complete
      setTimeout(function() {
        self.showEndingScreen();
        if (Game.playSound) Game.playSound('completion');
      }, 400);
    },

    // Audio API
    playSound: function(name) { AudioManager.playSound(name); },
    toggleMute: function() { AudioManager.toggleMute(); },
    startMusic: function() { AudioManager.playMusic(); },
    stopMusic: function() { AudioManager.stopMusic(); },

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
