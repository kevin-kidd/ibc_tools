import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useMemo, useReducer, useState } from "react";
import Alert from "../../components/Alert";
import Menu from "../../components/menu/Menu";
import { classNames } from "../../utils/bot/helper";
import styles from "../../styles/AssetMantleClaim.module.css";
import Scroll from "react-scroll";
import type {
  Bounty,
  MantleClaimState,
  Program,
} from "../../types/mantleClaim";
import Image from "next/image";
import {
  Bounties,
  BOUNTIES_ENDPOINT,
} from "../../components/assetmantle/Bounties";
import { getPermit } from "../../utils/assetmantle/helper";
import ky from "ky";
import type { AminoSignResponse } from "cosmwasm";

const ClaimPage: NextPage<{ bounties: Bounty[] }> = ({ bounties }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>();
  const [connecting, setConnecting] = useState(false);

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
    setConnecting(true);
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    while (
      !window.keplr ||
      !window.getEnigmaUtils ||
      !window.getOfflineSignerOnlyAmino
    ) {
      await sleep(50);
    }
    let permit: AminoSignResponse | undefined;
    try {
      await window.keplr.enable("mantle-1");
      const keplrOfflineSigner = window.getOfflineSignerOnlyAmino("mantle-1");
      const [{ address }] = await keplrOfflineSigner.getAccounts();
      permit = await getPermit();
      setAddress(address);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setState({ alertMsg: error.message, alertSeverity: "error" });
        setConnecting(false);
      } else {
        setState({
          alertMsg: "Failed to connect to Keplr.",
          alertSeverity: "error",
        });
        setConnecting(false);
      }
    }
    ky.post(BOUNTIES_ENDPOINT + "auth/signIn", {
      json: {
        permit: permit,
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          for (const bounty of bounties) {
            ky.get(`${BOUNTIES_ENDPOINT}bounties/${bounties[0]._id}/status`, {
              credentials: "include",
            })
              .then((response) =>
                response.ok
                  ? (bounty.status = "completed")
                  : (bounty.status = undefined)
              )
              .catch((error) => console.error(error));
            bounty.startUrl = "https://marketplace.assetmantle.one/";
          }
          setConnecting(false);
          setConnected(true);
          const scroll = Scroll.animateScroll;
          scroll.scrollToBottom({ smooth: true });
        }
      })
      .catch((error) => {
        setState({
          alertMsg: "Failed to connect. Please try again later.",
          alertSeverity: "error",
        });
        setConnecting(false);
        console.error(error);
      });
  };

  const totalCompleted: number = useMemo(() => {
    let total = 0;
    bounties.forEach((bounty: Bounty) => {
      if (bounty.status === "completed") total += 1;
    });
    return total;
  }, [bounties]);

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
                disabled={connecting}
                className="w-fit px-4 py-2 bg-lightyellow transition duration-150
                  button-dropshadow text-black font-bold flex gap-1 items-center"
              >
                Connect Keplr
                {connecting && (
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
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
              {totalCompleted} of {bounties.length} Quests Completed -{" "}
              {encouragingMessage}
            </h3>
            <Bounties bounties={bounties} setState={setState} />
          </section>
        )}
        <div
          className={classNames(
            state.alertMsg !== ""
              ? "fixed bottom-5 right-1 lg:right-5 z-50"
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

export const getServerSideProps = async () => {
  const data = (await ky
    .get(BOUNTIES_ENDPOINT + "/bounties/programs?full=true")
    .json()) as Array<Program>;
  const mantlePlaceProgram = data.find(
    (program: Program) => program.name === "mantlePlace"
  );
  if (mantlePlaceProgram) {
    return {
      props: {
        bounties: mantlePlaceProgram.bounties,
      },
    };
  } else {
    return {
      props: {
        bounties: null,
      },
    };
  }
};

export default ClaimPage;
