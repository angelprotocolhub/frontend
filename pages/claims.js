import Head from "next/head";
import styles from "@/styles/Claims.module.css";
import {
  useConnect,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { GET_USER_CLAIMS } from "../queries";
import { useQuery } from "@apollo/client";
import {
  ANGEL_ADDRESS,
  ASSETS,
  CLAIM_IMAGE,
  addAngelSuffix,
  handleCopyClick,
  truncateAddr,
} from "@/utils";
import { useState } from "react";
import { ANGEL_ABI } from "@/abi";

const connector = new MetaMaskConnector();

export default function Claims() {
  const [claimSelected, setClaimSelected] = useState();
  const [claimCode, setClaimCode] = useState();
  const [clicked, setClicked] = useState();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { isConnected, address } = useAccount();

  const { config: claimConfig, error: claimError } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "claimFunds",
    args: [claimSelected && claimSelected.txReference, claimCode],
  });

  const { write: claimFunds } = useContractWrite(claimConfig);

  const { loading: getClaimsLoading, data: claimsData } = useQuery(
    GET_USER_CLAIMS,
    {
      variables: { user: address, status: 1 },
    }
  );

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
                <h3 className={styles.title}>All Claims</h3>

                <div className={styles.claimContainer}>
                  <div className={styles.claimsList}>
                    {claimsData &&
                      claimsData.transactionEntities &&
                      claimsData.transactionEntities.length == 0 && (
                        <p style={{ paddingLeft: "20px", fontSize: "20px" }}>
                          No Claim Available
                        </p>
                      )}
                    {claimsData
                      ? claimsData.transactionEntities.map((claim) => {
                          return (
                            <div
                              className={
                                clicked == claim.id
                                  ? styles.claimClicked
                                  : styles.claim
                              }
                              onClick={() => {
                                setClaimSelected({
                                  from: claim.senderUserName,
                                  asset: ASSETS[claim.asset]
                                    ? ASSETS[claim.asset]
                                    : truncateAddr(claim.asset),
                                  txType: claim.txType,
                                  amountOrTokenId: claim.txType
                                    ? claim.amountOrTokenId
                                    : claim.amountOrTokenId / 10 ** 18,
                                  narration: claim.narration,
                                  txReference: claim.txReference,
                                });
                                setClicked(claim.id);
                              }}
                              key={claim.id}
                            >
                              <img src={CLAIM_IMAGE} />

                              <div className={styles.info}>
                                <h3>{addAngelSuffix(claim.senderUserName)}</h3>
                                <p className={styles.anotherBlue}>
                                  {ASSETS[claim.asset]
                                    ? ASSETS[claim.asset]
                                    : truncateAddr(claim.asset)}
                                </p>
                              </div>

                              <div className={styles.amount}>
                                <h3>{claim.txType ? "Token ID" : "Amount"}</h3>
                                <p className={styles.specificAmount}>
                                  {claim.txType
                                    ? claim.amountOrTokenId
                                    : claim.amountOrTokenId / 10 ** 18}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : "Getting Claims..."}
                  </div>

                  {claimSelected && (
                    <div className={styles.claimSection}>
                      <p>From</p>
                      <h3>{claimSelected.from}</h3>
                      <p>Asset</p>
                      <h3>{claimSelected.asset}</h3>
                      <p>{claimSelected.txType ? "Token ID" : "Amount"}</p>
                      <h3>{claimSelected.amountOrTokenId}</h3>
                      <p>Narration</p>
                      <h3>{claimSelected.narration}</h3>
                      <p>Transaction Reference</p>
                      <h3 className={styles.txRef}>
                        <p>{claimSelected.txReference}</p>
                        <img
                          src="/icons/copy.png"
                          className={styles.copyButton}
                          onClick={() => {
                            handleCopyClick(claimSelected.txReference);
                            alert("Copied To Clipboard");
                          }}
                        />
                      </h3>
                      <input
                        placeholder="Claim Code"
                        onChange={(e) => setClaimCode(e.target.value)}
                      />
                      {claimError &&
                        claimError.message &&
                        claimError.message.includes("Claim Time Is Over") && (
                          <span className="errorMsg">
                            Claim Time Is Over For Transaction
                          </span>
                        )}
                      {claimError &&
                        claimError.message &&
                        claimError.message.includes("Incorrect Claim Code") && (
                          <span className="errorMsg">
                            Incorrect Claim Code For Transaction
                          </span>
                        )}

                      {claimError &&
                        claimError.message &&
                        claimError.message.includes(
                          "Sender Has No Username"
                        ) && (
                          <span className="errorMsg">
                            Create An Account To Claim
                          </span>
                        )}

                      <button
                        disabled={!claimFunds}
                        onClick={() => claimFunds()}
                      >
                        Claim
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
