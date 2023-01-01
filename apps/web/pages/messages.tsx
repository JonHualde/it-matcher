import { PrivatePageLayout } from "@shared-components/layouts";

const Messages = (props: any) => {
  return (
    <PrivatePageLayout title="Messages" pathname={props.pathname}>
      <div>Message page</div>
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

export default Messages;
