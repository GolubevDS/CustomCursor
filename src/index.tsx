import React from 'react';
import ReactDOM from 'react-dom/client';
import CustomCursor from './CustomCursor';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<CustomCursor />
	</React.StrictMode>
);