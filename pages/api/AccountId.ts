import type { NextApiRequest, NextApiResponse } from "next";
import { storeAccountIds, getStoredAccountIds } from "../../utils/AccountIdUtil"; 
import { AccountIds } from "@/types/types"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      // POST method is used for storing accountIds
      case "POST":
        const { accountIds }: { accountIds: string[] } = req.body;
        console.log("Received accountIds:", accountIds);

        if (!Array.isArray(accountIds) || accountIds.some(id => typeof id !== 'string')) {
          return res.status(400).json({ error: "Invalid input. accountIds must be an array of strings." });
        }

        const savedAccountIds = await storeAccountIds(accountIds);
        console.log("Stored result:", savedAccountIds);
        return res.status(201).json(savedAccountIds);

      // GET method is used for fetching stored accountIds
      case "GET":
        const storedAccountIds: { accountIds: string[] } = await getStoredAccountIds();
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
