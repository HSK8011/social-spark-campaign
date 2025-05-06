
import LandingNav from "@/components/LandingNav";
import LandingHero from "@/components/LandingHero";
import FeatureSection from "@/components/FeatureSection";
import FeaturesDetail from "@/components/FeaturesDetail";
import LandingFooter from "@/components/LandingFooter";

const LandingPage = () => {
  return (
    <div>
      <LandingNav />
      <LandingHero />
      <FeatureSection />
      <FeaturesDetail />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
