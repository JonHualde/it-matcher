import PublicPageLayout from "shared/src/components/layouts/public-page-layout";
import ListOfProjects from "shared/src/components/list-of-projects/list-of-projects";
import ProjectFull from "shared/src/components/project-full/project-full";

const Search = ({ pathname }: any) => {
  return (
    <PublicPageLayout pathname={pathname}>
      <div className="grid h-full grid-cols-4 gap-x-6 py-4 px-8">
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
