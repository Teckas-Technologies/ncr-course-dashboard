"use client";
import NearProfile from "@/components/NearProfile";
import TopBar from "@/components/TopBar";
import { useState, useEffect, useContext } from "react";
import { NearContext } from "@/wallet/walletSelector";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const router = useRouter();
  const { signedAccountId } = useContext(NearContext);
  useEffect(() => {
    if (!signedAccountId) {
      router.push("/");
    } else {
      router.push("/profile");
    }
  }, [signedAccountId]);
  return (
    <>
      <TopBar />
      <div className="page-container">
        <NearProfile />
      </div>
    </>
  );
}
