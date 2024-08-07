"use client";
import NearProfile from "@/components/NearProfile";
import NearProfileDetails from "@/components/NearProfileDetails";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";

export default function ProfilePage() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <TopBar />
      <div className="page-container">
        <div className={`background ${showDetails ? 'hidden' : ''}`}>
          <div className="background-color" />
        </div>
        <NearProfile setShowDetails={setShowDetails} />
      </div>
    </>
  );
}
