import { useWeb3Contract } from "react-moralis"
import { contractAddress, abi } from "../constants"
// dont export from moralis when using react
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const lotteryAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

    // State hooks
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    const [enteranceFee, setEnteranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("1")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterLottery,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        msgValue: enteranceFee,
        params: {},
    })

    /* View Functions */

    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the networkId
        functionName: "getEnteranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        // Another way we could make a contract call:
        // const options = { abi, contractAddress: raffleAddress }
        // const fee = await Moralis.executeFunction({
        //     functionName: "getEntranceFee",
        //     ...options,
        // })
        const enteranceFeeFromCall = (await getEnteranceFee()).toString()
        // const enteranceFeeFromCall = await getEnteranceFee()

        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        // const numPlayersFromCall = await getNumberOfPlayers()

        const recentWinnerFromCall = await getRecentWinner()
        setEnteranceFee(enteranceFeeFromCall)
        setNumberOfPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])
    // no list means it'll update everytime anything changes or happens
    // empty list means it'll run once after the initial rendering
    // and dependencies mean it'll run whenever those things in the list change

    // An example filter for listening for events, we will learn more on this next Front end lesson
    // const filter = {
    //     address: raffleAddress,
    //     topics: [
    //         // the name of the event, parnetheses containing the data type of each event, no spaces
    //         utils.id("RaffleEnter(address)"),
    //     ],
    // }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    // Probably could add some error handling
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        updateUIValues()
        handleNewNotification(tx)
    }

    // const handleNotification = function () {
    //     dispatch({
    //         type: "info",
    //         message: "Transaction Complete",
    //     })
    // }

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
            {lotteryAddress ? (
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await enterLottery({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Lottery"
                        )}
                    </button>
                    <div>Entrance Fee: {ethers.utils.formatUnits(enteranceFee, "ether")} ETH</div>
                    <div>The current number of players is: {numberOfPlayers}</div>
                    <div>The most previous winner was: {recentWinner}</div>
                </>
            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}

// import React from "react"
// import { useWeb3Contract } from "react-moralis"
// import { abi, contractAddress } from "../constants"
// // import { contractAddresses } from "../constants/ContractAddresses.json"
// // import { abi } from "../constants/abi.json"
// // import { useWeb3Contract } from "react-moralis"
// import { useMoralis } from "react-moralis"
// import { useState, useEffect } from "react"
// import { ethers } from "ethers"

// const LotteryEntrance = () => {
//     const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis()
//     console.log(parseInt(chainIdHex))
//     const chainId = parseInt(chainIdHex)
//     // const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
//     const lotteryAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

//     // let entranceFee = ""

//     //   const {runContractFunction: enterLottery} = useWeb3Contract({
//     //       abi: abi,
//     //       contractAddress: contractAddress,
//     //       functionName: 'enterLottery',
//     //       params: {} //,
//     //       msgValue: //
//     //   })
//     const [entranceFee, setEntranceFee] = useState("0")

//     const { runContractFunction: getEnteranceFee } = useWeb3Contract({
//         abi: abi,
//         contractAddress: lotteryAddress,
//         functionName: "getEnteranceFee",
//         params: {},
//         // msgValue: //,
//     })

//     useEffect(() => {
//         if (isWeb3Enabled) {
//             async function updateUI() {
//                 //   const entranceFeeFromContract = await getEntranceFee()
//                 const entranceFeeFromCall = (await getEnteranceFee()).toString()

//                 // setEnteranceFee(ethers.utils.formatUnits(entranceFeeFromCall, "ethers"))
//                 setEntranceFee(entranceFeeFromCall)
//                 console.log(entranceFee)
//             }
//             updateUI()
//         }
//     }, [isWeb3Enabled])

//     return (
//         <>
//             Hi from lottery entrance!<div>{entranceFee}</div>
//             <div>
//                 {/* <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
//                     onClick={async () =>
//                         await enterRaffle({
//                             // onComplete:
//                             // onError:
//                             onSuccess: handleSuccess,
//                             onError: (error) => console.log(error),
//                         })
//                     }
//                     disabled={isLoading || isFetching}
//                 >
//                     {isLoading || isFetching ? (
//                         <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
//                     ) : (
//                         "Enter Raffle"
//                     )}
//                 </button> */}
//             </div>
//         </>
//     )
// }

// export default LotteryEntrance
