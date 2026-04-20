# Requirements Document - Eligibility Coverage Checker

## 1. Objective
Build a simple app to check if a patient is eligible for a requested medical service under their insurance plan before treatment is provided.

## 2. Scope
### In scope
- Input patient ID, insurance provider, and service type.
- Validate the patient exists in mock records.
- Confirm provider matches the patient record.
- Verify insurance status is active.
- Check requested service against provider coverage rules.
- Return eligibility result, coverage status, coverage details, covered services, and mock copay.

### Out of scope
- Real insurance APIs.
- Authentication/authorization.
- Database persistence.
- Claim submission workflows.

## 3. Functional Requirements
1. User can enter `patientId`, `insuranceProvider`, and `serviceType`.
2. System validates required fields.
3. System checks patient exists in `patients.json`.
4. System checks insurance provider match and active status.
5. System checks service coverage from `coverageRules.json`.
6. System returns:
   - `Eligible/Not Eligible`
   - `Coverage status`
   - `Coverage details`
   - `Covered services`
   - `Copay estimate` (mock/fixed)

## 4. Non-Functional Requirements
- Response time under 1 second for local mock data.
- Simple, readable React UI for demo.
- Maintainable folder structure for team collaboration.

## 5. Assumptions
- Input data is mock/test data.
- Service names are limited to known values.
- Copay values are illustrative only and do not represent actual insurance pricing.
