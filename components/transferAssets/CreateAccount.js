import { ANGEL_ADDRESS, CHANNEL_ADDRESS, DEFAULT_PROFILE_IMAGE } from "@/utils";
import styles from "../../styles/components/transferAssets/CreateAccount.module.css";
import * as PushAPI from "@pushprotocol/restapi";
import { useState } from "react";
import {
  useSigner,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { ANGEL_ABI } from "@/abi";

export const CreateAccount = () => {
  const [userName, setUserName] = useState();
  const { address } = useAccount();
  const { data: _signer } = useSigner({
    chainId: polygonMumbai.id,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const CHANNEL_ADDRESS_IN_CAIP = `eip155:80001:${CHANNEL_ADDRESS}`;
  const USER_ADDRESS_IN_CAIP = `eip155:80001:${address}`;

  const { config: regsiterConfig, error } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "registerAngelAccount",
    args: [userName, DEFAULT_PROFILE_IMAGE],
  });

  const { write: registerAngelAccount, isLoading } =
    useContractWrite(regsiterConfig);

  async function handleSignUp() {
    await PushAPI.channels.subscribe({
      signer: _signer && _signer,
      channelAddress: CHANNEL_ADDRESS_IN_CAIP, // channel address in CAIP
      userAddress: USER_ADDRESS_IN_CAIP, // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  }

  return (
    <div className={styles.createAccount}>
      <h2>Create Account</h2>

      <p>
        Attach a unique name to your address to facilitate easier transactions.
      </p>
      <p>
        The unique name you set will be permannet and cannot be changed once
        set.
      </p>

      <p className={styles.userName}>
        <b>Username :</b>{" "}
      </p>

      <input onChange={(e) => setUserName(e.target.value)} />

      {error &&
        error.message &&
        error.message.includes("Invalid Characters Used") && (
          <p className="errorMsg">
            Invalid Characters Used. Avoid Using Special Characters
          </p>
        )}

      {error &&
        error.message &&
        error.message.includes("Max Handle Length Exceeded") && (
          <p className="errorMsg">Max Handle Length Exceeded</p>
        )}

      {error &&
        error.message &&
        error.message.includes("Cant Use Default Username") && (
          <p className="errorMsg">
            nousername is a defaultusername. Cant Use Default Username!
          </p>
        )}

      {error &&
        error.message &&
        error.message.includes(
          "Username Taken Or Address Already Registered"
        ) && (
          <p className="errorMsg">
            Username Taken Or this Address Already Has An Account
          </p>
        )}

      <button onClick={handleSignUp}>Opt-In</button>

      <button
        disabled={!registerAngelAccount}
        onClick={() => registerAngelAccount()}
      >
        {!isLoading ? "Sign Up" : "Loading..."}
      </button>
    </div>
  );
};
