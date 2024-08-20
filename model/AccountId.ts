import mongoose, { Document, Model } from 'mongoose';

interface AccountId extends Document {
    accountIds: string[];
}

const accountIdSchema = new mongoose.Schema({
    accountIds: {  // Changed to match the interface
        type: [String],
        required: true,
       
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const AccountId: Model<AccountId> = mongoose.models.AccountId || mongoose.model<AccountId>('AccountId', accountIdSchema);

export default AccountId;
