import axios from "axios";

interface ClerkSession {
	getToken(): Promise<string | null>;
}

interface ClerkGlobal {
	session: ClerkSession;
}

declare global {
	interface Window {
		Clerk?: ClerkGlobal;
	}
}

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const getAuthToken = async (): Promise<string | null> => {
	try {
		if (typeof window !== 'undefined' && window.Clerk?.session) {
			await new Promise(resolve => setTimeout(resolve, 500));
			
			const token = await window.Clerk.session.getToken();
			return token;
		}
		return null;
	} catch (error) {
		throw new Error("Error getting auth token");
	}
};

api.interceptors.request.use(async (config) => {
	try {
		// Wait for Clerk to initialize
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		const token = await getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (error) {
		throw new Error("Error getting auth token");
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			throw new Error("Invalid auth token");
		}
		throw new Error("Error getting auth token");
	}
);

export default api;