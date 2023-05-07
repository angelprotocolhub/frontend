import styles from "../../styles/components/landing/LandingComponent.module.css";
import { useQuery } from "@apollo/client";
import { GET_CREDITS, GET_DEBITS } from "../../queries";
import { useAccount } from "wagmi";
import { RecentBox } from "./RecentBox";

export const LandingComponent = () => {
  const { address } = useAccount();

  const { loading: getCreditsLoading, data: credits } = useQuery(GET_CREDITS, {
    variables: { recipient: address },
  });

  const { loading: getDebitsLoading, data: debits } = useQuery(GET_DEBITS, {
    variables: { sender: address },
  });

  return (
    <div className={styles.recents}>
      <div className={styles.background}>
        <h2>Recent Credits</h2>
        <div className={styles.credits}>
          <div className={styles.creditBoxes}>
            {getCreditsLoading ? (
              "Getting Recent Credits...."
            ) : credits.transactionEntities.length == 0 ? (
              <p>No Recent Credits</p>
            ) : (
              credits.transactionEntities.map(
                ({ sender, recipient, asset, amountOrTokenId, txType }) => (
                  <RecentBox
                    sender={sender}
                    recipient={recipient}
                    asset={asset}
                    amountOrTokenId={amountOrTokenId}
                    txType={txType}
                    creditOrDebit={true}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>

      <div className={styles.debitBackground}>
        <h2>Recent Debits</h2>
        <div className={styles.debits}>
          <div className={styles.debitBoxes}>
            {getDebitsLoading ? (
              "Getting Recent Debits...."
            ) : debits.transactionEntities.length == 0 ? (
              <p>No Recent Credits</p>
            ) : (
              debits.transactionEntities.map(
                ({ sender, recipient, asset, amountOrTokenId, txType }) => (
                  <RecentBox
                    sender={sender}
                    recipient={recipient}
                    asset={asset}
                    amountOrTokenId={amountOrTokenId}
                    txType={txType}
                    creditOrDebit={true}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
