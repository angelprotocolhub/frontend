import { useEffect, useState } from "react";
import styles from "../../styles/components/transferAssets/SelectAssets.module.css";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  ANGEL_ADDRESS,
  ASSETS,
  ASSETS_NAME,
  ASSET_IMAGES,
  formatDuration,
  keccack256,
  truncateAddr,
} from "@/utils";
import { ANGEL_ABI } from "@/abi";
import { ADDRESS_ZERO } from "@/utils";
import { ethers } from "ethers";
import { erc20ABI, erc721ABI, useBalance } from "wagmi";

import { Network, Alchemy } from "alchemy-sdk";

export const SelectAssets = ({ close, beneficiary, txOptions, blur }) => {
  const [selectAsset, setSelectAsset] = useState();
  const [assetAddress, setAddressAsset] = useState(ADDRESS_ZERO);
  const [amount, setAmount] = useState();
  const [tokenId, setTokenId] = useState();
  const [nftName, setNftName] = useState();
  const [narration, setNarration] = useState();
  const [claimCode, setClaimCode] = useState();
  const [claimTime, setClaimTime] = useState();
  const [miniDisplay, setMiniDisplay] = useState(false);
  const [displayNFTs, setDisplayNFTs] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userNFTlist, setUserNFTList] = useState([]);
  const [successType, setSuccessType] = useState();

  const { address: account } = useAccount();
  const balance = useBalance({
    address: account,
    token: assetAddress != ADDRESS_ZERO && assetAddress,
  });

  const { config: sendCryptoConfig } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "sendCrypto",
    args: [
      beneficiary,
      assetAddress,
      amount && ethers.utils.parseEther(amount),
      narration,
      keccack256(claimCode),
      parseInt(claimTime),
    ],
    overrides: {
      value:
        assetAddress == ADDRESS_ZERO && amount
          ? ethers.utils.parseEther(amount)
          : "0",
    },
  });

  const { write: sendCrypto } = useContractWrite({
    ...sendCryptoConfig,
    onSuccess(data) {
      setSuccess(true);
      setSuccessType(1);
    },
  });

  const { config: sendNFTConfig } = usePrepareContractWrite({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "sendNFT",
    args: [
      beneficiary,
      assetAddress,
      tokenId,
      narration,
      keccack256(claimCode),
      parseInt(claimTime),
    ],
  });

  const { write: sendNFT } = useContractWrite({
    ...sendNFTConfig,
    onSuccess(data) {
      setSuccess(true);
      setSuccessType(2);
    },
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: assetAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [ANGEL_ADDRESS, amount && ethers.utils.parseEther(amount).toString()],
  });

  const { write: approve } = useContractWrite(approveConfig);

  const { config: approveNFTConfig } = usePrepareContractWrite({
    address: assetAddress,
    abi: erc721ABI,
    functionName: "approve",
    args: [ANGEL_ADDRESS, tokenId],
  });

  console.log(tokenId, "TOKEN IDSDDD");
  console.log(assetAddress, "asst addr");

  const { write: approveNFT } = useContractWrite(approveNFTConfig);

  const { data: beneficiaryUserName } = useContractRead({
    address: ANGEL_ADDRESS,
    abi: ANGEL_ABI,
    functionName: "getUsername",
    args: [beneficiary],
  });

  function Close() {
    close(false);
    setSelectAsset(false);
    blur(false);
  }

  async function getUserNFTs() {
    const settings = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER,
      network: Network.MATIC_MUMBAI,
    };

    const alchemy = new Alchemy(settings);

    // Print all NFTs returned in the response:
    alchemy.nft.getNftsForOwner(account).then((result) => {
      setUserNFTList(result.ownedNfts);
      console.log(result.ownedNfts);
      setDisplayNFTs(true);
    });
  }

  if (txOptions == 2 || 4)
    useEffect(() => {
      getUserNFTs();
    }, []);

  return (
    <div className={styles.selectCrypto}>
      <img
        src="/icons/cancel.png"
        onClick={() => Close()}
        className={styles.closeButton}
      />

      {success && (
        <>
          {successType == 1 ? (
            <div className={styles.success}>
              <img src="/icons/sent.png" />
              <h4>Sent</h4>
              <p>
                <b>{amount && amount}</b>{" "}
                {ASSETS[assetAddress]
                  ? ASSETS[assetAddress]
                  : truncateAddr(assetAddress)}{" "}
                {assetAddress == ADDRESS_ZERO ? "" : "Tokens"} is on its way to{" "}
                <b>
                  {" "}
                  {beneficiaryUserName
                    ? beneficiaryUserName
                    : truncateAddr(beneficiary)}
                </b>
                <p>One Time Claim Code: {claimCode && claimCode}</p>
              </p>
            </div>
          ) : (
            <div className={styles.success}>
              <img src="/icons/sent.png" />
              <h4>Sent</h4>
              <p>
                <b>
                  Unrelated NFT. Token ID: 3 is on its way to winifred.angel{" "}
                </b>

                <p>One Time Claim Code: {claimCode && claimCode}</p>
              </p>
            </div>
          )}
        </>
      )}

      {selectAsset && (
        <>
          <div>
            <input
              placeholder={
                txOptions == 1 || txOptions == 3
                  ? "Input Or Select Asset Address"
                  : "Select NFT"
              }
              className={styles.inputAddress}
              onChange={(e) => setAddressAsset(e.target.value)}
            />
            {txOptions == 1 || txOptions == 3 ? (
              <button
                className={styles.enterButton}
                onClick={() => setSelectAsset(false)}
              >
                Enter
              </button>
            ) : (
              <button
                className={styles.enterButton}
                onClick={async () => await getUserNFTs()}
              >
                Get My NFTs
              </button>
            )}
          </div>

          {(txOptions == 1 || txOptions == 3) && (
            <div className={styles.supportedAssets}>
              <div
                className={styles.asset}
                onClick={() => {
                  setSelectAsset(false);
                  setAddressAsset(ASSETS_NAME.LINK);
                }}
              >
                <img src="/icons/link.png" />
                <p>LINK</p>
              </div>

              <div
                className={styles.asset}
                onClick={() => {
                  setSelectAsset(false);
                  setAddressAsset(ASSETS_NAME.USDT);
                }}
              >
                <img src="/icons/usdt.png" />
                <p>USDT</p>
              </div>

              <div
                className={styles.asset}
                onClick={() => {
                  setSelectAsset(false);
                  setAddressAsset(ASSETS_NAME.ANGEL);
                }}
              >
                <img src="/navbar/logo.png" />
                <p>ANGEL</p>
              </div>

              <div
                className={styles.asset}
                onClick={() => {
                  setSelectAsset(false);
                  setAddressAsset(ASSETS_NAME.DAI);
                }}
              >
                <img src="/icons/dai.png" />
                <p>DAI</p>
              </div>

              <div
                className={styles.asset}
                onClick={() => {
                  setSelectAsset(false);
                  setAddressAsset(ASSETS_NAME.SAND);
                }}
              >
                <img src="/icons/sand.png" />
                <p>SAND</p>
              </div>

              <div
                className={styles.asset}
                onClick={() => {
                  setSelectAsset(false);
                  setAddressAsset(ASSETS_NAME.MATIC);
                }}
              >
                <img src="/icons/matic.png" />
                <p>MATIC</p>
              </div>
            </div>
          )}

          {(txOptions == 2 || txOptions == 4) && (
            <div className={styles.nftList}>
              {displayNFTs && userNFTlist.length > 0 ? (
                userNFTlist.map((nft) => {
                  return (
                    <div
                      className={styles.nftBox}
                      onClick={() => {
                        setSelectAsset(false);
                        setAddressAsset(nft.contract.address);
                        setTokenId(nft.tokenId);
                        setNftName(nft.contract.name);
                        setMiniDisplay(true);
                      }}
                    >
                      <img src={nft.rawMetadata.image} />
                      <h3>{nft.contract.name}</h3>
                      <p>{nft.contract.title}</p>
                      <p>Token ID: {nft.tokenId}</p>
                      <p>{truncateAddr(nft.contract.address)}</p>
                    </div>
                  );
                })
              ) : (
                <p>No NFTS here...</p>
              )}
            </div>
          )}
        </>
      )}

      {!selectAsset && !success && (
        <>
          <div className={styles.selectedAsset}>
            <p
              className={styles.selectAsset}
              onClick={() => {
                setSelectAsset(true);
                setMiniDisplay(false);
              }}
            >
              Select Asset &gt;
            </p>

            {(txOptions == 1 || txOptions == 3) && (
              <img src={ASSET_IMAGES[assetAddress]} />
            )}
            {(txOptions == 1 || txOptions == 3) && !selectAsset && (
              <p>{ASSETS[assetAddress]}</p>
            )}

            {miniDisplay &&
              (txOptions == 2 || txOptions == 4) &&
              !selectAsset && (
                <p>
                  {truncateAddr(assetAddress)} Name : {nftName} Token ID :{" "}
                  {tokenId}
                </p>
              )}

            {(txOptions == 1 || txOptions == 3) && (
              <p>
                Balance:{" "}
                {balance && balance.data && balance.data.formatted.slice(0, 5)}{" "}
                {ASSETS[assetAddress]}
              </p>
            )}
          </div>

          {txOptions == 1 || txOptions == 3 ? (
            <input
              className={styles.amount}
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          ) : (
            ""
          )}
          <input
            className={styles.narration}
            placeholder="Narration"
            onChange={(e) => setNarration(e.target.value)}
          />

          <div className={styles.time}>
            <input
              className={styles.narration}
              placeholder="Claim Time"
              onChange={(e) => setClaimTime(e.target.value)}
              type="number"
            />

            <p> {claimTime && formatDuration(claimTime)}</p>
          </div>

          <div className={styles.send}>
            <input
              className={styles.claimCode}
              placeholder="Claim Code"
              onChange={(e) => setClaimCode(e.target.value)}
            />
            {assetAddress != ASSETS_NAME.MATIC && (
              <button
                className={styles.approve}
                disabled={
                  txOptions == 1 || txOptions == 3 ? !approve : !approveNFT
                }
                onClick={() => {
                  if (txOptions == 1 || txOptions == 3) approve();

                  if (txOptions == 2 || txOptions == 4) approveNFT();
                }}
              >
                Approve
              </button>
            )}
            <button
              className={styles.send}
              disabled={
                txOptions == 1 || txOptions == 3 ? !sendCrypto : !sendNFT
              }
              onClick={() => {
                if (txOptions == 1 || txOptions == 3) sendCrypto();

                if (txOptions == 2 || txOptions == 4) sendNFT();
              }}
            >
              <img className={styles.airplane} src="/icons/airplane.png" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
