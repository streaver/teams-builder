import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </main>
  );
}
