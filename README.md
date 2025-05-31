# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

users are hardcoded as mentioned so:-

"users": [
{ "id": "1", "role": "Admin", "email": "admin@entnt.in", "password": "admin123" },
{ "id": "2", "role": "Inspector", "email": "inspector@entnt.in", "password": "inspect123" },
{ "id": "3", "role": "Engineer", "email": "engineer@entnt.in", "password": "engine123" }
]

src/
This is your main source directory, containing all application logic.

assets/

Presumably for images, icons, or other static files (not expanded in screenshots).

components/

Contains reusable UI components, organized into subfolders:

Common/: Shared components like Navbar, Charts, KPI Cards.
Components/: Forms and lists for managing components.
Dashboard/: Contains your Dashboard.jsx logic (though possibly could be under pages).
Jobs/: Components related to job handling—JobForm, JobList, JobCalendar.
Notifications/: Likely manages user alerts/notifications.
Ships/: Handles ship-related UIs like ShipList, ShipDetail, ShipForm.
contexts/

Context Providers for global state management:

AuthContext.jsx
ComponentsContext.jsx
JobsContext.jsx
ShipsContext.jsx
These likely handle auth state, job data, ship/component states via React Context API.

pages/

Each file here represents a route/view in your application:

DashboardPage.jsx
JobsPage.jsx
LoginPage.jsx
ShipDetailPage.jsx
ShipsPage.jsx
CalendarPage.jsx
ComponentsPage.jsx
This follows good separation between UI components and full-page views.

utils/

Utility functions:

localStorageUtils.js: Likely handles saving/retrieving data from localStorage.
roleUtils.js: Possibly stores role-checking helpers (admin, engineer, inspector logic).
App.jsx

Main app structure and routing config.

main.jsx

Likely the React entry point rendering <App /> into the DOM.


If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
