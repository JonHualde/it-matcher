import type { NextPage } from "next";
import PublicPageLayout from "shared/src/components/layouts/public-page-layout";

// Components
import ContactForm from "shared/src/components/contact/contact";

const Home: NextPage = () => {
  return (
    <PublicPageLayout>
      <ContactForm />
    </PublicPageLayout>
  );
};

export default Home;
