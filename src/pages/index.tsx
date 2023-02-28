import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import { AuthModal } from "@/components/sign-in/AuthModal";

const DynamicInfiniteCanvas = dynamic(
  () => import("@/components/InfiniteCanvas"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {" "}
      <AuthModal setShowModal={setShowModal} />
      {!showModal ? (
        <>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex w-full h-full">
            <DynamicInfiniteCanvas />
          </div>
        </>
      ) : null}
    </>
  );
}
