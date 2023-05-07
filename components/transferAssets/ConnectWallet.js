import styles from "../../styles/components/transferAssets/ConnectWallet.module.css";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect } from "wagmi";
import { ADDRESS_ZERO } from "@/utils";

export const ConnectWallet = () => {
  const connector = new MetaMaskConnector();
  const { connect, error, isLoading, pendingConnector } = useConnect();
  const { address } = useAccount({
    onConnect({ address }) {
      localStorage.setItem("connected", address);
    },

    onDisconnect({ address }) {
      localStorage.setItem("connected", ADDRESS_ZERO);
    },
  });

  return (
    <div className={styles.connectWallet}>
      <img src="/illustrations/connect.png" />
      <h3>Connect wallet</h3>
      <p>Connect Your Wallet</p>
      <button onClick={() => connect({ connector })}>
        {isLoading || pendingConnector ? "..." : "Connect"}
      </button>
      {error && <p>Failed To Connect</p>}
    </div>
  );
};
