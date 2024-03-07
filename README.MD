BACKEND
Run > npm run dev


FRONTEND
Run > npm start



I am working on the frontend of an employeeTimeTracking project using React for the UI, React Router for navigation, and Tailwind CSS for styling. My backend is in Node with MongoDB. and my API URL is in .env.

This is my Folder and File Structure

employeeTimeTracking/
│
├── src/
│   ├── components/          # Shared UI components
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.js  # LoginForm UI component
│   │   │   │   ├── ForgotPasswordForm.js
│   │   │   │   └── ...
│   │   │   ├── hooks/
│   │   │   │   └── useLogin.js    # Custom hook for login logic
│   │   │   ├── Login.js          # Login container component
│   │   │   └── ...
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DashboardUI.js  # Dashboard UI component
│   │   │   │   └── ...
│   │   │   ├── hooks/
│   │   │   │   └── useDashboardData.js  # Hook for fetching dashboard data
│   │   │   ├── Dashboard.js            # Dashboard container component
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── hooks/                # Global custom hooks
│   │   ├── useFetch.js
│   │   └── ...
│   │
│   ├── App.js                # Main application component with routing
│   ├── index.js              # Entry point
│   └── ...
│
├── package.json
├── .env
├── tailwind.config.js
└── ...