import type { NextPage } from 'next'
import Head from "next/head";
import {useReducer} from "react";
import {BotState} from "../types/botTypes"

// Components
import Menu from "../components/menu/Menu"
import Card from "../components/ibc-bot/Card"
import Alert from "../components/ibc-bot/Alert"

// Assets
import styles from '../styles/Home.module.css'
import networks from '../data/networks.json'
import collections from '../data/collections.json'
import {classNames} from "../func/bot/helper";


const IBCBot: NextPage = () => {

    const [state, setState] = useReducer(
        (state: BotState, newState: Partial<BotState>) => ({
            ...state,
            ...newState
        }),
        {
            loading: false,
            alertMsg: '',
            alertSeverity: '',
            discord: '',
            network: {id: 0, name: networks[0].name, disabled: false},
            collection: {id: 0, name: collections[0].name, disabled: false, contract: collections[0].contract}
        }
    )

  return (
    <>
        <Head>
            <link rel="icon" href="/favicon.png" type="image/x-icon" />
            <link rel="apple-touch-icon" href="/IBC_NFT_Webclip.png" />
            <title>Manage your community with Discord NFT verification! 🤖</title>
            <meta name="description" content="IBC Bot is a Discord bot for community management, including NFT proof-of-ownership that allows you to verify NFT holders and tokenize your community." />
        </Head>
        <img className="lg:hidden md:hidden" src="/assetmantle_mobile_banner.png" alt="banner" />
        <img className="hidden lg:flex md:flex" src="/assetmantle_desktop_banner.png" alt="banner" />
        <Menu />
        <main className={styles.main}>
            <Card setState={setState} state={state} />
                <div className={classNames(state.alertMsg !== '' ? "absolute bottom-5 right-1 lg:right-5" : "hidden")}>
                    <Alert state={state} setState={setState} />
                </div>
        </main>
    </>
  )
}

export default IBCBot
