import Web3 from "web3";
// import axios from "axios";

export const compressAddress = (address) => {
  if (address) {
    return address.slice(0, 4) + "..." + address.slice(-4);
  } else {
    return null;
  }
};

export const connectMetamask = async ({ setWalletAddress }) => {
  let accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  // let networks = await window.ethereum.request({ method: "eth_chainId" });
  // console.log(networks);

  setWalletAddress(Web3.utils.toChecksumAddress(accounts[0]));
  // console.log(accounts[0]);

  // try {
  //   const {
  //     data: { data: newUser },
  //   } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
  //     address: accounts[0],
  //   });
  // } catch (e) {
  //   console.log(e.response);
  // }
};
