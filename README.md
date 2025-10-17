# Secure HeartID - ECG Authentication System

[![CI/CD Pipeline](https://github.com/DSamuelHodge/Secure-HeartID/actions/workflows/ci.yml/badge.svg)](https://github.com/DSamuelHodge/Secure-HeartID/actions/workflows/ci.yml)

## Overview

An interactive visualization and documentation system for ECG-based biometric authentication using Apple Watch and iPhone. This project demonstrates the architecture and data flow for secure, cancelable ECG templates using the Secure Enclave.

## Features

- 🔐 **Secure Architecture**: Implements secure triplet loss for cancelable biometric templates
- 📱 **Apple Ecosystem**: Designed for iPhone and Apple Watch integration
- 🔑 **Secure Enclave**: Utilizes hardware security for template protection
- 📊 **Interactive Visualization**: Real-time phase selection and detailed workflows
- 📄 **Documentation**: Comprehensive PDF documentation included
- 🎨 **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/DSamuelHodge/Secure-HeartID.git
   cd Secure-HeartID
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## System Architecture

### Three Main Phases:
1. **Enrollment Phase**: Initial ECG capture and template generation
2. **Authentication Phase**: Real-time ECG matching for user verification  
3. **Template Revocation**: Secure key regeneration for cancelability

### Key Security Features:
- ✅ Secure Triplet Loss for cancelability
- ✅ Template protection in Secure Enclave
- ✅ Data minimization (raw ECG deletion)
- ✅ Encrypted transit via WatchConnectivity

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
