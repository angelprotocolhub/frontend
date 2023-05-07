import { getAssetName, truncateAddr } from "@/utils";
import styles from "../../styles/components/landing/RecentBox.module.css";

export const RecentBox = ({
  sender,
  asset,
  amountOrTokenId,
  txType,
  creditOrDebit,
  recipient,
}) => {
  return (
    <div className={styles.recentBox}>
      <div>
        <h4>{creditOrDebit ? "Sender" : "Recipient"}</h4>
        <p>{creditOrDebit ? truncateAddr(sender) : truncateAddr(recipient)}</p>
      </div>

      <div>
        <h4>Asset</h4>
        <p>{!txType ? getAssetName(asset) : truncateAddr(asset)}</p>
      </div>

      <div>
        <h4>{txType ? "Token ID" : "Amount"}</h4>
        <p>{txType ? amountOrTokenId : amountOrTokenId / 10 ** 18}</p>
      </div>
    </div>
  );
};
