import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React from "react";

export default function profile() {
  return <div>profile</div>;
}

export async function getServerSideProps({
  req,
}: GetServerSidePropsContext): Promise<
  | {
      redirect: {
        destination: string;
        permanent: boolean;
      };
    }
  | { props: { session: Session | null } }
> {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
