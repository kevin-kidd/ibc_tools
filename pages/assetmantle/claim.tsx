import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Menu from "../../components/menu/Menu";
import styles from "../../styles/Home.module.css";

const ClaimPage: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/IBC_NFT_Webclip.png" />
        <title>Stargaze Airdrop Tool for the SG-721 NFT standard ✈️</title>
        <meta name="description" content="IBCNFTs Stargaze Airdrop Tool allows you to bulk-send and/or mint SG-721 tokens (NFTs) in a simple step-by-step process. Quickly snapshot & airdrop with our tools." />
      </Head>
      <Menu />
      <main className={styles.main}>
        <div className="max-w-7xl mx-auto lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6 h-full">

        </div>
      </main>
    </>
  )
}

export default ClaimPage;