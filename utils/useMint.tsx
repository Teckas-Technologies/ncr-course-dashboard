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

// async function fetchImageAsFile(
//   imagePath: string,
//   fileName: string
// ): Promise<File> {
//   const response = await fetch(imagePath);
//   const blob = await response.blob();
//   const file = new File([blob], fileName, { type: blob.type });
//   return file;
// }

const MintComponent = ({ metadata, contractAddress, ownerId }: MintArgsV1) => {
  const { isConnected, selector, activeAccountId } = useMbWallet();

  const handleMint = async (): Promise<void> => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }

    if (!activeAccountId) {
      console.error("Active account ID is null.");
      return;
    }

    const wallet = await selector.wallet();

    await execute(
      {
        wallet,
        callbackUrl: "http://localhost:3000",
      },
      mint({
        metadata: {
          media:
            "https://arweave.net/WPQbUMWSZhGtINES3qDsAKvFfVzrygHUhI9DQYhmUg0",
          reference:
            "https://arweave.net/GO3yDW_zvD9S_890z6dqyE4uOhnM0SlCu4Ee9i6TxLc",
        },
        contractAddress: proxyContractAddress,
        ownerId: activeAccountId,
      })
    );
  };

  return { handleMint };
};

export default MintComponent;
