import Link from "next/link";

const PublicPageNavigation = () => {
  return (
    <div className="flex items-center">
      <ul className="flex items-center">
        <Link href="/">
          <li className="text-blue-dimmed font-medium text-xl cursor-pointer hover:scale-105 transform transition-all mx-4">
            Home
          </li>
        </Link>
        {/* <Link href="/product">
          <li className="text-blue-dimmed font-medium text-xl cursor-pointer hover:scale-105 transform transition-all mx-4">
            Product
          </li>
        </Link>
        <Link href="/the-team">
          <li className="text-blue-dimmed font-medium text-xl cursor-pointer hover:scale-105 transform transition-all mx-4">
            The Team
          </li>
        </Link> */}
        <Link href="/contact">
          <li className="text-blue-dimmed font-medium text-xl cursor-pointer hover:scale-105 transform transition-all mx-4">
            Contact
          </li>
        </Link>
        <Link href="/search">
          <li className="text-blue-dimmed font-medium text-xl cursor-pointer hover:scale-105 transform transition-all mx-4">
            Find A Project
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default PublicPageNavigation;
