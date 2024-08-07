"use client";
import React, { useState } from "react";
import { Copy, Pencil } from "lucide-react";
import NearProfileDetails from "./NearProfileDetails";
interface BackgroundShow {
  setShowDetails: (value: boolean) => void;
}
export default function NearProfile({ setShowDetails }: BackgroundShow) {
  const [showProfileDetails, setshowProfileDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEditClick = () => {
    setshowProfileDetails(true);
  };

  const handleCopyClick = () => {
    const textToCopy = document.querySelector(".acc_id")?.textContent || "";

    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 500);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  };

  return (
    <>
      {showProfileDetails ? (
        <NearProfileDetails setshowProfileDetails={setshowProfileDetails} />
      ) : (
        <div className="profile-container" style={{ position: "relative" }}>
          <div className="icon-container">
            <Pencil className="top-right-icon" onClick={handleEditClick} />
          </div>
          <div className="profile-info">
            <img
              className="profile-image"
              src="https://i.pinimg.com/236x/da/fd/f2/dafdf25168edcb2f0e1d8702797946cc.jpg"
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <h2>Jessica Jones</h2>
            <div className="acc-id-container">
              <p className="acc_id">calista_molten.testnet</p>
              <Copy
                className={`copy-icon ${copied ? "copied" : ""}`}
                onClick={handleCopyClick}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
