import type { NextApiRequest, NextApiResponse } from "next";
import {
  storeAccountIds,
  getStoredAccountIds,
  getStoredAccountByIds,
  getStoredTransactionHash,
} from "../../utils/AccountIdUtil";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        const {
          accountIds,
          transactionHash,
        }: { accountIds: string; transactionHash: string } = req.body;
        console.log(
          "Received accountIds:",
          accountIds,
          "and transactionHash:",
          transactionHash
        );

        if (typeof accountIds !== "string") {
          return res
            .status(400)
            .json({ error: "Invalid input. accountIds must be a string." });
        }
        if (typeof transactionHash !== "string" || !transactionHash) {
          return res.status(400).json({
            error: "Invalid input. transactionHash must be a non-empty string.",
          });
        }
        const savedAccountIds = await storeAccountIds(
          accountIds,
          transactionHash
        );
        console.log("Stored result:", savedAccountIds);
        return res.status(201).json(savedAccountIds);

      case "GET":
        const accountIdQuery = req.query.accountId as string;
        const transactionHashQuery = req.query.transactionHash as string;
        if (accountIdQuery) {
          const accountData = await getStoredAccountByIds(accountIdQuery);

          if (!accountData) {
            return res.status(404).json({ error: "Account not found" });
          }

          console.log("Retrieved account data:", accountData);
          return res.status(200).json(accountData);
        } else if (transactionHashQuery) {
          const transactionData = await getStoredTransactionHash(
            transactionHashQuery
          );

          if (!transactionData) {
            return res
              .status(404)
              .json({ error: "Transaction hash not found" });
          }

          console.log("Retrieved transaction data:", transactionData);
          return res.status(200).json(transactionData);
        } else {
          const storedAccountIds = await getStoredAccountIds();
          console.log("Retrieved all account IDs:", storedAccountIds);
          return res.status(200).json(storedAccountIds);
        }

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
