import styles from "../styles/components/MenuBar.module.css";

export const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <a href="/landing">
        <img src="/navbar/logo.png" className={styles.logo} />
      </a>

      <div className={styles.navLinks}>
        <a className={styles.link} href="/transferAssets">
          <img src="/icons/transfer.png" />
          <p>Transfer Assets</p>
        </a>

        <a className={styles.link} href="/claims">
          <img src="/icons/claim.png" />
          <p>Claims</p>
        </a>

        <a className={styles.link} href="/transactionHistory">
          <img src="/icons/history.png" />
          <p>Transaction History</p>
        </a>

        <a className={styles.link} href="/information">
          <img src="/icons/information.png" />
          <p>Information</p>
        </a>

        <a className={styles.link} href="/faucet">
          <img src="/icons/faucet.png" />
          <p>Faucets</p>
        </a>
      </div>
    </div>
  );
};
