import PrivatePageLayout from "shared/src/components/layouts/private-page-layout";

const Dashboard = (props: any) => {
  return (
    <PrivatePageLayout title="Dashboard" pathname={props.pathname}>
      <div>dashboard page</div>
    </PrivatePageLayout>
  );
};

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      pathname: ctx.resolvedUrl,
    },
  };
}

export default Dashboard;
