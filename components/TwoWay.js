import styles from "../styles/components/TwoWay.module.css";

export const TwoWay = () => {
  return (
    <div className={styles.twoWay}>
      <img src="/illustrations/transferAsset.png" />

      <div className={styles.text}>
        <h3>Two way claimable Secured Transactions</h3>
        <p>
          Send two way claimable transactions that allow for claimable
          verification of transferred assets and easy refunds for accidental
          transactions. Never send your crypto to the nether again without a way
          to recover the asset.
        </p>

        <a href="https://francis-4.gitbook.io/angel-protocol/overview/our-features#claim-codes">
          Learn More &gt;
        </a>
      </div>
    </div>
  );
};
