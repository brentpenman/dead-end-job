// Dead End Job - Scene Rendering and Hotspot Management

(function() {
  'use strict';

  window.Scene = {
    // Render a scene by ID
    render: function(sceneId) {
      var sceneData = Game.getScene(sceneId);
      if (!sceneData) {
        console.error('Scene not found:', sceneId);
        return;
      }

      console.log('Rendering scene:', sceneData.name);

      var container = document.getElementById('scene-container');
      container.innerHTML = '';

      // Create background
      var background = document.createElement('div');
      background.className = 'scene-background';
      background.style.backgroundColor = sceneData.background;
      if (sceneData.backgroundImage) {
        background.style.backgroundImage = 'url(' + sceneData.backgroundImage + ')';
      }
      container.appendChild(background);

      // Create hotspots
      if (sceneData.hotspots) {
        sceneData.hotspots.forEach(function(hotspotData) {
          var hotspot = Scene.createHotspot(hotspotData);
          container.appendChild(hotspot);
        });
      }
    },

    // Create a hotspot element
    createHotspot: function(data) {
      var hotspot = document.createElement('div');
      hotspot.className = 'hotspot';
      hotspot.style.left = data.x + '%';
      hotspot.style.top = data.y + '%';
      hotspot.style.width = data.width + '%';
      hotspot.style.height = data.height + '%';
      hotspot.title = data.label || '';

      // Store hotspot data on element
      hotspot._hotspotData = data;

      // Cursor changes on hover
      hotspot.addEventListener('mouseenter', function() {
        Cursor.setMode(Scene.getCursorModeForHotspot(data.type));
      });

      hotspot.addEventListener('mouseleave', function() {
        Cursor.reset();
      });

      // Click interaction
      hotspot.addEventListener('click', function() {
        Scene.handleHotspotClick(data);
      });

      return hotspot;
    },

    // Map hotspot type to cursor mode
    getCursorModeForHotspot: function(type) {
      var modeMap = {
        'look': 'look',
        'exit': 'exit',
        'talk': 'talk',
        'pickup': 'use',
        'use': 'use'
      };
      return modeMap[type] || 'default';
    },

    // Handle hotspot click
    handleHotspotClick: function(hotspot) {
      console.log('Hotspot clicked:', hotspot.label, '(type:', hotspot.type + ')');

      // Check if player has an inventory item selected
      if (typeof Inventory !== 'undefined' && Inventory.getSelected && Inventory.getSelected()) {
        // Player is trying to use selected item on this hotspot
        Inventory.useOnHotspot(hotspot);
        return;
      }

      switch (hotspot.type) {
        case 'exit':
          if (hotspot.target) {
            Game.changeScene(hotspot.target);
          } else {
            console.error('Exit hotspot missing target:', hotspot.id);
          }
          break;

        case 'look':
          if (hotspot.onInteract) {
            Game.showText(hotspot.onInteract);
          }
          break;

        case 'talk':
          if (typeof Dialogue !== 'undefined' && Dialogue.open) {
            Dialogue.open(hotspot.dialogueId);
          } else {
            Game.showText('(Dialogue system not yet available)');
          }
          break;

        case 'pickup':
          if (typeof Inventory !== 'undefined' && Inventory.pickUp) {
            Inventory.pickUp(hotspot);
          } else {
            Game.showText('(Inventory system not yet available)');
          }
          break;

        case 'use':
          // Use hotspot without selected item - show examine text
          if (hotspot.onInteract) {
            Game.showText(hotspot.onInteract);
          } else {
            Game.showText('I need the right item to use this.');
          }
          break;

        default:
          console.warn('Unknown hotspot type:', hotspot.type);
      }
    }
  };

})();
