import { HomeHeader } from "./components/HomeHeader";
import { HeroSection } from "./components/HeroSection";
import { TrustedCompanies } from "./components/TrustedCompanies";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { DeepDiveSection } from "./components/DeepDiveSection";
import { FaqSection } from "./components/FaqSection";
import { HomeFooter } from "./components/HomeFooter";

export const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <main>
        <HeroSection />
        <TrustedCompanies />
        <FeaturesGrid />
        <DeepDiveSection />
        <FaqSection />
      </main>
      <HomeFooter />
    </>
  );
};
