import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { AuthPage } from "./pages/AuthPage";


export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/authenticate" element={<AuthPage />} />
		</Routes>
	);
}