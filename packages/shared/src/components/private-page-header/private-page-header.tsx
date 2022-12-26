import { useRouter } from "next/router";
// Components
import { Title } from "@shared-components/typography";

const PrivatePageHeader = () => {
  const router = useRouter();

  return (
    <div>
      <Title
        type="h5"
        action={() => router.push("/")}
        customClassName="my-0 h-[60px] cursor-pointer border-b border-pastel py-4 pl-12 text-left font-oswald font-medium italic text-blue-dimmed"
      >
        EXPERT MATCHER
      </Title>
    </div>
  );
};

export default PrivatePageHeader;
