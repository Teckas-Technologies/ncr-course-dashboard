export interface Lesson {
  title: string;
  content: string;
}

export interface Module {
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface HomeworkSubmission {
  title: string;
  type: string;
  lessonIndex: number;
  moduleIndex: number;
  data: string;
  completed: boolean;
}

export interface Student {
  id: string;
  currentModule: number;
  currentLesson: number;
  progress: number;
  completed: boolean;
  homework: HomeworkSubmission[];
}
export interface AccountIds {
  accountIds: string;
  transactionHash: string;
}
export interface SelectedLesson {
  moduleTitle: string;
  lessonTitle: string;
  description: string;
  content: string;
}
export interface TokenData {
  createdAt: string;
  description: string;
  id: string;
  media: string;
  metadata_id: string;
  title: string;
  owner: String | null;
  tags?: string[];
}

export interface TokenFeedData {
  token: TokenData[];
}

export interface InfiniteScrollHook {
  mb_views_nft_tokens_aggregate: { aggregate: { count: string } };
  mb_views_nft_tokens: TokenData[];
}

export interface InfiniteScrollHookResult {
  data: InfiniteScrollHook;
}
export interface ExternalFundingSource {
  investorName: string;
  description: string;
  amountReceived: string;
  denomination: string;
  date?: string;
}

export interface ProfileLinktree {
  twitter?: string;
  github?: string;
  telegram?: string;
  website?: string;
}

export interface Image {
  ipfs_cid?: string;
  nft?: {
    contractId: string;
    tokenId: string;
  };
}

export enum Category {
  "social-impact" = "Social Impact",
  "non-profit" = "NonProfit",
  climate = "Climate",
  "public-good" = "Public Good",
  "de-sci" = "DeSci",
  "open-source" = "Open Source",
  community = "Community",
  education = "Education",
}

export interface NEARSocialUserProfile {
  name?: string;
  linktree?: ProfileLinktree;
  image?: Image;
  backgroundImage?: Image;
  description?: string;
  tags?: Record<string, string>;
  horizon_tnc?: string;
  // Project
  // required fields
  plPublicGoodReason?: string;
  plCategories?: string;
  // optional fields
  active?: boolean;
  location?: string;
  tagline?: string;
  services?: string;
  plGithubRepos?: string[];
  plFundingSources?: ExternalFundingSource[];
  plSmartContracts?: [string, string][];
  category?:
    | keyof typeof Category
    | {
        text: string;
      };
}
export type NetworkId = "testnet" | "mainnet";
