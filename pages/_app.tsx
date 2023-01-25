import "../styles/globals.css";
import "@fontsource/inconsolata";
import type { AppProps } from "next/app";
import { Inconsolata } from "@next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inconsolata.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
