import Header from "@/components/Header/Header";
import CallToActionSection from "@/components/Home/CallActionSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import TutorialSection from "@/components/Home/TutorialSection";



export function Home() {
	return (
		<>
			<Header/>
			<HeroSection/>
			<FeaturesSection />
			<TutorialSection/>
			<CallToActionSection/>
            
		</>
	);
}