
import Header from "@/components/Header/Header";
import { UserButton } from "@clerk/clerk-react";



export function Home() {
	return (
		<div>
			<Header/>
			<UserButton />
          
            
		</div>
	);
}