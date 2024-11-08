import { useContext, useState } from "react";
import { nftContrctAddress, proxyContractAddress } from "./Constant";
import { uploadReference } from "@mintbase-js/storage";
import { NearContext, Wallet } from "@/wallet/walletSelector";

type ReferenceObject = {
  title?: string;
  description?: string;
  media?: File | string;
};

const MintComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { wallet, signedAccountId } = useContext(NearContext);
  const uploadReferenceObject = async (refObject: ReferenceObject) => {
    try {
      return await uploadReference(refObject);
    } catch (error) {
      console.error("Failed to upload reference:", error);
      setLoading(false);
      throw new Error("Failed to upload reference");
    }
  };

  const performTransaction = async (wallet: Wallet, metadata: any) => {
    if (!wallet) {
      throw new Error("Wallet is not defined.");
    }

    try {
      return await wallet.callMethod({
        contractId: proxyContractAddress,
        method: "mint",
        args: {
          metadata: JSON.stringify(metadata),
          nft_contract_id: nftContrctAddress,
        },
        gas: "200000000000000",
        deposit: "10000000000000000000000",
      });
    } catch (error) {
      console.error("Failed to sign and send transaction:", error);
      throw new Error("Failed to sign and send transaction");
    }
  };
  const handleMint = async (): Promise<void> => {
    if (!wallet) {
      setError("Wallet is not initialized.");
      return;
    }
    if (!signedAccountId) {
      setError("Active account ID is not set.");
      return;
    }

    setLoading(true);

    try {
      const refObject = {
        title: "Understand The Fundamentals of Blockchain, Web3, and NEAR Protocol",
        description: "Near Research Collective",
        media:
          "https://arweave.net/yrSD0k6u5LilOxX9nsivajsLMWK9QSF8Jn5bJOz6uRQ",
      };
      const uploadedData = await uploadReferenceObject(refObject);
      const metadata = {
        reference: uploadedData?.id,
        title: "Understand The Fundamentals of Blockchain, Web3, and NEAR Protocol",
        description: "Near Research Collective",
      };
      await performTransaction(wallet, metadata);
    } catch (error: any) {
      setError(
        error?.message || "An error occurred during the minting process."
      );
    } finally {
      setLoading(false);
    }
  };
  const uploadFile = async (file: File): Promise<string> => {
    try {
      const refObject = { media: file };
      const uploadResult = await uploadReference(refObject);
      console.log("upload Result >>", uploadResult);

      const fileUrl = uploadResult?.media_url || "";

      console.log("Uploaded file URL:", fileUrl);

      return fileUrl;
    } catch (error) {
      console.error("Failed to upload file:", error);
      throw new Error("Failed to upload file");
    }
  };

  return { handleMint, uploadFile };
};

export default MintComponent;
