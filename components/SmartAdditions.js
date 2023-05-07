import styles from "../styles/components/SmartAdditions.module.css";

export const SmartAdditions = () => {
  return (
    <div className={styles.smartAdditions}>
      <h2>Smart Additions</h2>

      <div className={styles.boxesContainer}>
        <div className={styles.smartBox}>
          <img src="icons/reversal.png" />
          <h3>Automatic Reversals</h3>
          <p>
            Sent your assetsto the incorrect address without realizing it?
            Within the time frame you specify, we automatically reverse all
            unclaimed transfers.
          </p>
          <a href="https://francis-4.gitbook.io/angel-protocol/overview/our-features#automatic-reversals">
            Learn More &gt;
          </a>
        </div>

        <div className={styles.smartBox}>
          <img src="icons/notification.png" />
          <h3>Notifications</h3>
          <p>
            Receive notifications via Push Protocol on your mobile devicce,
            browser extension or push web app when you transact using us.
          </p>
          <a href="https://francis-4.gitbook.io/angel-protocol/overview/our-features#notifications">
            Learn More &gt;
          </a>
        </div>

        <div className={styles.smartBox}>
          <img src="icons/cryptonfts.png" />
          <h3>Crypto & NFTs</h3>
          <p>
            Safely Transfer your assets using our protocol avoiding loss of
            valuable digital assets due to various reasons. Both NFT'S, ERC20's
            and Native Assets
          </p>
          <a href="https://francis-4.gitbook.io/angel-protocol/overview/our-features#support-for-any-asset-including-nfts">
            Learn More &gt;
          </a>
        </div>

        <div className={styles.smartBox}>
          <img src="icons/tag.png" />
          <h3>Tagged Addresses</h3>
          <p>
            Manage benefeciaries that you frequently send money to. Saved from
            the stress of having to copy paste addresses by using the regsitered
            username of the address on our protocol.
          </p>
          <a href="https://francis-4.gitbook.io/angel-protocol/overview/our-features#angel-names">
            Learn More &gt;
          </a>
        </div>

        <div className={styles.smartBox}>
          <img src="icons/claimcode.png" />
          <h3>Claim Code On Asset Transfers</h3>
          <p>
            When transferring assets, we add another layer of security to the
            transfers. Introducing claim codes that recipients must input to
            redeem sent assets
          </p>
          <a href="https://francis-4.gitbook.io/angel-protocol/overview/our-features#claim-codes">
            Learn More &gt;
          </a>
        </div>
      </div>
    </div>
  );
};
