import { useMbWallet } from "@mintbase-js/react";
import { execute, mint } from "@mintbase-js/sdk";
import { proxyContractAddress } from "./Constant";
import { uploadReference } from "@mintbase-js/storage";

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

type ReferenceObject = {
  title?: string;
  description?: string;
  media?: File | string;
};

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

    // Upload reference and get URL
    const uploadReferenceObject = async (refObject: ReferenceObject) => {
      try {
        return await uploadReference(refObject);
      } catch (error) {
        console.error("Failed to upload reference:", error);
        throw new Error("Failed to upload reference");
      }
    };

    const refObject = {
      title: "NCR Course",
      description: "nft",
      media: "https://arweave.net/WPQbUMWSZhGtINES3qDsAKvFfVzrygHUhI9DQYhmUg0",
    };

    const uploadedData = await uploadReferenceObject(refObject);
    console.log("Uploaded Data:", uploadedData);

    // Set metadata with the response from uploadReferenceObject
    const metadata = {
      title: "NCR Course",
      description: "nft",
      media: uploadedData?.media_url , // Assuming media is a string URL
      reference: uploadedData?.id, // Set reference from uploadedData
    };

    await execute(
      {
        wallet,
        callbackUrl: "http://localhost:3000",
      },
      mint({
        metadata,
        contractAddress: proxyContractAddress,
        ownerId: activeAccountId,
      })
    );
  };

  return { handleMint };
};

export default MintComponent;
