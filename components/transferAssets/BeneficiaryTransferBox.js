import styles from "../../styles/components/transferAssets/BeneficiaryTransferBox.module.css";
import {
  convertTimeStampToReadableDate,
  getImage,
  truncateAddr,
} from "@/utils";
import { getAssetName } from "@/utils";

export const BeneficiaryTransferBox = ({
  asset,
  amountOrTokenId,
  narration,
  senderOrRecipient,
  txType,
  txStatus,
  time,
}) => {
  return (
    <div>
      <div
        className={senderOrRecipient ? styles.senderBox : styles.recipientBox}
      >
        <img src={!txType ? getImage(asset) : "/icons/unknown.png"} />
        <div className={styles.text}>
          {/* top */}
          <div className={styles.top}>
            <div className={styles.miniBox}>
              <span>Asset</span>
              <p>{!txType ? getAssetName(asset) : truncateAddr(asset)}</p>
            </div>

            <div className={styles.miniBox}>
              <span>{txType ? "Token Id" : "Amount"}</span>
              <p>{txType ? amountOrTokenId : amountOrTokenId / 10 ** 18}</p>
            </div>
          </div>

          {/* bottom */}
          <div className={styles.bottom}>
            <div className={styles.miniBox}>
              <span>Desc</span>
              <p className={styles.narration}>{narration}</p>
            </div>

            {txStatus == 2 && (
              <img src="/icons/claimcheck.png" className={styles.check} />
            )}

            {txStatus == 3 && (
              <img src="/icons/reclaimcheck.png" className={styles.check} />
            )}
          </div>
        </div>
      </div>

      <p
        className={senderOrRecipient ? styles.senderTime : styles.recipientTime}
      >
        {convertTimeStampToReadableDate(time)}
      </p>
    </div>
  );
};
