# Project Forward

A Foundry VTT module development framework using TyphonJS Runtime Library (TRL). This project provides a modern, TypeScript-based development environment for creating Foundry VTT modules with reactive Svelte components.

## Features

- **Modern Build System**: ESM-based build using Vite
- **TRL Integration**: Foundry-specific Svelte components and utilities
- **TypeScript Support**: Full type checking and IDE integration
- **DataModel System**: Structured data management using Foundry's DataModel
- **Reactive UI**: Svelte-based character sheets with TRL ApplicationShell

## Installation

1. Clone the repository:
```bash
git clone https://github.com/njisaf/project-forward.git
```

2. Install dependencies:
```bash
npm install
```

3. Build the module:
```bash
npm run build
```

4. Create a symlink in your Foundry VTT modules directory:
```bash
ln -s /path/to/project-forward/dist /path/to/foundry/modules/project-forward
```

## Development

### Prerequisites
- Node.js 16+
- Foundry VTT
- Basic knowledge of Svelte and TypeScript

### Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues

### Project Structure
See [FILE_ANALYSIS.md](docs/FILE_ANALYSIS.md) for detailed project structure documentation.

### Technical Documentation
See [TECHNICAL_PLAN.md](docs/TECHNICAL_PLAN.md) for architecture and implementation details.

## Contributing

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following our coding standards
3. Run linting and fix any issues:
```bash
npm run lint:fix
```

4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## References

- [Foundry VTT API Documentation](https://foundryvtt.wiki/en/development/api)
- [TyphonJS Runtime Library](https://github.com/typhonjs-fvtt-lib/runtime)
- [Svelte Documentation](https://svelte.dev/docs)
