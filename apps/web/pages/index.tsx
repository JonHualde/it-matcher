import type { NextPage } from "next";
import AdvantagesSection from "shared/components/advantages-section/advantages-section";
import Introduction from "shared/components/introduction/introduction";
import KickStartSection from "shared/components/kick-start-section/kick-start-section";
import PublicPageLayout from "shared/components/layouts/public-page-layout";
import LetsDoThisSection from "shared/components/lets-do-this-section/lets-do-this-section";

const Home: NextPage = () => {
  return (
    <PublicPageLayout>
      <img src="../../public/uploads/pictures/be9b3bf2-776c-498a-b1b5-cb97323e2b56.png" alt="hero" />
      <Introduction />
      <AdvantagesSection />
      <KickStartSection />
      <LetsDoThisSection />
    </PublicPageLayout>
  );
};

export default Home;
