export interface Lesson {
    title: string;
    content:string;
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
  accountIds: string[];
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
    tags?: string[]
  }
  
  export interface TokenFeedData {
    token: TokenData[];
  }
  
  export interface InfiniteScrollHook {
    mb_views_nft_tokens_aggregate: { aggregate: { count: string } };
    token: TokenData[];
  }
  
  export interface InfiniteScrollHookResult {
    data: InfiniteScrollHook;
  }