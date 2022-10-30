import type { NextPage } from "next";
import AdvantagesSection from "shared/components/advantages-section/advantages-section";
import Introduction from "shared/components/introduction/introduction";
import KickStartSection from "shared/components/kick-start-section/kick-start-section";
import PublicPageLayout from "shared/components/layouts/public-page-layout";
import LetsDoThisSection from "shared/components/lets-do-this-section/lets-do-this-section";

const Home: NextPage = () => {
  return (
    <PublicPageLayout>
      <Introduction />
      <AdvantagesSection />
      <KickStartSection />
      <LetsDoThisSection />
    </PublicPageLayout>
  );
};

export default Home;
