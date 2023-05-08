import Head from "next/head";
import styles from "@/styles/Faucet.module.css";
import {
  useConnect,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { useState } from "react";
import { ASSETS_NAME } from "@/utils";
import { MOCK_LIVE_TOKEN_ABI } from "@/abi";
import { ethers } from "ethers";

export default function Faucet() {
  const [amount, setAmount] = useState();
  const [assetAddress, setAssetAddress] = useState();

  const { isConnected, address } = useAccount();

  const { config: mintFreeConfig } = usePrepareContractWrite({
    address: assetAddress,
    abi: MOCK_LIVE_TOKEN_ABI,
    functionName: "mintFree",
    args: [address, amount && ethers.utils.parseEther(amount)],
  });

  const { write: mintFree } = useContractWrite(mintFreeConfig);

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
                {/* FAUCET CONTENT */}

                <div className={styles.faucet}>
                  <h3>Faucet Page</h3>

                  <div className={styles.assetsContainer}>
                    <div className={styles.left}>
                      <div className={styles.asset}>
                        <img src="/icons/sendcryptousername.png" />
                        <input
                          placeholder="Amount"
                          onChange={(e) => {
                            setAmount(e.target.value);
                            setAssetAddress(ASSETS_NAME["ANGEL"]);
                          }}
                        />
                        <button disabled={!mintFree} onClick={() => mintFree()}>
                          Mint
                        </button>
                      </div>

                      <div className={styles.asset}>
                        <img src="/icons/dai.png" />
                        <input
                          placeholder="Amount"
                          onChange={(e) => {
                            setAmount(ethers.utils.parseEther(e.target.value));
                            setAssetAddress(ASSETS_NAME["DAI"]);
                          }}
                        />
                        <button disabled={!mintFree} onClick={() => mintFree()}>
                          Mint
                        </button>
                      </div>

                      <div className={styles.asset}>
                        <img src="/icons/sand.png" />
                        <input
                          placeholder="Amount"
                          onChange={(e) => {
                            setAmount(ethers.utils.parseEther(e.target.value));
                            setAssetAddress(ASSETS_NAME["SAND"]);
                          }}
                        />
                        <button disabled={!mintFree} onClick={() => mintFree()}>
                          Mint
                        </button>
                      </div>
                    </div>

                    <div className={styles.right}>
                      <div className={styles.asset}>
                        <img src="/icons/usdt.png" />
                        <input
                          placeholder="Amount"
                          onChange={(e) => {
                            setAmount(ethers.utils.parseEther(e.target.value));
                            setAssetAddress(ASSETS_NAME["USDT"]);
                          }}
                        />
                        <button disabled={!mintFree} onClick={() => mintFree()}>
                          Mint
                        </button>
                      </div>

                      <div className={styles.asset}>
                        <img src="/icons/link.png" />
                        <input
                          placeholder="Amount"
                          onChange={(e) => {
                            setAmount(ethers.utils.parseEther(e.target.value));
                            setAssetAddress(ASSETS_NAME["LINK"]);
                          }}
                        />
                        <button disabled={!mintFree} onClick={() => mintFree()}>
                          Mint
                        </button>
                      </div>

                      <div className={styles.asset}>
                        <img src="/icons/matic.png" />
                        <a href="https://faucet.polygon.technology/">
                          Visit here to get some testnet matic
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
