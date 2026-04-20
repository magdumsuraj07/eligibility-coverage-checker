# Eligibility Coverage Checker

A lightweight full-stack demo for checking patient insurance eligibility before treatment.

## Project Structure

```text
eligibility-coverage-checker/
+- frontend/
|  +- src/
|  |  +- components/
|  |  |  +- EligibilityForm.jsx
|  |  |  +- ResultCard.jsx
|  |  |  +- Loader.jsx
|  |  |  +- ErrorMessage.jsx
|  |  +- constants/
|  |  |  +- options.js
|  |  +- services/
|  |  |  +- eligibilityApi.js
|  |  +- App.jsx
|  |  +- main.jsx
|  |  +- index.css
|  +- package.json
|  +- vite.config.js
|  +- tailwind.config.js
|  +- postcss.config.js
|  +- index.html
+- backend/
|  +- data/
|  |  +- patients.json
|  |  +- coverageRules.json
|  +- src/
|  |  +- routes/
|  |  |  +- eligibility.js
|  |  +- services/
|  |  |  +- eligibilityService.js
|  |  +- server.js
|  +- package.json
+- docs/
|  +- requirements.md
|  +- flow-diagram.md
|  +- api-spec.md
+- README.md
```

## Quick Start

1. Install backend dependencies and run backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. In another terminal, install frontend dependencies and run React app:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open app at `http://localhost:5173`.
4. Optional production build:
   ```bash
   cd frontend
   npm run build
   ```
   Backend serves `frontend/dist` at `http://localhost:3000` when that build exists.

## API

- `POST /check-eligibility`

Request body:

```json
{
  "patientId": "P1001",
  "insuranceProvider": "Aetna",
  "serviceType": "Consultation"
}
```

## Team Split (3 members)

1. Frontend teammate: React components and UX polish (`frontend/src/*`).
2. Backend teammate: endpoint and validation logic (`backend/src/*`).
3. Documentation/testing teammate: scenario test cases and SDLC docs (`docs/*`).
