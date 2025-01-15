# Project Forward - File Analysis

## Project Structure
```
project-forward/
├── src/
│   ├── module/
│   │   └── data/
│   │       └── CharacterDataModel.js    # Character data schema using Foundry DataModel
│   ├── view/
│   │   └── components/
│   │       └── character/
│   │           └── CharacterSheetShell.svelte  # TRL-based character sheet component
│   ├── styles/
│   │   └── init.scss                    # Global styles and variables
│   └── index.js                         # Main entry point and module initialization
├── docs/
│   ├── TECHNICAL_PLAN.md                # Technical architecture and implementation plan
│   └── FILE_ANALYSIS.md                 # This file - Project structure documentation
└── configuration/
    ├── module.json                      # Foundry VTT module configuration
    ├── vite.config.js                   # Build configuration
    ├── tsconfig.json                    # TypeScript configuration
    └── .eslintrc.json                   # ESLint rules and plugins
```

## Core Components Analysis

### CharacterDataModel.js
The character data model implements Foundry's DataModel system for structured data management:
- Defines schema for character attributes, skills, and health
- Implements data validation and type checking
- Provides a foundation for future data migrations
- References: [Foundry DataModel Documentation](https://foundryvtt.wiki/en/development/api/data-schema)

### CharacterSheetShell.svelte
TRL-based character sheet component implementing:
- Reactive data binding with Foundry actor data
- TRL ApplicationShell integration
- Modular attribute and skill display
- References: [TyphonJS Runtime Library](https://github.com/typhonjs-fvtt-lib/runtime)

### index.js
Main module entry point handling:
- Module initialization and setup
- Character sheet registration
- DataModel configuration
- TRL application integration
- References: [Foundry Hooks API](https://foundryvtt.wiki/en/development/api/hooks)

## Build System

### vite.config.js
Vite configuration optimized for Foundry VTT:
- ESM-based build system
- Svelte component compilation
- Source map generation
- External Foundry dependencies

### module.json
Foundry VTT module manifest:
- Module metadata and compatibility
- Resource declarations
- Distribution configuration
- References: [Module Manifest Documentation](https://foundryvtt.wiki/en/development/manifest-plus)

## Development Tools

### TypeScript Configuration
- Strict type checking
- ESM module resolution
- TRL type definitions
- Path aliases for runtime imports

### ESLint Configuration
- TypeScript integration
- Svelte component linting
- Code style enforcement
- Best practices validation
