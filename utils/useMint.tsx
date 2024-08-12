import { useMbWallet } from "@mintbase-js/react";
import { execute, mint } from "@mintbase-js/sdk";
import { proxyContractAddress } from "./Constant";

export type MintArgsV1 = {
  metadata: TokenMetadata;
  contractAddress?: string;
  ownerId: string;
  amount?: number;
  noMedia?: boolean; // explicit opt-in to NFT without media, breaks wallets
  noReference?: boolean; // explicit opt-in to NFT without reference
};

export type TokenMetadata = {
  title?: string;
  description?: string;
  media?: string;
  media_hash?: string;
  copies?: number;
  issued_at?: string;
  expires_at?: string;
  starts_at?: string;
  updated_at?: string;
  extra?: string;
  reference?: string;
  reference_hash?: string;
};

async function fetchImageAsFile(
  imagePath: string,
  fileName: string
): Promise<File> {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

const MintComponent = ({ metadata, contractAddress, ownerId }: MintArgsV1) => {
  const { selector } = useMbWallet();

  const handleMint = async (): Promise<void> => {
    const wallet = await selector.wallet();
    const imageFile = await fetchImageAsFile(
      "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
      "profile.jpg"
    );
    await execute(
      {
        wallet,
        callbackUrl: "",
      },

      mint({
        metadata: {
          media:
            "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
          reference: "profile",
        },
        contractAddress: proxyContractAddress,
        ownerId: "calista_moltan.testnet",
      })
    );
  };

  return { handleMint };
};

export default MintComponent;
