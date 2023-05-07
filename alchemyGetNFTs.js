// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install alchemy-sdk
import { Network, Alchemy } from "alchemy-sdk";

async function getUserNFTs(userAddress) {
  // Optional Config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_PROVIDER, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  // Print all NFTs returned in the response:
  alchemy.nft.getNftsForOwner(userAddress).then((result) => {
    return result;
  });
}

module.exports = {
  getUserNFTs,
};
