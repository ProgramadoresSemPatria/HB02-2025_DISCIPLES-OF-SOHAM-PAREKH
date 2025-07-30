import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { SignUpPage } from "./pages/SignUp";
import { Login } from "./pages/Login";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}