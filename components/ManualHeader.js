import { useMoralis } from "react-moralis"

import React from "react"
import { useState, useEffect } from "react"

const ManualHeader = () => {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(() => {
        // console.log("Hi")
        if (isWeb3Enabled) return
        if (typeof window !== "defined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
        // console.log(isWebEnabled)
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManualHeader

// import React from "react"
// import { useState, useEffect } from "react"
// import { ethers } from "ethers"
// import Web3Modal from "web3modal"
// import styles from "../styles/Home.module.css"
// import WalletConnectProvider from "@walletconnect/web3-provider"
// import CoinbaseWallet from "@coinbase/wallet-sdk"
// // to import abi which will be in index or app

// let web3Modal

// // Create WalletConnectProvider
// const providerOptions = {
//     walletconnet: {
//         package: WalletConnectProvider,
//         options: {
//             rpc: { 4: process.env.NEXT_PUBLIC_RPC_URL },
//             appName: "Web 3 Modal Wallet",
//             infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
//         },
//     },
//     coinbasewallet: {
//         package: CoinbaseWallet,
//         options: {
//             rpc: { 4: process.env.NEXT_PUBLIC_RPC_URL },
//             appName: "Web 3 Modal Wallet",
//             infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
//         },
//     },
// }

// await provider.enable()
// if (typeof window !== "")
// if (typeof window !== "undefined") {
//     web3Modal = new Web3Modal({
//         cacheProvider: false,
//         providerOptions,
//     })
// }
// const ManualHeader = () => {
//     const [isConnected, setIsConnected] = useState(false)

//     async function connect() {
// web3Modal = new Web3Modal({
// cacheProvider: false,
//     const web3ModalProvider = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(web3ModalProvider)
// }
// }

//     return (
//         <div>
//             <button onClick={() => connect()}>Connect</button>
//         </div>
//     )
// }

// export default ManualHeader

// const provider = new WalletConnectProvider({
//     infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
// })

//  Enable session (triggers QR Code modal)
// await provider.enable()

//  Create Web3
// const web3 = new Web3(provider)
