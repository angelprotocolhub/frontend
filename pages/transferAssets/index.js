import Head from "next/head";
import styles from "@/styles/TransferAssets.module.css";
import { useAccount, useContractRead } from "wagmi";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { useQuery } from "@apollo/client";
import { GET_BENEFICIARIES } from "../../queries";
import { ANGEL_ADDRESS } from "@/utils";
import { ANGEL_ABI } from "@/abi";
import { BeneficiaryBox } from "@/components/transferAssets/BeneficiaryBox";
import { DisplayRecipient } from "@/components/transferAssets/DisplayRecipient";
import { useState } from "react";
import { CreateAccount } from "@/components/transferAssets/CreateAccount";

export default function TransferAssets() {
  // 0 - no display
  // 1 - send crypto angel
  // 2 - send nft angel
  // 3 - send crypto address
  // 4 - send NFT address
  const [txType, setTxType] = useState(0);
  const [clicked, setClicked] = useState();

  const { address, isConnected } = useAccount();

  const { loading: getBeneficiaries, data: beneficiaries } = useQuery(
    GET_BENEFICIARIES,
    {
      variables: { sender: address },
    }
  );

  const { data: userName, refetch: getUsername } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [address],
  });

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
          <div className={styles.transferAssets}>
            <MenuBar />

            <div className={styles.content}>
              <TopBar />

              <div className="whiteContent">
                {userName ? (
                  <>
                    <div className={styles.beneficiaries}>
                      <h3>Beneficiaries</h3>

                      {!getBeneficiaries ? (
                        <div className={styles.beneficiariesBox}>
                          {beneficiaries &&
                          beneficiaries.beneficiaryEntities.length > 0 ? (
                            beneficiaries.beneficiaryEntities.map(
                              ({ sender, beneficiary }) => {
                                if (beneficiary)
                                  return (
                                    <BeneficiaryBox address={beneficiary} />
                                  );
                              }
                            )
                          ) : (
                            <p>No Beneficiaries</p>
                          )}
                        </div>
                      ) : (
                        "Getting beneficiaries..."
                      )}
                    </div>

                    {/* Transfer Options */}
                    <div className={styles.transferOptions}>
                      <h3> Transfer Assets</h3>

                      <div className={styles.transferOptionsContainer}>
                        {/* LEFT: OPTIONS */}
                        <div className={styles.left}>
                          {/* OPTIONS */}

                          {/* SEND CRYPTO TO ANGEL NAME */}

                          <div
                            className={
                              clicked == 1
                                ? styles.optionClicked
                                : styles.option
                            }
                            onClick={() => {
                              setTxType(1);
                              setClicked(1);
                            }}
                          >
                            <img src="/icons/sendcryptousername.png" />
                            <div className={styles.text}>
                              <h4>
                                Send <span className="blueText">Crypto</span> to
                                Angel <span className="blueText">Username</span>
                              </h4>
                              <p>Send crypto to any angel name</p>
                            </div>

                            <img
                              src="/icons/forward.png"
                              className={styles.forward}
                            />
                          </div>

                          {/* SEND NFT TO ANGEL NAME */}

                          <div
                            className={
                              clicked == 2
                                ? styles.optionClicked
                                : styles.option
                            }
                            onClick={() => {
                              setTxType(2);
                              setClicked(2);
                            }}
                          >
                            <img src="/icons/sendnftusername.png" />
                            <div className={styles.text}>
                              <h4>
                                Send <span className="blueText">NFTs</span> to
                                Angel <span className="blueText">Username</span>
                              </h4>
                              <p>Send NFTs to any angel name</p>
                            </div>

                            <img
                              src="/icons/forward.png"
                              className={styles.forward}
                            />
                          </div>

                          {/* SEND CRYPTO TO REGULAR ADDRESS */}

                          <div
                            className={
                              clicked == 3
                                ? styles.optionClicked
                                : styles.option
                            }
                            onClick={() => {
                              setTxType(3);
                              setClicked(3);
                            }}
                          >
                            <img src="/icons/sendcryptoaddress.png" />
                            <div className={styles.text}>
                              <h4>
                                Send <span className="blueText">Crypto</span> to{" "}
                                <span className="blueText">Address</span>
                              </h4>
                              <p>Send crypto to a regular address</p>
                            </div>

                            <img
                              src="/icons/forward.png"
                              className={styles.forward}
                            />
                          </div>

                          {/* SEND NFT TO REGULAR ADDRESS */}
                          <div
                            className={
                              clicked == 4
                                ? styles.optionClicked
                                : styles.option
                            }
                            onClick={() => {
                              setTxType(4);
                              setClicked(4);
                            }}
                          >
                            <img src="/icons/sendnftaddress.png" />
                            <div className={styles.text}>
                              <h4>
                                Send <span className="blueText">NFTs</span> To{" "}
                                <span className="blueText">Address</span>
                              </h4>
                              <p>Send NFTs to a regular address</p>
                            </div>

                            <img
                              src="/icons/forward.png"
                              className={styles.forward}
                            />
                          </div>
                        </div>

                        {/* RIGHT: COMPONENT */}
                        <div className={styles.right}>
                          <DisplayRecipient txType={txType} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <CreateAccount />
                )}
                {/* Beneficiaries */}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
