# Frontend (React + Tailwind)

## Folder Structure

```text
src/
+- components/
¦  +- EligibilityForm.jsx
¦  +- ResultCard.jsx
¦  +- Loader.jsx
¦  +- ErrorMessage.jsx
+- constants/
¦  +- options.js
+- services/
¦  +- eligibilityApi.js
+- App.jsx
+- main.jsx
+- index.css
```

## Responsibilities

- `App.jsx`: state management (`formData`, `loading`, `result`, `error`) and submit flow.
- `components/*`: presentational UI components.
- `services/eligibilityApi.js`: API integration (`POST /check-eligibility`).
- `constants/options.js`: form option lists.
