# 🎄 JSON Login Demo

A simple TypeScript login application using Vite and json-server. Perfect for learning how to handle authentication with a mock REST API.

## ✨ Features

- 🔐 Login form with email and password validation
- 👤 User authentication against a JSON database
- 🎨 Clean, responsive UI
- 📚 Well-documented TypeScript code with explanations

## 🛠️ Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast development server and build tool
- **json-server** - Mock REST API from a JSON file

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install json-server globally (if not already installed):
   ```bash
   npm install -g json-server
   ```

### Running the App

You need to run two terminals:

**Terminal 1 - Start json-server (API):**
```bash
json-server --watch db.json
```
This starts the mock API at `http://localhost:3000`

**Terminal 2 - Start Vite (Frontend):**
```bash
npm run dev
```
This starts the dev server at `http://localhost:5173`

## 🧪 Test Credentials

| Name | Email | Password |
|------|-------|----------|
| Santa Claus | santa@northpole.com | hohoho |
| Buddy the Elf | buddy@elvesworkshop.com | hohoho |
| Frostina Snowflake | frostina@northpole.com | hohoho |

## 📁 Project Structure

```
jsonlogin/
├── db.json          # Mock database (users & products)
├── index.html       # Entry HTML file
├── package.json     # Project dependencies
├── tsconfig.json    # TypeScript configuration
├── public/          # Static assets
└── src/
    ├── main.ts      # Main application logic
    ├── style.css    # Styles
    └── counter.ts   # Example counter module
```

## 📖 Learning Notes

This project demonstrates several TypeScript concepts:

### Type Assertions
```typescript
// Tell TypeScript the specific element type
const email = (document.querySelector('#email') as HTMLInputElement).value;
```

### Generic Type Parameters
```typescript
// Preferred with querySelector
const input = document.querySelector<HTMLInputElement>('#myInput');
```

### Non-null Assertion Operator
```typescript
// The ! tells TypeScript "I know this isn't null"
document.querySelector('#app')!.innerHTML = '...';
```

### Common HTML Element Types
| Type | Properties |
|------|------------|
| `HTMLInputElement` | `.value`, `.checked`, `.type` |
| `HTMLButtonElement` | `.disabled`, `.type` |
| `HTMLFormElement` | `.submit()`, `.reset()` |
| `HTMLAnchorElement` | `.href` |

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 📝 License

This project is for educational purposes and licenced to SyntraPXL (C) 2025
