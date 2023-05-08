import Head from "next/head";
import styles from "@/styles/Information.module.css";
import {
  useConnect,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectWallet } from "@/components/transferAssets/ConnectWallet";
import { MenuBar } from "@/components/MenuBar";
import { TopBar } from "@/components/TopBar";
import { GET_USERS_TRANSACTIONS } from "../queries";
import { useQuery } from "@apollo/client";
import {
  ADDRESS_ZERO,
  ANGEL_ADDRESS,
  ASSETS,
  addAngelSuffix,
  convertTimeStampToReadableDate,
  truncateAddr,
} from "@/utils";
import { useState } from "react";
import { ANGEL_ABI } from "@/abi";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";

const connector = new MetaMaskConnector();

export default function Information() {
  const [txSelecteed, setTxSelected] = useState();
  const [txRef, setTxRef] = useState();
  const [recipientHandle, setRecipientHandle] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [senderHandle, serSenderHandle] = useState();
  const [senderAddress, setSenderAddress] = useState();
  const [fileName, setFileName] = useState();
  const [imageLink, setImageLink] = useState();
  const [storingFiles, setStoringFiles] = useState();

  const router = useRouter();

  const { isConnected, address } = useAccount();

  const { data: txDetails, refetch: getTxDetails } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getTransaction",
    args: [txRef],
  });

  const { data: recipientUserName, refetch: getRecipientUserName } =
    useContractRead({
      address: ANGEL_ADDRESS,
      abi: ANGEL_ABI,
      functionName: "getUsername",
      args: [recipientAddress],
    });

  const { data: senderUserName, refetch: getSenderUserName } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [senderAddress],
  });

  async function handleCheck() {
    await getTxDetails();
    setTxSelected(txDetails);

    if (txDetails) {
      setSenderAddress(txDetails.sender);
      setRecipientAddress(txDetails.recipient);
    }

    await getSenderUserName();
    await getRecipientUserName();
  }

  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  }

  function draftImageLinkFromCID(cid, imageName) {
    return "https://" + cid + ".ipfs.w3s.link/" + imageName;
  }

  async function handleFileSelect(event) {
    setStoringFiles(true);

    const files = event.target.files;

    let fileName = files[0].name;
    let fileType = files[0].type;
    setFileName(fileName);

    let cid = await storeFiles(files);
    let imageLink = draftImageLinkFromCID(cid, fileName);
    console.log("Image Link", imageLink);

    setStoringFiles(false);
  }

  const { config: changePfpConfig } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "changeProfilePicture",
    args: [imageLink && imageLink],
  });

  const { write: changePfp } = useContractWrite(changePfpConfig);

  return (
    <>
      <Head>
        <title>Angel Protocol</title>
        <meta name="description" content="Angel Protocol Landing page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        {!isConnected ? (
          <ConnectWallet />
        ) : (
          <div className={styles.claims}>
            <MenuBar />

            <div className={styles.content}>
              <TopBar />
              <div className="whiteContent">
                <h3 className={styles.title}>Information Page</h3>

                <div className={styles.updateContainer}>
                  {/* check tx details */}
                  <div className={styles.checkTxDetails}>
                    <h3>Check Transaction Details</h3>
                    <div>
                      <input
                        placeholder="input transaction reference"
                        onChange={(e) => setTxRef(e.target.value)}
                      />
                      <button onClick={handleCheck}>Check</button>
                    </div>
                  </div>

                  {/* change profile photo */}
                  <div className={styles.chengeProfilePhoto}>
                    <h3> Change Profile Photo</h3>

                    <div className={styles.buttons}>
                      <label for="inputTag" className={styles.selectImage}>
                        Select Image
                        <input
                          id="inputTag"
                          className={styles.fileInput}
                          type="file"
                          onChange={(e) => handleFileSelect(e)}
                        />
                      </label>

                      <button
                        className={styles.setImage}
                        disabled={!changePfp}
                        onClick={() => changePfp()}
                      >
                        Set Image
                      </button>
                    </div>
                    <p className={styles.fileDetails}>{fileName && fileName}</p>
                  </div>
                </div>

                {/* TRANSACTIONS */}
                {txSelecteed && (
                  <div className={styles.transactionsContainer}>
                    {txSelecteed.from != ADDRESS_ZERO ? (
                      <div className={styles.txSection}>
                        <h2>Transaction</h2>
                        <div className={styles.dateAndTime}>
                          <p>
                            {txSelecteed.time &&
                              convertTimeStampToReadableDate(
                                txSelecteed.time.toString()
                              )}
                          </p>
                        </div>
                        <p>From</p>
                        <h3>{addAngelSuffix(senderUserName)}</h3>

                        <p>To</p>
                        <h3>
                          {recipientUserName
                            ? addAngelSuffix(recipientUserName)
                            : txDetails.recipient}
                        </h3>

                        <p>Asset</p>
                        <h3>
                          {ASSETS[txSelecteed.asset]
                            ? ASSETS[txSelecteed.asset]
                            : truncateAddr(txSelecteed.asset)}
                        </h3>

                        <p>{txSelecteed.txType ? "Token ID" : "Amount"}</p>
                        <h3 style={{ color: "#3406BF" }}>
                          {txSelecteed.txType
                            ? txSelecteed.amountOrTokenId.toString()
                            : txSelecteed.amountOrTokenId.toString() / 10 ** 18}
                        </h3>

                        <p>Narration</p>
                        <h3>{txSelecteed.narration}</h3>

                        <p>Transaction Reference</p>
                        <h3 className={styles.txRef}>{txSelecteed.ref}</h3>

                        <p>Status</p>
                        <h3 className={styles.txRef}>
                          {txSelecteed.status == 1 && (
                            <div className={styles.status}>
                              <div className={styles.pendingCircle}></div>
                              <p>Pending</p>
                            </div>
                          )}

                          {txSelecteed.status == 2 && (
                            <div className={styles.status}>
                              <div className={styles.successCircle}></div>
                              <p>Succesful</p>
                            </div>
                          )}

                          {txSelecteed.status == 3 && (
                            <div className={styles.status}>
                              <div className={styles.reclaimCircle}></div>
                              <p>Reclaimed</p>
                            </div>
                          )}
                        </h3>
                      </div>
                    ) : (
                      <p>Invalid Tx Hash</p>
                    )}
                  </div>
                )}

                {/*  */}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
