// Dead End Job - Dialogue System
// Branching dialogue trees with state-aware choices, typewriter effect, NPC portraits

(function() {
  'use strict';

  var DialogueState = {
    trees: {},
    currentTree: null,
    currentNode: null,
    isTyping: false,
    typewriterInterval: null,
    fullText: '',
    currentCharIndex: 0
  };

  window.Dialogue = {
    // Initialize dialogue system
    init: function() {
      console.log('Dialogue system initializing...');
      this.buildUI();
      this.registerDefaultDialogues();
      console.log('Dialogue system initialized');
    },

    // Build dialogue UI structure
    buildUI: function() {
      var container = document.getElementById('dialogue-container');

      var box = document.createElement('div');
      box.className = 'dialogue-box';

      // Portrait area
      var portrait = document.createElement('div');
      portrait.className = 'dialogue-portrait';
      var placeholder = document.createElement('div');
      placeholder.className = 'portrait-placeholder';
      placeholder.id = 'dialogue-portrait-placeholder';
      portrait.appendChild(placeholder);

      // Content area
      var content = document.createElement('div');
      content.className = 'dialogue-content';

      var npcName = document.createElement('div');
      npcName.className = 'dialogue-npc-name';
      npcName.id = 'dialogue-npc-name';

      var text = document.createElement('div');
      text.className = 'dialogue-text';
      text.id = 'dialogue-text';

      var choices = document.createElement('div');
      choices.className = 'dialogue-choices';
      choices.id = 'dialogue-choices';

      content.appendChild(npcName);
      content.appendChild(text);
      content.appendChild(choices);

      box.appendChild(portrait);
      box.appendChild(content);
      container.appendChild(box);
    },

    // Register a dialogue tree
    register: function(dialogueId, treeData) {
      DialogueState.trees[dialogueId] = treeData;
      console.log('Registered dialogue tree:', dialogueId);
    },

    // Register default test dialogues
    registerDefaultDialogues: function() {
      this.register('bob-intro', {
        id: 'bob-intro',
        npcName: 'Bob',
        portrait: null,
        nodes: {
          'start': {
            text: "Hey there. You look... new. And dead. Welcome to the waiting room.",
            choices: [
              { text: "Where am I?", next: "where" },
              { text: "How do I get out of here?", next: "escape" },
              { text: "Nice place you got here.", next: "sarcasm" },
              { text: "Bob, I already know the drill.", next: "end", condition: { hasFlag: "talkedToBob" } }
            ]
          },
          'where': {
            text: "The Afterlife Processing Department. Think of it as the DMV, but eternal. Well, hopefully not eternal for you.",
            choices: [
              { text: "How do I get out of here?", next: "escape" },
              { text: "Thanks, I guess.", next: "end" }
            ]
          },
          'escape': {
            text: "You need Form 27-B stamped and approved. Talk to the Clerk at the front desk. Fair warning: she's not exactly... enthusiastic.",
            choices: [
              { text: "Got it. Thanks.", next: "end", action: { setFlag: { talkedToBob: true } } }
            ]
          },
          'sarcasm': {
            text: "Ha. You'll fit right in. Everyone here has been dead long enough to develop a sense of humor. Or lose one.",
            choices: [
              { text: "How do I get out of here?", next: "escape" },
              { text: "I'll figure it out myself.", next: "end" }
            ]
          },
          'end': {
            text: "Good luck. You're gonna need it. Or not. Time is meaningless here.",
            choices: []
          }
        }
      });
    },

    // Open a dialogue tree
    open: function(dialogueId) {
      var tree = DialogueState.trees[dialogueId];
      if (!tree) {
        console.error('Dialogue tree not found:', dialogueId);
        return;
      }

      console.log('Opening dialogue:', dialogueId);
      DialogueState.currentTree = dialogueId;
      DialogueState.currentNode = 'start';
      Game.dialogueOpen = true;

      var container = document.getElementById('dialogue-container');
      container.classList.add('active');

      this.renderNode('start');
    },

    // Close dialogue
    close: function() {
      console.log('Closing dialogue');

      // Stop any ongoing typewriter effect
      if (DialogueState.typewriterInterval) {
        clearInterval(DialogueState.typewriterInterval);
        DialogueState.typewriterInterval = null;
      }

      var container = document.getElementById('dialogue-container');
      container.classList.remove('active');

      DialogueState.currentTree = null;
      DialogueState.currentNode = null;
      DialogueState.isTyping = false;
      Game.dialogueOpen = false;
    },

    // Render a dialogue node
    renderNode: function(nodeId) {
      var tree = DialogueState.trees[DialogueState.currentTree];
      if (!tree) return;

      var node = tree.nodes[nodeId];
      if (!node) {
        console.error('Node not found:', nodeId);
        return;
      }

      DialogueState.currentNode = nodeId;

      // Set NPC name
      var npcName = document.getElementById('dialogue-npc-name');
      npcName.textContent = tree.npcName;

      // Set portrait
      var portraitContainer = document.querySelector('.dialogue-portrait');
      if (tree.portraitSVG) {
        var placeholder = document.getElementById('dialogue-portrait-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        // Remove any existing portrait image
        var existingImg = portraitContainer.querySelector('img');
        if (existingImg) existingImg.remove();
        var img = document.createElement('img');
        img.src = 'data:image/svg+xml,' + encodeURIComponent(tree.portraitSVG);
        img.width = 80;
        img.height = 80;
        portraitContainer.appendChild(img);
      } else {
        var placeholder = document.getElementById('dialogue-portrait-placeholder');
        if (placeholder) {
          placeholder.style.display = '';
          placeholder.textContent = tree.npcName.charAt(0).toUpperCase();
        }
      }

      // Clear choices during typing
      var choicesContainer = document.getElementById('dialogue-choices');
      choicesContainer.innerHTML = '';

      // Start typewriter effect
      this.startTypewriter(node.text, function() {
        // After typing completes, render choices
        Dialogue.renderChoices(node, tree);
      });
    },

    // Typewriter effect
    startTypewriter: function(text, onComplete) {
      var textContainer = document.getElementById('dialogue-text');
      textContainer.textContent = '';

      DialogueState.fullText = text;
      DialogueState.currentCharIndex = 0;
      DialogueState.isTyping = true;

      // Clear any existing interval
      if (DialogueState.typewriterInterval) {
        clearInterval(DialogueState.typewriterInterval);
      }

      var self = this;
      DialogueState.typewriterInterval = setInterval(function() {
        if (DialogueState.currentCharIndex < DialogueState.fullText.length) {
          textContainer.textContent += DialogueState.fullText.charAt(DialogueState.currentCharIndex);
          DialogueState.currentCharIndex++;
        } else {
          clearInterval(DialogueState.typewriterInterval);
          DialogueState.typewriterInterval = null;
          DialogueState.isTyping = false;
          if (onComplete) onComplete();
        }
      }, 30);

      // Click to skip typewriter
      var skipHandler = function() {
        if (DialogueState.isTyping) {
          self.skipTypewriter(onComplete);
          textContainer.removeEventListener('click', skipHandler);
        }
      };
      textContainer.addEventListener('click', skipHandler);
    },

    // Skip typewriter effect
    skipTypewriter: function(onComplete) {
      if (DialogueState.typewriterInterval) {
        clearInterval(DialogueState.typewriterInterval);
        DialogueState.typewriterInterval = null;
      }

      var textContainer = document.getElementById('dialogue-text');
      textContainer.textContent = DialogueState.fullText;
      DialogueState.isTyping = false;

      if (onComplete) onComplete();
    },

    // Render dialogue choices
    renderChoices: function(node, tree) {
      var choicesContainer = document.getElementById('dialogue-choices');
      choicesContainer.innerHTML = '';

      // Render conditional choices
      node.choices.forEach(function(choice) {
        // Check condition
        if (choice.condition) {
          if (!Dialogue.checkCondition(choice.condition)) {
            return; // Skip this choice
          }
        }

        var button = document.createElement('button');
        button.className = 'dialogue-choice';
        button.textContent = choice.text;

        button.addEventListener('click', function() {
          Dialogue.selectChoice(choice);
        });

        choicesContainer.appendChild(button);
      });

      // Always add [Leave] option unless noExit is set
      if (!node.noExit) {
        var leaveButton = document.createElement('button');
        leaveButton.className = 'dialogue-choice leave-choice';
        leaveButton.textContent = '[Leave]';
        leaveButton.addEventListener('click', function() {
          Dialogue.close();
        });
        choicesContainer.appendChild(leaveButton);
      }
    },

    // Check a choice condition
    checkCondition: function(condition) {
      if (condition.hasItem) {
        return Game.hasItem(condition.hasItem);
      }
      if (condition.hasFlag) {
        return !!Game.getFlag(condition.hasFlag);
      }
      if (condition.notFlag) {
        return !Game.getFlag(condition.notFlag);
      }
      return true;
    },

    // Select a dialogue choice
    selectChoice: function(choice) {
      // Execute action if present
      if (choice.action) {
        this.executeAction(choice.action);
      }

      // Navigate to next node
      if (choice.next) {
        this.renderNode(choice.next);
      } else {
        // No next node, close dialogue
        this.close();
      }
    },

    // Execute a choice action
    executeAction: function(action) {
      if (action.setFlag) {
        for (var key in action.setFlag) {
          if (action.setFlag.hasOwnProperty(key)) {
            Game.setFlag(key, action.setFlag[key]);
          }
        }
      }

      if (action.giveItem) {
        Game.addItem(action.giveItem);
        Game.showText('Received: ' + action.giveItem.name);
      }

      if (action.removeItem) {
        Game.removeItem(action.removeItem);
      }

      if (action.showText) {
        var self = this;
        // Show text after dialogue closes
        setTimeout(function() {
          Game.showText(action.showText);
        }, 100);
      }

      if (action.triggerEnding) {
        setTimeout(function() {
          Game.triggerEnding();
        }, 500);
      }
    }
  };

})();
