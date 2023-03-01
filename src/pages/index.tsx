import { Bench } from "@/components/Bench";
import { AuthModal } from "@/components/sign-in/AuthModal";
import { RecoilProvider } from "@/providers/RecoilProvider";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const DynamicInfiniteCanvas = dynamic(
  () => import("@/components/InfiniteCanvas"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? (
        <AuthModal setShowModal={setShowModal} />
      ) : (
        <>
          <Head>
            <title>Streaver | DAM </title>
            <meta
              name="description"
              content="Streaver's team builder application"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/dam.png" />
          </Head>
          <RecoilProvider>
            <div className="flex w-full h-full">
              <DynamicInfiniteCanvas />
              <div className="w-1/5 shrink-0" />
              <Bench />
            </div>
          </RecoilProvider>
        </>
      )}
    </>
  );
}
