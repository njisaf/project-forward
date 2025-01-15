/**
 * @module ProjectForward
 * @description Entry point for Project Forward - A Foundry VTT module development framework
 * @see {@link https://foundryvtt.wiki/en/development/api} Foundry VTT API
 */

import './styles/init.scss';

// Initialize the module
Hooks.once('init', async () => {
  console.log('Project Forward | Initializing module');
});

// Setup module
Hooks.once('setup', async () => {
  console.log('Project Forward | Setting up module');
});

// When ready
Hooks.once('ready', async () => {
  console.log('Project Forward | Module ready');
});
