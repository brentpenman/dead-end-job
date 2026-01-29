// Dead End Job - Inventory System

(function() {
  'use strict';

  var selectedItem = null;
  var inventoryBar = null;

  window.Inventory = {
    selectedItem: null,

    // Initialize inventory system
    init: function() {
      console.log('Inventory initializing...');
      inventoryBar = document.getElementById('inventory-bar');
      if (!inventoryBar) {
        console.error('Inventory bar element not found');
        return;
      }
      this.render();
      console.log('Inventory initialized');
    },

    // Pick up an item from a scene hotspot
    pickUp: function(hotspotData) {
      console.log('Picking up item:', hotspotData.label);

      // Create item object
      var item = {
        id: hotspotData.itemId,
        name: hotspotData.label,
        description: hotspotData.itemDescription || 'An item.',
        icon: hotspotData.itemIcon || null
      };

      // Add to game inventory
      if (Game.addItem(item)) {
        // Re-render inventory bar
        this.render();

        // Remove hotspot from current scene
        this.removeHotspotFromScene(hotspotData.id);

        // Show feedback
        Game.showText('Picked up: ' + item.name);
      }
    },

    // Remove a hotspot element from the current scene
    removeHotspotFromScene: function(hotspotId) {
      var container = document.getElementById('scene-container');
      var hotspots = container.querySelectorAll('.hotspot');

      hotspots.forEach(function(hotspot) {
        if (hotspot._hotspotData && hotspot._hotspotData.id === hotspotId) {
          hotspot.remove();
        }
      });
    },

    // Render all inventory items
    render: function() {
      if (!inventoryBar) {
        console.error('Cannot render inventory: bar not initialized');
        return;
      }

      // Clear inventory bar
      inventoryBar.innerHTML = '';

      // Get all items from game state
      var items = Game.getInventory ? Game.getInventory() : [];

      // Create slot for each item
      items.forEach(function(item) {
        var slot = Inventory.createInventorySlot(item);
        inventoryBar.appendChild(slot);
      });
    },

    // Create an inventory slot element
    createInventorySlot: function(item) {
      var slot = document.createElement('div');
      slot.className = 'inventory-slot';
      slot.dataset.itemId = item.id;

      // Add selected class if this item is selected
      if (selectedItem === item.id) {
        slot.classList.add('selected');
      }

      // Create icon
      var icon = document.createElement('div');
      icon.className = 'item-icon';
      if (item.icon && item.icon.indexOf('data:image') === 0) {
        var img = document.createElement('img');
        img.src = item.icon;
        img.width = 40;
        img.height = 40;
        icon.appendChild(img);
      } else if (item.icon) {
        icon.textContent = item.icon;
      } else {
        // Fallback: first letter in a circle
        icon.textContent = item.name.charAt(0).toUpperCase();
      }
      slot.appendChild(icon);

      // Create name label
      var nameLabel = document.createElement('div');
      nameLabel.className = 'item-name';
      nameLabel.textContent = item.name;
      slot.appendChild(nameLabel);

      // Click handler: select item
      slot.addEventListener('click', function() {
        Inventory.select(item.id);
      });

      // Right-click handler: examine item
      slot.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        Inventory.examine(item.id);
      });

      return slot;
    },

    // Select an item (toggle)
    select: function(itemId) {
      console.log('Selecting item:', itemId);

      if (selectedItem === itemId) {
        // Deselect if clicking same item
        selectedItem = null;
        this.selectedItem = null;
        Cursor.reset();
        console.log('Item deselected');
      } else {
        // Select new item
        selectedItem = itemId;
        this.selectedItem = itemId;
        Cursor.setMode('use');
        console.log('Item selected:', itemId);
      }

      // Re-render to update visual selection
      this.render();
    },

    // Examine an item (right-click)
    examine: function(itemId) {
      console.log('Examining item:', itemId);

      // Find item in game inventory
      var items = Game.getInventory ? Game.getInventory() : [];
      var item = items.find(function(i) {
        return i.id === itemId;
      });

      if (item) {
        Game.showText(item.description);
      } else {
        console.error('Item not found for examine:', itemId);
      }
    },

    // Use selected item on a hotspot
    useOnHotspot: function(hotspotData) {
      if (!selectedItem) {
        console.warn('No item selected for use');
        return false;
      }

      console.log('Using item', selectedItem, 'on hotspot', hotspotData.label);

      // Check if hotspot accepts this item
      if (hotspotData.acceptsItem === selectedItem) {
        // Success! Item works on this hotspot
        var successText = hotspotData.useItemText || 'Used ' + selectedItem;
        Game.showText(successText);

        // Execute onUseItem callback if provided
        if (hotspotData.onUseItem && typeof hotspotData.onUseItem === 'function') {
          hotspotData.onUseItem();
        }

        // Remove item from inventory
        Game.removeItem(selectedItem);

        // Clear selection
        selectedItem = null;
        this.selectedItem = null;
        Cursor.reset();

        // Re-render inventory
        this.render();

        return true;
      } else {
        // Wrong item for this hotspot
        var wrongText = hotspotData.wrongItemText || "That doesn't work here.";
        Game.showText(wrongText);
        return false;
      }
    },

    // Get currently selected item
    getSelected: function() {
      return selectedItem;
    }
  };

})();
