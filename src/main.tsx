import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootEl = document.getElementById('root');

if (rootEl) {
	createRoot(rootEl).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	// If this runs, index.html's #root is missing or the script ran before DOM ready
	console.error('Root element not found: make sure index.html contains <div id="root"></div>');
}
