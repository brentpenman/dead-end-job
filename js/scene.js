// Dead End Job - Scene Rendering and Hotspot Management

(function() {
  'use strict';

  // Track current overlay and image for resize handling
  var _currentImg = null;
  var _currentOverlay = null;

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

      // Create background wrapper
      var background = document.createElement('div');
      background.className = 'scene-background';
      background.style.backgroundColor = sceneData.background;

      // Create <img> instead of CSS background-image
      if (sceneData.backgroundImage) {
        var bgImg = document.createElement('img');
        bgImg.className = 'bg-image';
        bgImg.src = sceneData.backgroundImage;
        bgImg.alt = sceneData.name;
        background.appendChild(bgImg);
      }
      container.appendChild(background);

      // Create scene overlay — all interactive/visual elements go here
      var overlay = document.createElement('div');
      overlay.className = 'scene-overlay';
      overlay.id = 'scene-overlay';
      container.appendChild(overlay);

      // Create scene elements (NPC sprites, decorations) inside overlay
      if (sceneData.sceneElements) {
        sceneData.sceneElements.forEach(function(elemData) {
          var elem = document.createElement('div');
          elem.className = 'scene-element';
          elem.style.position = 'absolute';
          elem.style.left = elemData.x + '%';
          elem.style.top = elemData.y + '%';
          elem.style.width = elemData.width + '%';
          elem.style.height = elemData.height + '%';
          elem.style.pointerEvents = 'none';
          elem.style.zIndex = '1';
          elem._elementData = elemData;
          if (elemData.image) {
            var img = document.createElement('img');
            img.src = elemData.image;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            elem.appendChild(img);
          } else if (elemData.svg) {
            var img = document.createElement('img');
            img.src = 'data:image/svg+xml,' + encodeURIComponent(elemData.svg);
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))';
            elem.appendChild(img);
          }
          overlay.appendChild(elem);
        });
      }

      // Create hotspots inside overlay
      if (sceneData.hotspots) {
        sceneData.hotspots.forEach(function(hotspotData) {
          var hotspot = Scene.createHotspot(hotspotData);
          overlay.appendChild(hotspot);
        });
      }

      // Position overlay to match rendered image
      _currentImg = bgImg || null;
      _currentOverlay = overlay;

      if (_currentImg) {
        // If image is already loaded (cached), position immediately
        if (_currentImg.complete && _currentImg.naturalWidth > 0) {
          Scene.positionOverlay(_currentImg, overlay);
        }
        _currentImg.addEventListener('load', function() {
          Scene.positionOverlay(_currentImg, overlay);
        });
      } else {
        // No background image — overlay fills container
        overlay.style.left = '0px';
        overlay.style.top = '0px';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
      }

      // Apply visibility gating from game state
      if (Game.onSceneRender) {
        Game.onSceneRender(sceneId);
      }
    },

    // Position the overlay div to exactly match the rendered image rect
    positionOverlay: function(img, overlay) {
      var imgRect = img.getBoundingClientRect();
      var containerRect = img.closest('#scene-container').getBoundingClientRect();

      overlay.style.left = (imgRect.left - containerRect.left) + 'px';
      overlay.style.top = (imgRect.top - containerRect.top) + 'px';
      overlay.style.width = imgRect.width + 'px';
      overlay.style.height = imgRect.height + 'px';
    },

    // Debounced resize handler to keep overlay aligned
    initResizeHandler: function() {
      var resizeTimer = null;
      window.addEventListener('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if (_currentImg && _currentOverlay) {
            Scene.positionOverlay(_currentImg, _currentOverlay);
          }
        }, 100);
      });
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

      // Z-index hierarchy: interactive hotspots above passive ones
      var zIndexMap = {
        'pickup': 5,
        'talk': 4,
        'use': 3,
        'exit': 2,
        'look': 1
      };
      hotspot.style.zIndex = zIndexMap[data.type] || 1;

      // Apply type-specific cursor class directly on the hotspot
      var cursorMode = data.cursorStyle || Scene.getCursorModeForHotspot(data.type);
      // Use appropriate cursor for exit type and position
      if (data.type === 'exit') {
        if (data.exitStyle === 'door') {
          cursorMode = 'exit-door';
        } else if (data.x < 50) {
          cursorMode = 'exit-left';
        }
      }
      hotspot.classList.add('cursor-' + cursorMode);

      // Store hotspot data on element
      hotspot._hotspotData = data;

      // Cursor changes on hover (updates container-level cursor too)
      hotspot.addEventListener('mouseenter', function() {
        Cursor.setMode(cursorMode);
      });

      hotspot.addEventListener('mouseleave', function() {
        Cursor.reset();
      });

      // Click interaction
      hotspot.addEventListener('click', function() {
        Scene.handleHotspotClick(data);
      });

      // Touch support for mobile
      hotspot.addEventListener('touchend', function(e) {
        e.preventDefault();
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

      // Block hotspot interaction while dialogue is open
      if (Game.dialogueOpen) {
        return;
      }

      // Check if player has an inventory item selected
      if (typeof Inventory !== 'undefined' && Inventory.getSelected && Inventory.getSelected()) {
        // Player is trying to use selected item on this hotspot
        Inventory.useOnHotspot(hotspot);
        return;
      }

      switch (hotspot.type) {
        case 'exit':
          if (hotspot.requiredFlag && !Game.getFlag(hotspot.requiredFlag)) {
            Game.showText(hotspot.blockedText || "I can't go there yet.");
            break;
          }
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
