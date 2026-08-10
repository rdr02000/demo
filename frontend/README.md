# Frontend README

This is the React frontend for the order management application.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install

```bash
cd frontend
npm install
```

## Run locally

```bash
cd frontend
npm run dev -- --host 0.0.0.0
```

Then open:

- http://localhost:5173

## Production build

```bash
cd frontend
npm run build
```

## Preview build

```bash
cd frontend
npm run preview -- --host 0.0.0.0
```

## Backend connection

The frontend expects the backend at:

```text
http://localhost:8080/api/orders
```

If the backend is running on another machine, change the API URL in:

- frontend/src/App.jsx

Example:

```js
const API_URL = 'http://192.168.1.25:8080/api/orders'
```

## Auth

The frontend sends HTTP Basic Auth using:

- username: admin
- password: admin123

## Windows note

If npm scripts are blocked by PowerShell policy, use:

```powershell
cmd /c "cd /d C:\path\to\project\frontend && npm run dev -- --host 0.0.0.0"
```
