import { HeroSection } from "./HeroSection";
import { OldExhibitionSection } from "./OldExhibitionSection";
import { SurveyInsightsSection } from "./SurveyInsightsSection";
import { BackgroundSection } from "./BackgroundSection";
import { PeopleSection } from "./PeopleSection";
import { ContactSection } from "./ContactSection";
import spaceBg from "@/assets/images/space-bg.jpg";
import "./landing.css";
import { SummarySection } from "./SummarySection";
import { ExhibitionSection } from "./ExhibitionSection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${spaceBg})` }}
    >
      <HeroSection />
      <SummarySection />
      <ExhibitionSection />
      <BackgroundSection />
      <SurveyInsightsSection />
      <PeopleSection />
      <OldExhibitionSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
