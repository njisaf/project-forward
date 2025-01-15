/**
 * @module ProjectForward
 * @description Entry point for Project Forward - A Foundry VTT module development framework
 * @see {@link https://foundryvtt.wiki/en/development/api} Foundry VTT API
 */

import './styles/init.scss';
import { CharacterDataModel } from './module/data/CharacterDataModel.js';
import { SvelteApplication } from '#runtime/svelte/application';
import CharacterSheetShell from './view/components/character/CharacterSheetShell.svelte';

/**
 * @class CharacterSheetApplication
 * @extends SvelteApplication
 * @description The main character sheet application using TRL
 */
class CharacterSheetApplication extends SvelteApplication {
  /**
   * @override
   * Default Application options
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'project-forward-character-sheet',
      title: 'Character Sheet',
      svelte: {
        class: CharacterSheetShell,
        target: document.body
      },
      width: 800,
      height: 600,
      resizable: true
    });
  }

  /**
   * @override
   * Data passed to the Svelte component
   */
  getData() {
    return {
      actor: this.object
    };
  }

  /**
   * @override
   * Render the Application by getting data and passing it to the Svelte component.
   */
  render(force = false, options = {}) {
    if (!this.object) {
      return;
    }
    return super.render(force, options);
  }
}

// Initialize the module
Hooks.once('init', async () => {
  console.log('Project Forward | Initializing module');
  
  // Register the character data model
  CONFIG.Actor.dataModels.character = CharacterDataModel;
  
  // Register the character sheet application
  Actors.registerSheet('project-forward', CharacterSheetApplication, {
    types: ['character'],
    makeDefault: true
  });
});

// Setup module
Hooks.once('setup', async () => {
  console.log('Project Forward | Setting up module');
});

// When ready
Hooks.once('ready', async () => {
  console.log('Project Forward | Module ready');
});
