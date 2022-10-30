import PublicPageLayout from "shared/components/layouts/public-page-layout";
import ListOfProjects from "shared/components/list-of-projects/list-of-projects";
import ProjectFull from "shared/components/project-full/project-full";

const Search = ({ pathname }: any) => {
  return (
    <PublicPageLayout pathname={pathname}>
      <div className="grid grid-cols-4 gap-x-6 py-4 px-8 h-full">
        <ListOfProjects />
        <ProjectFull />
      </div>
    </PublicPageLayout>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      pathname: context.resolvedUrl,
    },
  };
}

export default Search;
