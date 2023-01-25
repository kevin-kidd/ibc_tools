import type { NextPage } from "next";
import { useEffect, useReducer } from "react";

// Assets
import styles from "../../styles/Home.module.css";
import type { AirdropState } from "../../types/airdrop";
import Menu from "../../components/menu/Menu";
import Head from "next/head";
import ImportCard from "../../components/stargaze/airdrop/ImportCard";
import { Transition } from "@headlessui/react";
import { classNames } from "../../utils/bot/helper";
import Alert from "../../components/Alert";
import FormCard from "../../components/stargaze/airdrop/FormCard";
import Scroll from "react-scroll";
import ConfirmationCard from "../../components/stargaze/airdrop/ConfirmationCard";
import AirdropCard from "../../components/stargaze/airdrop/AirdropCard";

const StargazeAirdrop: NextPage = () => {
  const [state, setState] = useReducer(
    (state: AirdropState, newState: Partial<AirdropState>) => ({
      ...state,
      ...newState,
    }),
    {
      airdropList: [],
      mainnet: true,
      loading: false,
      indexOfAddress: 0,
      minterAddress: "",
      currentStep: 1,
      alertSeverity: "",
      alertMsg: "",
      dropFromInv: false,
      sg721Address: "",
    }
  );

  useEffect(() => {
    if (state.currentStep > 1) {
      const scroll = Scroll.animateScroll;
      scroll.scrollToBottom({ smooth: true });
    }
  }, [state.currentStep]);

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
        <div
          className={`max-w-7xl mx-auto lg:w-[50%] md:w-[60%] sm:w-3/4 w-5/6 h-full ${
            state.currentStep > 1 ? "md:mt-16 mt-20 mb-20" : "my-20 md:my-16"
          }`}
        >
          <ImportCard state={state} setState={setState} />
          <div className="w-full mt-16">
            <Transition
              show={state.currentStep >= 2}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <FormCard state={state} setState={setState} />
            </Transition>
          </div>
          <div className="w-full mt-16">
            <Transition
              show={state.currentStep >= 3}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ConfirmationCard state={state} setState={setState} />
            </Transition>
          </div>
          <div className="w-full mt-16">
            <Transition
              show={state.currentStep >= 4}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <AirdropCard state={state} setState={setState} />
            </Transition>
          </div>
        </div>
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

export default StargazeAirdrop;
