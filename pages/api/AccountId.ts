import type { NextApiRequest, NextApiResponse } from "next";
import { storeAccountIds, getStoredAccountIds } from "../../utils/AccountIdUtil"; 
import { AccountIds } from "@/types/types"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      
      case "POST":
        const { accountIds, transactionHash }: { accountIds: string[], transactionHash: string  } = req.body;
        console.log("Received accountIds:", accountIds,"and transactionHash:", transactionHash);

        if (!Array.isArray(accountIds) || accountIds.some(id => typeof id !== 'string')) {
          return res.status(400).json({ error: "Invalid input. accountIds must be an array of strings." });
        }
        if (typeof transactionHash !== 'string' || !transactionHash) {
          return res.status(400).json({ error: "Invalid input. transactionHash must be a non-empty string." });
        }
        const savedAccountIds = await storeAccountIds(accountIds, transactionHash);
        console.log("Stored result:", savedAccountIds);
        return res.status(201).json(savedAccountIds);

      
      case "GET":
        const storedAccountIds: { accountIds: string[], transactionHash: string } = await getStoredAccountIds();
        console.log("Retrieved accountIds:", storedAccountIds);
        return res.status(200).json(storedAccountIds);

      default:
        res.setHeader("Allow", ["POST", "GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
