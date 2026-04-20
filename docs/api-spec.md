# API Specification

## Endpoint
`POST /check-eligibility`

## Request Body

```json
{
  "patientId": "P1001",
  "insuranceProvider": "Aetna",
  "serviceType": "Consultation"
}
```

## Success Response (200)

```json
{
  "eligible": true,
  "coverageStatus": "Active",
  "coverageDetails": "Consultation is covered",
  "copayEstimate": 30
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
  "eligible": false,
  "coverageStatus": "Active",
  "coverageDetails": "Surgery is not covered for this plan",
  "copayEstimate": null
}
```
