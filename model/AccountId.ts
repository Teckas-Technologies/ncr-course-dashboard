import mongoose, { Document, Model } from "mongoose";

interface AccountId extends Document {
  accountIds: string[];
  transactionHash: string;
}

const accountIdSchema = new mongoose.Schema(
  {
    accountIds: {
      type: [String],
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AccountId: Model<AccountId> =
  mongoose.models.AccountId ||
  mongoose.model<AccountId>("AccountId", accountIdSchema);

export default AccountId;
