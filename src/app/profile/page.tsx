"use client";
import NearProfile from "@/components/NearProfile";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";

export default function ProfilePage() {
 

  return (
    <>
      <TopBar />
      <div className="page-container">
       
        <NearProfile  />
      </div>
    </>
  );
}
