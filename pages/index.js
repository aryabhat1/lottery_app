import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
// import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import { MoralisProvider } from "react-moralis"
import LotteryEntrance from "../components/LotteryEnterance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lottery App</title>
                <meta name="description" content="Decentralized Lottery System" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            {/* <ManualHeader /> */}
            <Header />
            <LotteryEntrance />
        </div>
    )
}
