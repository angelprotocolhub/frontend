import Head from "next/head";
import styles from "@/styles/Landing.module.css";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { LandingComponent } from "@/components/landing/LandingComponent";

export default function Landing() {
  const { isConnected } = useAccount();

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
                <LandingComponent />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
