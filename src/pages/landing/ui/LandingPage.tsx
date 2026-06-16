import { HeroSection } from "./HeroSection";
import { ExhibitionSection } from "./ExhibitionSection";
import { SurveyResultsSection } from "./SurveyResultsSection";
import { BackgroundSection } from "./BackgroundSection";
import { PeopleSection } from "./PeopleSection";
import { ContactSection } from "./ContactSection";
import spaceBg from "@/assets/images/space-bg.jpg";
import "./landing.css";
import { SummarySection } from "./SummarySection";

export function LandingPage() {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${spaceBg})` }}
    >
      <HeroSection />
      <SummarySection/>
      <ExhibitionSection />
      <SurveyResultsSection />
      <BackgroundSection />
      <PeopleSection />
      <ContactSection />
    </div>
  );
}
