import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { AuthPage } from "./pages/AuthPage";
import VacationResultPage from "./pages/VacationResultPage";
import RelocationResultPage from "./pages/RelocationResultPage";
import ListTravelPlansPage from "./pages/ListTravelPlansPage";
import PlanFormPage from "./pages/PlanFormPage";
import HeaderDestination from "./layouts/HeaderDestination";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/authenticate" element={<AuthPage />} />

			<Route element={<HeaderDestination />}>
				<Route path="/my-plans" element={<ListTravelPlansPage />} />
				<Route path="/plan-form" element={<PlanFormPage />} />
				<Route path="/vacation-plan/:id" element={<VacationResultPage />} />
				<Route path="/relocation-plan/:id" element={<RelocationResultPage />} />
			</Route>
		</Routes>
	);
}