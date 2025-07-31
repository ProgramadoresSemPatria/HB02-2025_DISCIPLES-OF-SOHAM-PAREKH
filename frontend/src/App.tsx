import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router';
import { Router } from './Router';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Add your Clerk Publishable Key to the .env file')
}

function App() {
	return (
		<BrowserRouter>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
				<Router />
			</ClerkProvider>
		</BrowserRouter>
	);
}

export default App;