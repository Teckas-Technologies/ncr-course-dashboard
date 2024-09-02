import { NetworkId } from "@/types/types";
export const adminId = [
  "infinitebit-nala.testnet",
  "fungible_rhmor.testnet",
  "sharmi_blessyy.testnet",
  "finite_sylar.testnet",
  "qhpar_pulse.testnet"
];
export const proxyContractAddress =
  process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS ||
  "0.drop.proxy.mintbase.testnet";
export const networkName = process.env.NEXT_PUBLIC_NETWORK || "testnet";
export const network = (process.env.NEXT_PUBLIC_NETWORK ||
  "testnet") as NetworkId;
export const SOCIAL_DB_CONTRACT_ID =
  process.env.SOCIAL_DB_CONTRACT_ID || "v1.social08.testnet";
export const CONTRACT_ID = "v1.social08.testnet";
