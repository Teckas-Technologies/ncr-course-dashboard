import AccountId from "../model/AccountId";
import { connectToDatabase } from "./mongoose";

// Function to store account IDs
export async function storeAccountIds(
  accountIds: string[],
  transactionHash: string
): Promise<{ accountIds: string[]; transactionHash: string }> {
  await connectToDatabase();
  try {
    const newAccountIdDoc = new AccountId({
      accountIds: accountIds,
      transactionHash: transactionHash,
    });

    const savedAccountIdDoc = await newAccountIdDoc.save();

    return {
      accountIds: savedAccountIdDoc.accountIds,
      transactionHash: savedAccountIdDoc.transactionHash,
    };
  } catch (error) {
    console.error("Error storing account IDs and transaction hash:", error);
    throw new Error("Failed to store account IDs and transaction hash");
  }
}

// Function to get stored account IDs
export async function getStoredAccountIds(): Promise<{
  accountIds: string[];
  transactionHash: string;
}> {
  await connectToDatabase();

  try {
    // Find the existing document
    const existingAccountIdsDoc = await AccountId.findOne();

    if (!existingAccountIdsDoc) {
      return { accountIds: [], transactionHash: "" }; // Return an empty array if no document is found
    }

    // Return the accountIds from the document
    return {
      accountIds: existingAccountIdsDoc.accountIds,
      transactionHash: existingAccountIdsDoc.transactionHash,
    };
  } catch (error) {
    console.error("Error retrieving account IDs and transaction hash:", error);
    throw new Error("Failed to retrieve account IDs and transaction hash");
  }
}
