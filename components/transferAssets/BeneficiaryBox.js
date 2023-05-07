import { ANGEL_ABI } from "@/abi";
import styles from "../../styles/components/transferAssets/BeneficiaryBox.module.css";
import { useContractRead } from "wagmi";
import { ANGEL_ADDRESS } from "@/utils";
import { useRouter } from "next/router";

export const BeneficiaryBox = ({ address }) => {
  const { data: beneficiaryUserName, isFetched } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [address],
  });

  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push({
          pathname: "/transferAssets/transfer",
          query: { txType: 1, beneficiary: address },
        })
      }
      className={styles.beneficiaryContaier}
    >
      <div className={styles.beneficiaryBox}>
        {beneficiaryUserName && (
          <p>{beneficiaryUserName.charAt(0).toUpperCase()}</p>
        )}
      </div>

      <p className={styles.name}>
        {beneficiaryUserName && beneficiaryUserName}
      </p>
    </button>
  );
};
