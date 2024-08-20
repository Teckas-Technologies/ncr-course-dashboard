import AccountId from "../model/AccountId";
import { connectToDatabase } from "./mongoose";

// Function to store account IDs
export async function storeAccountIds(accountIds: string[]): Promise<{ accountIds: string[] }> {
  await connectToDatabase();

  try {
    // Find the existing document, or create a new one if not found
    let existingAccountIdsDoc = await AccountId.findOne();

    if (!existingAccountIdsDoc) {
      // Initialize with an empty accountIds array
      existingAccountIdsDoc = new AccountId({ accountIds: [] });
    }

    // Add only new, unique accountIds
    const newAccountIds = accountIds.filter(
      (id) => !existingAccountIdsDoc.accountIds.includes(id)
    );
    existingAccountIdsDoc.accountIds.push(...newAccountIds);

    // Save the updated document
    const updatedAccountIdsDoc = await existingAccountIdsDoc.save();

    // Return the updated document as AccountIds type
    return {
      accountIds: updatedAccountIdsDoc.accountIds,
    };
  } catch (error) {
    console.error("Error storing account IDs:", error);
    throw new Error("Failed to store account IDs");
  }
}

// Function to get stored account IDs
export async function getStoredAccountIds(): Promise<{ accountIds: string[] }> {
  await connectToDatabase();

  try {
    // Find the existing document
    const existingAccountIdsDoc = await AccountId.findOne();

    if (!existingAccountIdsDoc) {
      return { accountIds: [] }; // Return an empty array if no document is found
    }

    // Return the accountIds from the document
    return { accountIds: existingAccountIdsDoc.accountIds };
  } catch (error) {
    console.error("Error retrieving account IDs:", error);
    throw new Error("Failed to retrieve account IDs");
  }
}
