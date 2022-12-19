import type { NextPage } from "next";
import AdvantagesSection from "shared/src/components/advantages-section/advantages-section";
import Introduction from "shared/src/components/introduction/introduction";
import KickStartSection from "shared/src/components/kick-start-section/kick-start-section";
import PublicPageLayout from "shared/src/components/layouts/public-page-layout";
import LetsDoThisSection from "shared/src/components/lets-do-this-section/lets-do-this-section";

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
