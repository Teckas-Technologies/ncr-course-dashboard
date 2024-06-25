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

export interface SelectedLesson {
    moduleTitle: string;
    lessonTitle: string;
    description: string;
    content: string;
}