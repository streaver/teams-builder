import { Bench } from "@/components/Bench";
import { AuthModal } from "@/components/sign-in/AuthModal";
import { RecoilProvider } from "@/providers/RecoilProvider";
import { promises as fs } from "fs";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const DynamicInfiniteCanvas = dynamic(
  () => import("@/components/InfiniteCanvas"),
  {
    ssr: false,
  }
);

type Props = {
  teamsJson: string;
  teamMembersJson: string;
};

export default function Home({ teamsJson, teamMembersJson }: Props) {
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
          <RecoilProvider
            teams={JSON.parse(teamsJson)}
            teamMembers={JSON.parse(teamMembersJson)}
          >
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

export const getServerSideProps: GetServerSideProps = async () => {
  const rootDirectory = process.cwd() + "/src";

  const teamsJson = await fs.readFile(rootDirectory + "/teams.json", "utf8");
  const teamMembersJson = await fs.readFile(
    rootDirectory + "/team-members.json",
    "utf8"
  );

  return {
    props: {
      teamsJson,
      teamMembersJson,
    },
  };
};
