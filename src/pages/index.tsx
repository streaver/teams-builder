import { Bench } from "@/components/Bench";
import { AUTHENTICATION_COOKIE_NAME } from "@/pages/api/sign-in";
import { RecoilProvider } from "@/providers/RecoilProvider";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const DynamicInfiniteCanvas = dynamic(
  () => import("@/components/InfiniteCanvas"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Streaver | DAM </title>
        <meta
          name="description"
          content="Streaver's team builder application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dam.png" />
      </Head>
      <RecoilProvider>
        <div className="flex w-full h-full">
          <DndProvider backend={HTML5Backend}>
            <DynamicInfiniteCanvas />
            <div className="w-1/5 shrink-0" />
            <Bench />
          </DndProvider>
        </div>
      </RecoilProvider>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // If the user is not logged-in, we redirect them to the sign-in page
  if (!req.cookies[AUTHENTICATION_COOKIE_NAME]) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
