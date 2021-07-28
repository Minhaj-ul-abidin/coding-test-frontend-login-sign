import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const getSigner = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  return signer;
};

export const signNonce = async (Nonce, signer) => {
  const raw_signature = await signer.signMessage(Nonce);
  return raw_signature;
};
