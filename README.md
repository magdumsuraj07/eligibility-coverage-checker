# Eligibility Coverage Checker

A lightweight full-stack demo for checking patient insurance eligibility before treatment.

## Project Structure

```text
eligibility-coverage-checker/
+- frontend/
¦  +- public/
¦  ¦  +- index.html
¦  ¦  +- styles.css
¦  ¦  +- app.js
¦  +- src/
+- backend/
¦  +- data/
¦  ¦  +- patients.json
¦  ¦  +- coverageRules.json
¦  +- src/
¦  ¦  +- routes/
¦  ¦  ¦  +- eligibility.js
¦  ¦  +- services/
¦  ¦  ¦  +- eligibilityService.js
¦  ¦  +- server.js
¦  +- package.json
+- docs/
¦  +- requirements.md
¦  +- flow-diagram.md
¦  +- api-spec.md
+- README.md
```

## Quick Start

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start server:
   ```bash
   npm start
   ```
3. Open app:
   - `http://localhost:3000`

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

1. Frontend teammate: form UI + result card polish (`frontend/public/*`).
2. Backend teammate: endpoint and validation logic (`backend/src/*`).
3. Documentation/testing teammate: scenario test cases + SDLC docs (`docs/*`).
