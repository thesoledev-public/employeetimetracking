import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import './assets/styles/tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root.
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
