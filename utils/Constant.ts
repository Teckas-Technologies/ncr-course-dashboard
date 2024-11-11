import { NetworkId } from "@/types/types";
export const adminId = [
  "ncr-course.near",
  "lyric-ezran.near",
  "golden_comet.near"
];

// 0.drop.proxy.mintbase.testnet
// ncrcoursencr.mintspace2.testnet
export const proxyContractAddress = process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS || "0.drop.proxy.mintbase.near";
export const nftContrctAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "ncrcourse.mintbase1.near";
export const networkName = process.env.NEXT_PUBLIC_NETWORK || "mainnet";
export const network = (process.env.NEXT_PUBLIC_NETWORK || "mainnet") as NetworkId;
export const SOCIAL_DB_CONTRACT_ID = process.env.SOCIAL_DB_CONTRACT_ID || "social.near";
export const CONTRACT_ID = "v1.social08.testnet";