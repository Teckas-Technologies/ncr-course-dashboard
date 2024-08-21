import { useState, useEffect } from "react";
import { AccountIds } from "@/types/types"; // Adjust the path as necessary

export const useAccountIds = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storedIds, setStoredIds] = useState<string[]>([]);

  const storeId = async (accountIds: string[], transactionHash: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/AccountId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountIds, transactionHash }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: AccountIds = await response.json();
      console.log("Account IDs and transaction hash stored::", data);
    } catch (err) {
      console.error("Error storing account IDs and transaction hash:", err);
      setError("Error storing account IDs and transaction hash!");
    } finally {
      setLoading(false);
    }
  };

  const getStoredIds = async (): Promise<{ accountIds: string[], transactionHash: string } | null>  => {
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
      console.log("Retrieved account IDs and transaction hash:", data);
      return data; // Ensure this is an array of IDs
    } catch (err) {
      console.error("Error retrieving account IDs and transaction hash:", err);
      return null; // Return an empty array on error
    }
  };

  return { storeId, getStoredIds };
};
