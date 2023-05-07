import { useState } from "react";
import styles from "../../styles/components/transferAssets/DisplayRecipient.module.css";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  ADDRESS_ZERO,
  ANGEL_ADDRESS,
  DEFAULT_PROFILE_IMAGE,
  addAngelSuffix,
  isValidEthereumAddress,
} from "@/utils";
import { ANGEL_ABI } from "@/abi";
import { useRouter } from "next/router";

export const DisplayRecipient = ({ txType }) => {
  const [selectedUser, setSelectedUser] = useState();
  const [addressSet, setAddressSet] = useState(false);

  const {
    data: userAddress,
    isFetched,
    refetch: refetchAddress,
  } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getAddress",
    args: [selectedUser],
  });

  const { data: userName, refetch: refetchUserName } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [selectedUser],
  });

  const { config: addToBeneficiariesConfig } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "addToBeneficiaries",
    args: [userAddress],
  });

  const { write: addToBeneficiaries } = useContractWrite(
    addToBeneficiariesConfig
  );

  const router = useRouter();

  function handleEnter() {
    if (txType == 3 || txType == 4) refetchUserName();
    if (txType == 1 || txType == 2) refetchAddress();

    setAddressSet(true);
  }

  return (
    <>
      {txType == 0 ? (
        ""
      ) : (
        <div className={styles.displayRecipient}>
          <div className={styles.header}>
            <h3>New Angel Recipient</h3>
            <button
              disabled={!addToBeneficiaries}
              onClick={() => addToBeneficiaries()}
            >
              <img src="/icons/beneficiary.png" />
            </button>
          </div>

          <div className={styles.inputSection}>
            <p>To: </p>
            <input
              onChange={(e) => setSelectedUser(e.target.value)}
              placeholder={
                txType == 1 || txType == 2
                  ? "Input angel name here"
                  : "Input Address here"
              }
            />
            <button
              className={styles.enterButton}
              onClick={() => handleEnter()}
            >
              Enter
            </button>
          </div>

          <div className={styles.recipientInformation}>
            <img src={DEFAULT_PROFILE_IMAGE} />

            <div className={styles.text}>
              <p className={styles.miniTitle}>Username</p>
              {
                <p className={styles.username}>
                  {(txType == 3 || txType == 4) && addressSet
                    ? userName
                      ? addAngelSuffix(userName)
                      : ""
                    : ""}

                  {(txType == 1 || txType == 2) && selectedUser
                    ? addAngelSuffix(selectedUser)
                    : ""}
                </p>
              }

              <p className={styles.miniTitle}>Address</p>
              <p className={styles.address}>
                {(txType == 1 || txType == 2) &&
                  addressSet &&
                  (userAddress != ADDRESS_ZERO ? (
                    userAddress
                  ) : (
                    <p style={{ color: "red" }}>No Matching Address</p>
                  ))}

                {(txType == 3 || txType == 4) &&
                addressSet &&
                isValidEthereumAddress(selectedUser)
                  ? selectedUser
                  : " "}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              router.push({
                pathname: "/transferAssets/transfer",
                query: {
                  txType: txType,
                  beneficiary:
                    txType == 1 || txType == 2 ? userAddress : selectedUser,
                },
              })
            }
            className={styles.sendButton}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};
