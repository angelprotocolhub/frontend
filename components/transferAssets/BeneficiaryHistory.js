import styles from "../../styles/Transfer.module.css";
import { GET_ALL_USERS_TX } from "../../queries";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { BeneficiaryTransferBox } from "./BeneficiaryTransferBox";
import { SendAsset } from "./SendAsset";

export const BeneficiaryHistory = ({ beneficiary, txOptions }) => {
  const { address } = useAccount();

  const { loading: usersTransactionsLoading, data: usersTransaction } =
    useQuery(GET_ALL_USERS_TX, {
      variables: { user: address, beneficiary: beneficiary },
    });

  if (usersTransaction) console.log(usersTransaction);
  return (
    <div className={styles.container}>
      {usersTransaction && usersTransaction.transactionEntities.length == 0 && (
        <p>No Previous Transaction With User</p>
      )}
      {usersTransactionsLoading
        ? "Getting Beneficiary Transactions..."
        : usersTransaction.transactionEntities.map(
            ({
              asset,
              amountOrTokenId,
              narration,
              sender,
              recipient,
              txType,
              status,
              time,
            }) => {
              let senderOrRecipient;
              if (sender.toLocaleLowerCase() == address.toLocaleLowerCase()) {
                senderOrRecipient = true;
              }
              if (
                recipient.toLocaleLowerCase() == address.toLocaleLowerCase()
              ) {
                senderOrRecipient = false;
              }

              return (
                <BeneficiaryTransferBox
                  asset={asset}
                  amountOrTokenId={amountOrTokenId}
                  narration={narration}
                  senderOrRecipient={senderOrRecipient}
                  txType={txType}
                  txStatus={status}
                  time={time}
                />
              );
            }
          )}

      <SendAsset txOptions={txOptions} beneficiary={beneficiary} blur={blur} />
    </div>
  );
};
