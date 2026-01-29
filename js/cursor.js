// Dead End Job - Cursor Mode Management

(function() {
  'use strict';

  var currentMode = 'default';
  var container = null;

  window.Cursor = {
    // Initialize cursor system
    init: function() {
      container = document.getElementById('game-container');
      if (!container) {
        console.error('Game container not found for cursor management');
        return;
      }
      this.reset();
    },

    // Set cursor mode
    setMode: function(mode) {
      if (!container) {
        this.init();
      }

      if (currentMode !== mode) {
        // Remove all cursor mode classes
        container.classList.remove(
          'cursor-default',
          'cursor-look',
          'cursor-use',
          'cursor-talk',
          'cursor-exit'
        );

        // Add new cursor mode class
        container.classList.add('cursor-' + mode);
        currentMode = mode;
      }
    },

    // Reset to default cursor
    reset: function() {
      this.setMode('default');
    },

    // Get current cursor mode
    getMode: function() {
      return currentMode;
    }
  };

  // Initialize cursor on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      Cursor.init();
    });
  } else {
    Cursor.init();
  }

})();
