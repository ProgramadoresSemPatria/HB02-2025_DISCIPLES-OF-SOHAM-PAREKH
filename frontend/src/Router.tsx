import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { AuthPage } from "./pages/AuthPage";
import ChosenCountryToTravelPage from "./pages/ChosenCountryToTravelPage";
import ChosenCountryRelocate from "./pages/ChosenCountryRelocate";


export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/authenticate" element={<AuthPage />} />
			<Route path="/country-travel" element={<ChosenCountryToTravelPage/>}/>
			<Route path="/country-relocate" element={<ChosenCountryRelocate/>}/>
		</Routes>
	);
}