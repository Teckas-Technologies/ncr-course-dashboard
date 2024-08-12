"use client";
import NearProfile from "@/components/NearProfile";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import MintComponent from "../../../utils/useMint";

export default function ProfilePage() {
  const [showDetails, setShowDetails] = useState(false);

  const metadata = {
    title: "My Custom NFT",
    description: "Custom description",
    media: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
  };

  const contractAddress = " proxyContractAddress";
  const ownerId = "calista_moltan.testnet";

  // Pass arguments to MintComponent
  const { handleMint } = MintComponent({ metadata, contractAddress, ownerId });

  return (
    <>
      <TopBar />
      <div className="page-container">
        <div className={`background ${showDetails ? "hidden" : ""}`}>
          <div className="background-color" />
        </div>
        <NearProfile setShowDetails={setShowDetails} />
      </div>
      <button onClick={handleMint}>Mint NFT</button>
    </>
  );
}
