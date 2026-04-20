# API Specification

## Endpoint
`POST /check-eligibility`

## Request Body

```json
{
  "patientId": "IN1001",
  "insuranceProvider": "Star Health",
  "serviceType": "Consultation"
}
```

## Success Response (200)

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

## Validation Error (400)

```json
{
  "eligible": false,
  "message": "patientId, insuranceProvider and serviceType are required"
}
```

## Example Not Eligible Response (200)

```json
{
  "patientId": "IN1002",
  "patientName": "Diya Nair",
  "insuranceProvider": "Niva Bupa",
  "serviceType": "MRI Scan",
  "coveredServices": ["Consultation", "Lab Test", "Surgery", "Maternity"],
  "eligible": false,
  "coverageStatus": "Active",
  "coverageDetails": "MRI Scan is not covered for this plan",
  "copayEstimate": null
}
```
