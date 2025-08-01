
import Header from "@/components/Header/Header";
import CallToActionSection from "@/components/Home/CallActionSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import TutorialSection from "@/components/Home/TutorialSection";
import { UserButton } from "@clerk/clerk-react";



export function Home() {
	return (
		<div>
			<Header/>
			<HeroSection/>
			<UserButton />
			<FeaturesSection />
			<TutorialSection/>
			<CallToActionSection/>
            
		</div>
	);
}