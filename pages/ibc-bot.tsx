import type { NextPage } from 'next'
import Head from "next/head";
import {useReducer} from "react";
import {BotState, PageProps} from "../types/botTypes"
import { mongoConnect } from '../func/bot/db';

// Components
import Menu from "../components/menu/Menu"
import Card from "../components/ibc-bot/Card"
import Alert from "../components/Alert"

// Assets
import styles from '../styles/Home.module.css'
// import collections from '../data/collections.json'
import {classNames} from "../func/bot/helper";
import Image from 'next/image';

const IBCBot: NextPage<PageProps> = (props) => {

    const [state, setState] = useReducer(
        (state: BotState, newState: Partial<BotState>) => ({
            ...state,
            ...newState
        }),
        {
            collections: props.collections,
            networks: props.networks,
            loading: false,
            alertMsg: '',
            alertSeverity: '',
            discord: '',
            currentNetwork: {id: 0, name: props.networks[0].name, disabled: false},
            currentCollection: {id: 0, name: props.collections[0].name, disabled: false, contract: props.collections[0].contract}
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
            <Menu />
            <main className={styles.main}>
                <Card setState={setState} state={state} />
                <div className={classNames(state.alertMsg !== '' ? "absolute bottom-5 right-1 lg:right-5" : "hidden")}>
                    <Alert alertMsg={state.alertMsg} alertSeverity={state.alertSeverity} closeAlert={() => { setState({alertMsg: "", alertSeverity: ""}) }} />
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    try {
        // Get the Mongo DB client
        const database = await mongoConnect()

        // Grab the networks data
        const networksProjection = { _id: 0, id: 1, name: 1, disabled: 1 }
        const networks = await database.collection('networks').find().project(networksProjection).toArray()


        // Grab the collections data
        const projection = { _id: 0, id: 1, name: 1, disabled: 1, contract: 1 }
        const collections = await database.collection('info').find().project(projection).toArray()

        // Pass data to the page via props
        return { props: { collections: collections, networks: networks } }
    } catch (e: any) {
        console.error(e.message)
        return { 
            props: { 
                collections: [{id: 0,name: "Under Maintenance",disabled: true,contract: { address: null, hash: null}}],
                networks: [{id: 0,name: "Under Maintenance",disabled: true}]
            }
        }
    }
}

export default IBCBot