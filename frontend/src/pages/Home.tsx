import { UserButton } from "@clerk/react-router";
import { Link } from "react-router";

export function Home() {
	return (
		<div>
			<h1>Home</h1>
            <UserButton />
            <Link to="/sign-up">Signup</Link>
            <Link to="/login">Login</Link>
		</div>
	);
}