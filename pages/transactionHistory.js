import Head from "next/head";
import styles from "@/styles/TransactionHistory.module.css";
import {
  useConnect,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { GET_USERS_TRANSACTIONS } from "../queries";
import { useQuery } from "@apollo/client";
import {
  ANGEL_ADDRESS,
  ASSETS,
  DEFAULT_PROFILE_IMAGE,
  addAngelSuffix,
  convertTimeStampToReadableDate,
  handleCopyClick,
  truncateAddr,
} from "@/utils";
import { useState } from "react";
import { ANGEL_ABI } from "@/abi";
import { useRouter } from "next/router";

export default function TransactionHistory() {
  const [txSelecteed, setTxSelected] = useState();
  const [clicked, setClicked] = useState();

  const router = useRouter();

  const { isConnected, address } = useAccount();

  const { loading: getTxHistory, data: txHistory } = useQuery(
    GET_USERS_TRANSACTIONS,
    {
      variables: { user: address },
    }
  );

  const { config: reclaimFundsConfig } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "reclaimFunds",
    args: [txSelecteed && txSelecteed.txReference],
  });

  const { write: reclaimFunds } = useContractWrite(reclaimFundsConfig);

  return (
    <>
      <Head>
        <title>Angel Protocol</title>
        <meta name="description" content="Angel Protocol Landing page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        {!isConnected ? (
          <ConnectWallet />
        ) : (
          <div className={styles.claims}>
            <MenuBar />

            <div className={styles.content}>
              <TopBar />
              <div className="whiteContent">
                <h3 className={styles.title}>Transaction History</h3>

                {/* TRANSACTIONS */}
                <div className={styles.transactionsContainer}>
                  <div className={styles.transactionList}>
                    {txHistory
                      ? txHistory.transactionEntities.map((tx) => {
                          let color;
                          let sign;
                          let fromOrTo;
                          if (tx.txType) {
                            color = "#191919";
                          }

                          if (tx.recipient == address.toLocaleLowerCase()) {
                            color = "#06BF3D";
                            if (tx.status != 3) sign = "+";
                            fromOrTo = "From";
                          }
                          if (tx.sender == address.toLocaleLowerCase()) {
                            color = "#C51010";
                            if (tx.status != 3) sign = "-";
                            fromOrTo = "To";
                          }

                          if (tx.status == 3) {
                            color = "#9A640E";
                          }
                          return (
                            <div
                              className={
                                clicked == tx.id ? styles.txClicked : styles.tx
                              }
                              onClick={() => {
                                setTxSelected({
                                  from: tx.senderUserName,
                                  to:
                                    tx.recipientUserName == "nousername"
                                      ? tx.recipient
                                      : tx.recipientUserName,
                                  sender: tx.sender,
                                  recipient: tx.recipient,
                                  asset: ASSETS[tx.asset]
                                    ? ASSETS[tx.asset]
                                    : truncateAddr(tx.asset),
                                  txType: tx.txType,
                                  amountOrTokenId: tx.txType
                                    ? tx.amountOrTokenId
                                    : tx.amountOrTokenId / 10 ** 18,
                                  narration: tx.narration,
                                  txReference: tx.txReference,
                                  status: tx.status,
                                  color: color,
                                  sign: sign,
                                  time: convertTimeStampToReadableDate(tx.time),
                                  fromOrTo: fromOrTo,
                                });
                                setClicked(tx.id);
                              }}
                            >
                              <img src={DEFAULT_PROFILE_IMAGE} />

                              <div className={styles.info}>
                                <h3>{addAngelSuffix(tx.senderUserName)}</h3>

                                <div>
                                  <p className={styles.anotherBlue}>
                                    {ASSETS[tx.asset]
                                      ? ASSETS[tx.asset]
                                      : truncateAddr(tx.asset)}
                                  </p>
                                  <p>
                                    {convertTimeStampToReadableDate(tx.time)}
                                  </p>
                                </div>
                              </div>

                              <div className={styles.amount}>
                                <h3>{tx.txType ? "Token ID" : "Amount"}</h3>
                                <p
                                  className={styles.anotherBlue}
                                  style={{ color: color }}
                                >
                                  {!tx.txType && sign}{" "}
                                  {tx.txType
                                    ? tx.amountOrTokenId
                                    : tx.amountOrTokenId / 10 ** 18}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : "Getting Transactions..."}
                  </div>

                  {txSelecteed && (
                    <div className={styles.txSection}>
                      <div className={styles.dateAndTime}>
                        <p>{txSelecteed.time}</p>
                        <img
                          src="/icons/repeat.png"
                          onClick={() =>
                            router.push({
                              pathname: "/transferAssets/transfer",
                              query: {
                                txType: txSelecteed.txType,
                                beneficiary:
                                  txSelecteed.sender ==
                                  address.toLocaleLowerCase()
                                    ? txSelecteed.recipient
                                    : txSelecteed.sender,
                              },
                            })
                          }
                          className={styles.sendButton}
                        />
                      </div>

                      <p>{txSelecteed.fromOrTo}</p>
                      <h3>
                        {addAngelSuffix(
                          txSelecteed.fromOrTo == "From"
                            ? txSelecteed.from
                            : txSelecteed.to
                        )}
                      </h3>

                      <p>Asset</p>
                      <h3>{txSelecteed.asset}</h3>

                      <p>{txSelecteed.txType ? "Token ID" : "Amount"}</p>
                      <h3 style={{ color: txSelecteed.color }}>
                        {!txSelecteed.txType && txSelecteed.sign}{" "}
                        {txSelecteed.amountOrTokenId}
                      </h3>

                      <p>Narration</p>
                      <h3>{txSelecteed.narration}</h3>

                      <p>Transaction Reference</p>
                      <h3 className={styles.txRef}>
                        <p>{txSelecteed.txReference}</p>
                        <img
                          src="/icons/copy.png"
                          className={styles.copyButton}
                          onClick={() => {
                            handleCopyClick(txSelecteed.txReference);
                            alert("Copied To Clipboard");
                          }}
                        />
                      </h3>

                      <p>Status</p>
                      <h3 className={styles.txRef}>
                        {txSelecteed.status == 1 && (
                          <div className={styles.status}>
                            <div className={styles.pendingCircle}></div>
                            <p>Pending</p>
                            <button
                              disabled={!reclaimFunds}
                              onClick={() => reclaimFunds()}
                            >
                              Reclaim
                            </button>
                          </div>
                        )}

                        {txSelecteed.status == 2 && (
                          <div className={styles.status}>
                            <div className={styles.successCircle}></div>
                            <p>Succesful</p>
                          </div>
                        )}

                        {txSelecteed.status == 3 && (
                          <div className={styles.status}>
                            <div className={styles.reclaimCircle}></div>
                            <p>Reclaimed</p>
                          </div>
                        )}
                      </h3>
                    </div>
                  )}
                </div>

                {/*  */}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
