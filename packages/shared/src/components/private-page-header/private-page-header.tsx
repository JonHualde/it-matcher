import { useRouter } from "next/router";

const PrivatePageHeader = () => {
  const router = useRouter();

  return (
    <div>
      <h4
        onClick={() => router.push("/")}
        className="h-[80px] my-0 font-oswald border-b border-pastel text-blue-dimmed font-medium italic cursor-pointer py-6 text-left pl-12"
      >
        EXPERT MATCHER
      </h4>
    </div>
  );
};

export default PrivatePageHeader;
