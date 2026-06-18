import { HeroSection } from "./HeroSection";
import { OldExhibitionSection } from "./OldExhibitionSection";
import { SurveyResultsSection } from "./SurveyResultsSection";
import { BackgroundSection } from "./BackgroundSection";
import { PeopleSection } from "./PeopleSection";
import { ContactSection } from "./ContactSection";
import spaceBg from "@/assets/images/space-bg.jpg";
import "./landing.css";
import { SummarySection } from "./SummarySection";
import { ExhibitionSection } from "./ExhibitionSection";

export function LandingPage() {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${spaceBg})` }}
    >
      <HeroSection />
      <SummarySection/>
      <ExhibitionSection />
      <BackgroundSection />
      <SurveyResultsSection />
      <PeopleSection />
      <OldExhibitionSection />
      <ContactSection />
    </div>
  );
}
