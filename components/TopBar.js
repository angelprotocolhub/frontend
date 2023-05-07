import {
  ADDRESS_ZERO,
  ANGEL_ADDRESS,
  DEFAULT_PROFILE_IMAGE,
  addAngelSuffix,
} from "@/utils";
import styles from "../styles/components/TopBar.module.css";
import { useContractRead, useAccount } from "wagmi";
import { ANGEL_ABI } from "@/abi";

export const TopBar = ({ beneficiary, beneficiaryState }) => {
  const { address } = useAccount();

  const { data, isFetched, refetch } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [address],
  });

  const { data: beneficiaryUserName } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [beneficiary],
  });

  console.log(address);
  if (isFetched) console.log(data);

  function truncateAddr(address) {
    return address.slice(0, 8) + "..." + address.slice(-4);
  }

  return (
    <div>
      {isFetched && (
        <div className={styles.topBar}>
          <div className={styles.angelName}>
            <img src={DEFAULT_PROFILE_IMAGE} />
            <p>
              {!beneficiaryState
                ? !data
                  ? truncateAddr(address)
                  : addAngelSuffix(data)
                : beneficiaryUserName
                ? addAngelSuffix(beneficiaryUserName)
                : truncateAddr(beneficiary)}
            </p>
          </div>

          <button>{truncateAddr(address)}</button>
        </div>
      )}
    </div>
  );
};
