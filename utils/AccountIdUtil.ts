import AccountId from "../model/AccountId";
import { connectToDatabase } from "./mongoose";

export async function storeAccountIds(
  accountIds: string,
  transactionHash: string
): Promise<{ accountIds: string; transactionHash: string }> {
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

export async function getStoredAccountIds() {
  await connectToDatabase();

  try {
    const accountIdsDocs = await AccountId.find();
    console.log(
      "Retrieved account IDs and transaction hashes:",
      accountIdsDocs
    );

    return accountIdsDocs;
  } catch (error) {
    console.error(
      "Error retrieving account IDs and transaction hashes:",
      error
    );
    throw new Error("Failed to retrieve account IDs and transaction hashes");
  }
}

export async function getStoredAccountByIds(accountId: string): Promise<{ accountIds: string; transactionHash: string } | null> {
  await connectToDatabase();

  try {
    // Find a specific document by accountIds
    const accountIdsDoc = await AccountId.findOne({ accountIds: accountId });

    console.log("Retrieved account ID and transaction hash:", accountIdsDoc);

    return accountIdsDoc ? {
      accountIds: accountIdsDoc.accountIds,
      transactionHash: accountIdsDoc.transactionHash,
    } : null;
  } catch (error) {
    console.error("Error retrieving account ID and transaction hash:", error);
    throw new Error("Failed to retrieve account ID and transaction hash");
  }
}

export async function getStoredTransactionHash(transactionHash: string): Promise<{ transactionHash: string; accountIds: string } | null> {
  await connectToDatabase();

  try {
    // Find a specific document by transactionHash
    const transactionHashDoc = await AccountId.findOne({ transactionHash });

    console.log("Retrieved transaction hash and associated account IDs:", transactionHashDoc);

    return transactionHashDoc ? {
      transactionHash: transactionHashDoc.transactionHash,
      accountIds: transactionHashDoc.accountIds,
    } : null;
  } catch (error) {
    console.error("Error retrieving transaction hash and associated account IDs:", error);
    throw new Error("Failed to retrieve transaction hash and associated account IDs");
  }
}