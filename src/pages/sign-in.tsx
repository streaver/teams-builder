import { SignInModal } from "@/components/sign-in/SignInModal";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { AUTHENTICATION_COOKIE_NAME } from "./api/sign-in";

export default function SignIn() {
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
      <SignInModal />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // If the user is already logged-in, we redirect them to the home page
  if (req.cookies[AUTHENTICATION_COOKIE_NAME]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
