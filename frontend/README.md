# FindMyRooom Frontend (React + TypeScript + Vite)

Welcome to the **FindMyRooom Frontend** repository! This project is built using **React**, **TypeScript**, and **Vite**, providing a minimal and efficient setup to kickstart your frontend development with modern tools.

## Project Features

- 🚀 **React**: A JavaScript library for building user interfaces.
- 📝 **TypeScript**: Type-safe development for scalable and maintainable code.
- ⚡ **Vite**: A lightning-fast build tool for modern web projects.
- 🔄 **Hot Module Replacement (HMR)**: Enabled through official Vite plugins for seamless development.

## Plugins Used

This project supports two official plugins for optimized HMR:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses [Babel](https://babeljs.io/) for fast refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses [SWC](https://swc.rs/) for fast refresh.

## Setting Up ESLint Configuration

To ensure code quality, we recommend expanding the ESLint configuration for type-aware lint rules in production applications:

### Example Configuration for Type-Aware Linting

```javascript
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked, // For stricter rules
    ...tseslint.configs.stylisticTypeChecked, // For stylistic rules
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

Additional ESLint Plugins
Consider installing the following plugins for enhanced linting:

eslint-plugin-react-x
eslint-plugin-react-dom

Example Usage
```javascript
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
````
How to Run the Project
Clone the repository
````bash
git clone https://github.com/ritam-student/LetsGO-FE.git
````
Install dependencies:
````bash
npm install
````

Start the development server
````bash
npm run dev
````


Open your browser and navigate to http://localhost:3000.

