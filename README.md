# Eligibility Coverage Checker

A compact full-stack demo that checks whether a patient is eligible for a medical service based on mock insurance data.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Data: JSON mock files

## Project Structure

```text
eligibility-coverage-checker/
|- frontend/
|  |- src/
|  |  |- App.jsx
|  |  |- main.jsx
|  |  |- index.css
|  |- index.html
|  |- package.json
|  |- vite.config.js
|- backend/
|  |- data/
|  |  |- patients.json
|  |  |- coverageRules.json
|  |- src/
|  |  |- routes/eligibility.js
|  |  |- services/eligibilityService.js
|  |  |- services/eligibilityService.test.js
|  |  |- server.js
|  |- package.json
|- docs/
|  |- requirements.md
|  |- flow-diagram.md
|  |- api-spec.md
|- README.md
```

## Features

- Validate patient by `patientId`
- Confirm insurance provider matches the patient record
- Check whether the insurance is active
- Match service type against provider coverage rules
- Return eligibility status, coverage details, covered services, and mock copay

## Run The Application

Open two terminals.

### 1. Start the backend

```bash
cd eligibility-coverage-checker/backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

### 2. Start the React frontend

```bash
cd eligibility-coverage-checker/frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

The Vite dev server proxies API calls to the backend automatically.

## Optional Production-Style Run

If you want Express to serve the built React app:

```bash
cd eligibility-coverage-checker/frontend
npm install
npm run build

cd ../backend
npm install
npm start
```

Then open `http://localhost:3000`

## API

### `POST /check-eligibility`

Request body:

```json
{
  "patientId": "IN1001",
  "insuranceProvider": "Star Health",
  "serviceType": "Consultation"
}
```

Success response:

```json
{
  "patientId": "IN1001",
  "patientName": "Aarav Sharma",
  "insuranceProvider": "Star Health",
  "serviceType": "Consultation",
  "coveredServices": ["Consultation", "Lab Test", "MRI Scan", "Surgery"],
  "eligible": true,
  "coverageStatus": "Active",
  "coverageDetails": "Consultation is covered",
  "copayEstimate": 300
}
```

## Sample Test Cases

- `IN1001 + Star Health + Consultation` -> Eligible
- `IN1004 + ICICI Lombard + Consultation` -> Not Eligible (Inactive)
- `IN1002 + Niva Bupa + MRI Scan` -> Not Eligible (Service not covered)

## Team Split Suggestion

1. Frontend: React form, sample scenarios, result card
2. Backend: Express API, validation, coverage logic
3. Documentation: requirements, API spec, flow diagram, README, test cases
