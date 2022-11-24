import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useReducer, useState } from "react";
import Alert from "../../components/Alert";
import Menu from "../../components/menu/Menu";
import { classNames } from "../../func/bot/helper";
import styles from "../../styles/AssetMantleClaim.module.css";
import Scroll from "react-scroll";
import type { MantleClaimState } from "../../types/mantleClaim";
import Image from "next/image";
import { Quests } from "../../components/assetmantle/Quests";

export type QuestData = {
  name: string;
  title: string;
  description: string;
  reward: {
    type: string;
    amount: number;
    name: string;
  };
  started: boolean;
  completed: boolean;
};

const questsData = [
  {
    name: "mantle-profile",
    title: "Create a MantlePlace profile",
    description: "Simply signup to MantlePlace to claim your reward.",
    reward: {
      type: "tokens",
      name: "$MNTL",
      amount: 10000,
    },
    started: true,
    completed: true,
  },
  {
    name: "mint-3",
    title: "Mint three NFTs on MantlePlace",
    description: "Mint three NFTs on MantlePlace to claim your reward.",
    reward: {
      type: "free-mint",
      name: "Free Mint",
      amount: 1,
    },
    started: true,
    completed: false,
  },
  {
    name: "mint-10",
    title: "Mint ten NFTs on MantlePlace",
    description: "Mint ten NFTs on MantlePlace to claim your reward.",
    reward: {
      type: "whitelist",
      name: "Whitelist Spot",
      amount: 1,
    },
    started: false,
    completed: false,
  },
];

const ClaimPage: NextPage = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>();

  const [state, setState] = useReducer(
    (state: MantleClaimState, newState: Partial<MantleClaimState>) => ({
      ...state,
      ...newState,
    }),
    {
      alertSeverity: "",
      alertMsg: "",
      connected: false,
    }
  );

  const handleConnect = async () => {
    try {
      const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      while (
        !window.keplr ||
        !window.getEnigmaUtils ||
        !window.getOfflineSignerOnlyAmino
      ) {
        await sleep(50);
      }
      await window.keplr.enable("mantle-1");
      const keplrOfflineSigner = window.getOfflineSignerOnlyAmino("mantle-1");
      const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
      setAddress(myAddress);
      setConnected(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setState({ alertMsg: error.message, alertSeverity: "error" });
      } else {
        setState({
          alertMsg: "Failed to connect to Keplr.",
          alertSeverity: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (connected) {
      const scroll = Scroll.animateScroll;
      scroll.scrollToBottom({ smooth: true });
    }
  }, [connected]);

  useEffect(() => {
    if (localStorage.getItem("connected")) {
      handleConnect();
    }
  }, []);

  const totalCompleted: number = useMemo(() => {
    let total = 0;
    questsData.forEach((questData: QuestData) => {
      if (questData.completed) total += 1;
    });
    return total;
  }, []);

  const encouragingMessage: string = useMemo(() => {
    if (totalCompleted === 0) return "Get Started.";
    if (totalCompleted < 3) return "Keep Going!";
    if (totalCompleted < 6) return "You're Killing It!";
    if (totalCompleted < 10) return "Soon done!";
    return "Completed!";
  }, [totalCompleted]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/IBC_NFT_Webclip.png" />
        <title>Stargaze Airdrop Tool for the SG-721 NFT standard ✈️</title>
        <meta
          name="description"
          content="IBCNFTs Stargaze Airdrop Tool allows you to bulk-send and/or mint SG-721 tokens (NFTs) in a simple step-by-step process. Quickly snapshot & airdrop with our tools."
        />
      </Head>
      <Menu />
      <main className={styles.main}>
        <section className="main-card flex flex-col justify-center items-center my-20 w-[95%] max-w-3xl pb-10 relative">
          <Image
            className="border border-[#f3eee9] h-60 object-cover w-full"
            src="/background.svg"
            alt="IBC NFTs"
            width={800}
            height={400}
          />
          <h1 className="text-3xl font-bold my-6">AssetMantle Claim</h1>
          <p className="text-black text-center max-w-md mb-6">
            Complete quests and earn $MNTL.
          </p>
          <p className="text-black text-center max-w-md mb-6">
            AssetMantle suite of NFT products creates a distributed economy
            where users can create not only NFT collections but their own NFT
            marketplaces and storefronts.
          </p>
          {connected ? (
            <p className="text-black text-sm absolute left-1 bottom-0">
              {address}
            </p>
          ) : (
            <>
              <p className="text-black text-center max-w-md mb-6">
                Please connect Keplr to proceed.
              </p>
              <button
                onClick={handleConnect}
                className="w-fit px-4 py-2 bg-lightyellow transition duration-150 button-dropshadow text-black font-bold"
              >
                Connect Keplr
              </button>
            </>
          )}
        </section>
        {connected && address && (
          <section className="main-card py-10 sm:px-4 lg:px-8 flex flex-col items-center mb-12 w-[95%] max-w-3xl">
            <h2 className="text-black font-bold text-3xl">
              COMPLETE QUESTS & EARN
            </h2>
            <h3 className="text-black text-lg my-6">
              {totalCompleted} of {questsData.length} Quests Completed -{" "}
              {encouragingMessage}
            </h3>
            <Quests questsData={questsData} />
          </section>
        )}
        <div
          className={classNames(
            state.alertMsg !== ""
              ? "fixed bottom-5 right-1 lg:right-5"
              : "hidden"
          )}
        >
          <Alert
            alertMsg={state.alertMsg}
            alertSeverity={state.alertSeverity}
            closeAlert={() => {
              setState({ alertMsg: "", alertSeverity: "" });
            }}
          />
        </div>
      </main>
    </>
  );
};

export default ClaimPage;
