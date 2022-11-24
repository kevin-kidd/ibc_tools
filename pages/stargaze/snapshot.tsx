import type { NextPage } from "next";
import { useReducer } from "react";

// Components
import Head from "next/head";
import Menu from "../../components/menu/Menu";
import FormCard from "../../components/stargaze/snapshot/FormCard";
import CollectionCard from "../../components/stargaze/snapshot/CollectionCard";

// Assets
import styles from "../../styles/Home.module.css";
import type { SnapshotState } from "../../types/snapshot";
import HoldersCard from "../../components/stargaze/snapshot/HoldersCard";
import Image from "next/image";

export const defaultConfig = {
  uniqueOnly: false,
  tokenAmount: { min: -1, max: -1 },
};

const Snapshot: NextPage = () => {
  const [state, setState] = useReducer(
    (state: SnapshotState, newState: Partial<SnapshotState>) => ({
      ...state,
      ...newState,
    }),
    {
      loading: false,
      currentPage: 1,
      owners: [],
      pageOfOwners: [],
      ownersToExport: [],
      address: "",
      config: defaultConfig,
      uniqueHolders: [],
    }
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/IBC_NFT_Webclip.png" />
        <title>Stargaze Snapshot Tool for the SG-721 NFT standard 📸</title>
        <meta
          name="description"
          content="Use IBCNFTs Stargaze Snapshot Tool in your NFT community to extract all the holders of any collection on the Stargaze blockchain."
        />
      </Head>
      <Menu />
      <main className={styles.main}>
        {state.owners.length === 0 ? (
          <FormCard state={state} setState={setState} />
        ) : (
          <>
            <CollectionCard state={state} setState={setState} />
            <HoldersCard setState={setState} state={state} />
          </>
        )}
      </main>
    </>
  );
};

export default Snapshot;
