const { ethers } = require("ethers");

const ANGEL_ADDRESS = "0x68876bcabd609dBDf92573616007AC3a95e46788";

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
function addAngelSuffix(str) {
  return str + ".angel";
}

const CLAIM_IMAGE =
  "https://bafybeib3faghcn66ax5o5enqk3vfzp23senitu5vlbjh4ceus5fhmyskpe.ipfs.w3s.link/adventure%20time%204.jpg";

const ASSETS = {
  "0xfd86305830e490b188c3c5e3b02bae346f930dda": "LINK",
  "0xd3bfa2c17e98274aa86bbea183a5b12562f689c4": "USDT",
  "0xe3088919a826125af0daf96cf74dca3583550bb6": "ANGEL",
  "0x9f192326c0c17b9f4e5f9a428cc958b887397f08": "DAI",
  "0xc9a6e60b894e41574f93023f3c6dd8caf4ae4fe2": "SAND",
  "0x0000000000000000000000000000000000000000": "MATIC",
};

const ASSETS_NAME = {
  LINK: "0xfd86305830e490b188c3c5e3b02bae346f930dda",
  USDT: "0xd3bfa2c17e98274aa86bbea183a5b12562f689c4",
  ANGEL: "0xe3088919a826125af0daf96cf74dca3583550bb6",
  DAI: "0x9f192326c0c17b9f4e5f9a428cc958b887397f08",
  SAND: "0xc9a6e60b894e41574f93023f3c6dd8caf4ae4fe2",
  MATIC: "0x0000000000000000000000000000000000000000",
};

const ASSET_IMAGES = {
  "0xfd86305830e490b188c3c5e3b02bae346f930dda": "/icons/link.png",
  "0xd3bfa2c17e98274aa86bbea183a5b12562f689c4": "/icons/usdt.png",
  "0xe3088919a826125af0daf96cf74dca3583550bb6": "/navbar/logo.png",
  "0x9f192326c0c17b9f4e5f9a428cc958b887397f08": "/icons/dai.png",
  "0xc9a6e60b894e41574f93023f3c6dd8caf4ae4fe2": "/icons/sand.png",
  "0x0000000000000000000000000000000000000000": "/icons/matic.png",
};

const CHANNEL_ADDRESS = "0x5F7FbE4bf8987FA77Ec6C22FD3f3d558B3b68D4e";

function truncateAddr(address) {
  return address.slice(0, 5) + "...." + address.slice(-5);
}

function getAssetName(asset) {
  return ASSETS[asset];
}

function isValidEthereumAddress(address) {
  if (!/^(0x)?[0-9a-fA-F]{40}$/.test(address)) {
    return false;
  }
  return true;
}

function getImage(asset) {
  return ASSET_IMAGES[asset];
}

function convertTimeStampToReadableDate(timestamp) {
  const date = new Date(timestamp * 1000); // convert to milliseconds
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

function keccack256(str) {
  if (str) return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(str));
}

function formatDuration(durationInSeconds) {
  if (durationInSeconds < 60) {
    return durationInSeconds + " seconds";
  } else if (durationInSeconds < 3600) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return minutes + " minutes, " + seconds + " seconds";
  } else if (durationInSeconds < 86400) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return hours + " hours, " + minutes + " minutes";
  } else {
    const days = Math.floor(durationInSeconds / 86400);
    const hours = Math.floor((durationInSeconds % 86400) / 3600);
    return days + " days, " + hours + " hours";
  }
}

const DEFAULT_PROFILE_IMAGE =
  "https://bafybeifnpeom22nwbtsv52ivwqd3fzaygmjjgql5wgeximwvl4s32mvdo4.ipfs.w3s.link/petergriffin.jpg";

const handleCopyClick = (stateVariable) => {
  navigator.clipboard.writeText(stateVariable);
};

module.exports = {
  ANGEL_ADDRESS,
  addAngelSuffix,
  ADDRESS_ZERO,
  getAssetName,
  truncateAddr,
  isValidEthereumAddress,
  getImage,
  ASSETS,
  ASSET_IMAGES,
  ASSETS_NAME,
  convertTimeStampToReadableDate,
  keccack256,
  formatDuration,
  handleCopyClick,
  CLAIM_IMAGE,
  CHANNEL_ADDRESS,
  DEFAULT_PROFILE_IMAGE,
};
