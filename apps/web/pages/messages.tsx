import Link from "next/link";
import { useRouter } from "next/router";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import PrivatePageLayout from "shared/components/layouts/private-page-layout";

// helpers
import Jwt from "../utils/jwt";

export async function getServerSideProps(ctx: any) {
  let user;

  try {
    user = new Jwt(ctx.req.cookies.access_token).verifyToken();

    if (user.error) {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      user: {
        id: user.id,
        email: user.email,
        permission: user.permission,
      },
      pathname: ctx.resolvedUrl,
    },
  };
}

const Messages = (props: any) => {
  return (
    <PrivatePageLayout title="Messages" pathname={props.pathname}>
      <div>Message page</div>
    </PrivatePageLayout>
  );
};

export default Messages;
