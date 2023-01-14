import { PrivatePageLayout } from "@shared-components/layouts";

const Dashboard = (props: any) => {
  return (
    <PrivatePageLayout title="Dashboard" pathname={props.pathname}>
      {/* <div>dashboard page</div> */}
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
