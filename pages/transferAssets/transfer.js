import Head from "next/head";
import styles from "@/styles/Transfer.module.css";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { BeneficiaryHistory } from "@/components/transferAssets/BeneficiaryHistory";
import { useRouter } from "next/router";

export default function Transfer() {
  // 0 - no display
  // 1 - send crypto angel
  // 2 - send nft angel
  // 3 - send crypto address
  // 4 - send NFT address

  const router = useRouter();
  const { txType, beneficiary } = router.query;

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
              <TopBar
                beneficiaryState={true}
                beneficiary={beneficiary}
                displayBeneficiary={true}
              />

              <div className={styles.background}></div>
              {/* MY CUSTOM COMPONENT    */}
              <div className={styles.componentContent}>
                <BeneficiaryHistory
                  beneficiary={beneficiary}
                  txOptions={txType}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
