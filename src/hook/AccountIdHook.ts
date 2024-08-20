import { useState, useEffect } from "react";
import { AccountIds } from "@/types/types"; // Adjust the path as necessary

export const useAccountIds = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storedIds, setStoredIds] = useState<string[]>([]);

  const storeId = async (accountIds: string[]): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/AccountId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountIds }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: AccountIds = await response.json();
      console.log("Account IDs stored:", data);
    } catch (err) {
      console.error("Error storing account IDs:", err);
      setError("Error storing account IDs!");
    } finally {
      setLoading(false);
    }
  };

  const getStoredIds = async (): Promise<string[]> => {
    try {
      const response = await fetch("/api/AccountId", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("retrived account ids:",data.accountIds)
      return data.accountIds || []; // Ensure this is an array of IDs
    } catch (err) {
      console.error("Error retrieving account IDs:", err);
      return []; // Return an empty array on error
    }
  };

  return { storeId, getStoredIds, storedIds };
};
