// Dead End Job - NPC Dialogue Trees
// All dialogue content for Clerk, Chronicler, and Manager

(function() {
  'use strict';

  var dialogueTrees = {
    'clerk': {
      id: 'clerk',
      npcName: 'The Clerk',
      portrait: '#6b7280',
      portraitImage: 'images/clerk-portrait.png',
      nodes: {
        'start': {
          text: "Next. ...Oh, you don't have a number. You need to take a number from the machine in the Waiting Room. Policy is policy.",
          choices: [
            { text: "But there's nobody else here.", next: 'nobody' },
            { text: "Where do I even start?", next: 'directions' },
            { text: "I have a number.", next: 'has-number', condition: { hasFlag: 'hasTicketNumber' } },
            { text: "I have Form 27-B.", next: 'has-form', condition: { hasItem: 'form-27b' } }
          ]
        },
        'nobody': {
          text: "Doesn't matter. The system requires a number. I don't make the rules. I just... exist near them.",
          choices: [
            { text: "Where do I even start?", next: 'directions' }
          ]
        },
        'directions': {
          text: "Ticket machine. Waiting Room. Take a number. Come back. I'll be here. I'm always here.",
          choices: []
        },
        'has-number': {
          text: "*Sigh.* Number 2,147,483,647. That's you? Fine. You need Form 27-B filed and stamped. Filing Room has the form. Manager stamps it.",
          choices: [
            { text: "That's a lot of numbers ahead of me.", next: 'big-number' },
            { text: "Where's the Filing Room?", next: 'filing-directions' }
          ],
          action: { setFlag: { clerkGaveDirections: true } }
        },
        'big-number': {
          text: "Everyone's number is that. The machine only prints one number. Budget cuts.",
          choices: [
            { text: "Where's the Filing Room?", next: 'filing-directions' }
          ]
        },
        'filing-directions': {
          text: "Through here, door on the right. The Filing Room has your form. Manager's Office is upstairs for the stamp. Good luck. Or don't. Luck is a construct.",
          choices: []
        },
        'has-form': {
          text: "Form 27-B. Good. Now you need the Manager to stamp it. Office is through the door behind me. Try not to be too alive about it.",
          choices: [
            { text: "Thanks for all your help.", next: 'thanks' }
          ],
          action: { setFlag: { clerkSentToManager: true } }
        },
        'thanks': {
          text: "Don't mention it. Literally. I have a quota of emotional interactions per century and I'm already over.",
          choices: []
        }
      }
    },

    'cabinet': {
      id: 'cabinet',
      npcName: 'The Chronicler',
      portrait: '#78716c',
      portraitImage: 'images/filing-portrait.png',
      nodes: {
        'start': {
          text: "WHAT. Do you KNOW what time it is? It's ALWAYS filing time and I am BUSY. State your business or consider your case... CLOSED.",
          choices: [
            { text: "I need Form 27-B.", next: 'need-form' },
            { text: "You're... the Chronicler of Fates?", next: 'talking' },
            { text: "Nice drawers.", next: 'nice-drawers' }
          ]
        },
        'need-form': {
          text: "Form 27-B? 27-B?! That's buried in my THIRD cabinet. I haven't opened that one since the Fall of Rome — and THAT was a filing nightmare. I want something in return.",
          choices: [
            { text: "What do you want?", next: 'want' },
            { text: "Can't you just give it to me?", next: 'just-give' },
            { text: "Would a nice cup of coffee help?", next: 'offer-coffee', condition: { hasItem: 'coffee-mug' } }
          ]
        },
        'want': {
          text: "Something warm. Something comforting. I've been stuck in this dead-end job for three hundred years — and yes, I KNOW that's a pun. Bring me a hot beverage and MAYBE I'll consider it.",
          choices: [
            { text: "I have coffee right here.", next: 'offer-coffee', condition: { hasItem: 'coffee-mug' } }
          ]
        },
        'just-give': {
          text: "JUST give it?! Listen, nothing in the afterlife is free. Even death cost you your LIFE. So bring me something worth my while.",
          choices: [
            { text: "What do you want?", next: 'want' }
          ]
        },
        'talking': {
          text: "It says so RIGHT on the podium. I chronicle fates. It's not a hobby, it's a CALLING — though nobody ever calls. Now. Did you need something or are you just here to gawk?",
          choices: [
            { text: "I need Form 27-B.", next: 'need-form' },
            { text: "Noted. ...Pun intended.", next: null }
          ]
        },
        'nice-drawers': {
          text: "...I'm going to file that remark under 'Things I'm Pretending I Didn't Hear.' Is there something you actually NEED?",
          choices: [
            { text: "I need Form 27-B.", next: 'need-form' }
          ]
        },
        'offer-coffee': {
          text: "Is that... is that COFFEE? Oh. Oh, you beautiful soul. That's the warmest thing anyone's done for me in centuries. I'd say you have GROUNDS for a form now. ...Fine. Take your stupid form.",
          choices: [
            { text: "Thanks, Chronicler.", next: 'thanks' }
          ],
          action: {
            removeItem: 'coffee-mug',
            giveItem: {
              id: 'form-27b',
              name: 'Form 27-B',
              description: 'An official afterlife processing form. Needs a stamp.',
              icon: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="28" height="34" rx="2" fill="#f5f0e6" stroke="#a3a3a3" stroke-width="1.5"/><line x1="10" y1="12" x2="30" y2="12" stroke="#d4d4d4" stroke-width="1"/><line x1="10" y1="17" x2="30" y2="17" stroke="#d4d4d4" stroke-width="1"/><line x1="10" y1="22" x2="25" y2="22" stroke="#d4d4d4" stroke-width="1"/><text x="20" y="32" font-size="7" font-family="sans-serif" font-weight="bold" fill="#4b5563" text-anchor="middle">27-B</text></svg>')
            },
            setFlag: { gotForm27B: true }
          }
        },
        'thanks': {
          text: "*sniff* Nobody ever brings ME coffee. ...Now get out before I change my mind and refile you under 'Permanently Lost.' Trust me, nobody EVER finds Permanently Lost.",
          choices: []
        }
      }
    },

    'manager': {
      id: 'manager',
      npcName: 'The Manager',
      portrait: '#7c3aed',
      portraitImage: 'images/manager-portrait.png',
      nodes: {
        'start': {
          text: "Well HELLO there, new soul! Welcome to my office! Isn't it GREAT? I just love processing days! What can I do for you today?",
          choices: [
            { text: "I need Form 27-B stamped.", next: 'need-stamp' },
            { text: "How can you be so cheerful?", next: 'cheerful' },
            { text: "Nice office.", next: 'office' },
            { text: "I have the form AND the stamp. Let's do this.", next: 'stamp-form', condition: { hasItem: 'rubber-stamp' } },
            { text: "Here's my Form 27-B.", next: 'have-form-only', condition: { hasItem: 'form-27b' } }
          ]
        },
        'need-stamp': {
          text: "Oh ABSOLUTELY! I LIVE for stamping! Well, I used to live. Now I exist for stamping! You'll need Form 27-B from Filing, and the official stamp. I seem to have misplaced mine -- check the Break Room!",
          choices: [
            { text: "You lost the stamp?", next: 'lost-stamp' },
            { text: "I'll go find them.", next: null }
          ]
        },
        'lost-stamp': {
          text: "I prefer to say it's on an ADVENTURE! Everything's an adventure if you have the right attitude! Which I ALWAYS do!",
          choices: []
        },
        'cheerful': {
          text: "How can I NOT be?! Every day is a chance to help a soul move on to the next great thing! Plus the dental plan here is INCREDIBLE. Not that I need teeth anymore!",
          choices: [
            { text: "That's... unsettling.", next: 'unsettling' },
            { text: "I need Form 27-B stamped.", next: 'need-stamp' }
          ]
        },
        'unsettling': {
          text: "I get that a lot! But you know what I always say -- ATTITUDE is the difference between an ORDEAL and an ADVENTURE! Isn't that FUN?",
          choices: []
        },
        'office': {
          text: "Thank you SO much! I decorated it myself! That motivational plaque? Reads 'Every soul counts!' Because they DO! I count them! It's part of my job!",
          choices: [
            { text: "I need Form 27-B stamped.", next: 'need-stamp' }
          ]
        },
        'have-form-only': {
          text: "Ooh, Form 27-B! WONDERFUL! But I can't stamp it without my stamp! I think I left it in the Break Room. Could you grab it for me? PLEASE?",
          choices: [
            { text: "Sure, I'll find it.", next: null }
          ]
        },
        'stamp-form': {
          text: "OH BOY OH BOY! Form AND stamp! This is the BEST day of my afterlife! Let me just... *STAMP* ...APPROVED! You're FREE to go! CONGRATULATIONS!",
          choices: [
            { text: "Finally. Thanks.", next: 'goodbye' }
          ],
          action: {
            removeItem: 'form-27b',
            setFlag: { formStamped: true }
          }
        },
        'goodbye': {
          text: "It was SO great meeting you, Morgan! Tell the next plane of existence I said HI! And remember -- every end is just a NEW BEGINNING! ...I need to get out more.",
          choices: [],
          action: {
            removeItem: 'rubber-stamp',
            triggerEnding: true
          }
        }
      }
    }
  };

  window.Dialogues = {
    registerAll: function() {
      for (var id in dialogueTrees) {
        if (dialogueTrees.hasOwnProperty(id)) {
          Dialogue.register(id, dialogueTrees[id]);
        }
      }
      console.log('Registered', Object.keys(dialogueTrees).length, 'dialogue trees');
    }
  };
})();
