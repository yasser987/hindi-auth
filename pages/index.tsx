import { getSession, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import { GetServerSidePropsContext } from "next";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Updated App</title>
        <meta name="description" content="I have done my best at this app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{session ? <Authorize session={session} /> : <Guest />}</main>
    </div>
  );
}

// Guest User
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest HomePage</h3>
      <div className="flex justify-center">
        <Link
          href="/login"
          className="mt-5 px-5 py-1 rounded-md bg-indigo-500 text-gray-200"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

// Authorize User
function Authorize({ session }: { session: Session }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User HomePage</h3>

      <div className="details mt-4">
        <h4>{session.user?.name}</h4>
        <h4>{session?.user?.email}</h4>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-md bg-indigo-500 text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          href="/profile"
          className="mt-5 px-5 py-1 rounded-md bg-indigo-500 text-gray-200"
        >
          Profile Page
        </Link>
      </div>
    </main>
  );
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
