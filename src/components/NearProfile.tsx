"use client";
import React, { useState } from "react";
import { Copy, Pencil } from "lucide-react";
import NearProfileDetails from "./NearProfileDetails";
interface BackgroundShow {
  setShowDetails: (value: boolean) => void;
}
export default function NearProfile({ setShowDetails }: BackgroundShow) {
  const [showProfileDetails, setshowProfileDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleEditClick = () => {
    setshowProfileDetails(true);
  };

  const handleCopyClick = () => {
    const textToCopy = document.querySelector(".acc_id")?.textContent || "";

    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2000); // Hide the toast after 2 seconds
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
            <div className="copy_id" style={{ position: "relative" }}>
              <Copy className="copy-icon" onClick={handleCopyClick} />
              <div className={`toast-container ${showToast ? "show" : ""}`}>
                Copied
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
