# Requirements Document - Eligibility Coverage Checker

## 1. Objective
Build a simple app to check if a patient is eligible for a requested medical service under their insurance plan.

## 2. Scope
### In scope
- Input patient and insurance details.
- Validate patient exists.
- Validate provider matches patient.
- Check service against coverage rules.
- Return eligibility, coverage detail, and mock copay.

### Out of scope
- Real insurance APIs.
- Authentication/authorization.
- Database persistence.

## 3. Functional Requirements
1. User can enter `patientId`, `insuranceProvider`, and `serviceType`.
2. System validates required fields.
3. System checks patient exists in `patients.json`.
4. System checks insurance provider match and active status.
5. System checks service coverage from `coverageRules.json`.
6. System returns:
   - `Eligible/Not Eligible`
   - `Coverage status/details`
   - `Copay estimate` (mock/fixed)

## 4. Non-Functional Requirements
- Response time under 1 second for local mock data.
- Simple, readable UI for demo.
- Maintainable folder structure for team collaboration.

## 5. Assumptions
- Input data is mock/test data.
- Service names are limited to known values.
