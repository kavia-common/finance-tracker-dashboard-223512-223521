# Expense Tracker Frontend - Usage

## Environment
Copy `.env.example` to `.env` and set:
- REACT_APP_API_BASE or REACT_APP_BACKEND_URL to your backend URL
- REACT_APP_HEALTHCHECK_PATH (default: /health)

No URLs are hardcoded; the app reads from process.env variables.

## Routes
- /dashboard — overview with charts and stats
- /expenses — list, filter, add/edit, delete
- /settings — stub for profile/settings
- /health — calls health endpoint defined in env

## State management
Uses React Query for fetching and mutations with caching and loading/error states.

## Accessibility
- Semantic regions and ARIA labels
- Keyboard-friendly forms and buttons

