import { useEffect, useRef, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Module, SelectedLesson, Student } from "@/types/types";
import { useUpdateStudent } from "@/hook/StudentHook";


interface CourseProps {
    selectedLesson: SelectedLesson;
    onNextLesson: () => void;
    onPreviousLesson: () => void;
    isFirstLesson: boolean;
    isLastLesson: boolean;
    courseModules: Module[];
    student: Student | null | undefined;
}

export default function Course({ selectedLesson, onNextLesson, onPreviousLesson, isFirstLesson, isLastLesson, courseModules, student }: CourseProps) {

    const finish = useRef<HTMLButtonElement>(null);
    const totalLessons = courseModules?.reduce((total: number, theModule: any) => total + theModule.lessons.length, 0);
    const [courseCompleted, setCourseCompleted] = useState(false);
    const [completedLessons, setCompletedLessons] = useState(0);
    const { updateStudent } = useUpdateStudent();

    useEffect(() => {
        const completedCount = student?.homework.filter(lesson => lesson.completed).length || 0;
        setCompletedLessons(completedCount);

        if (completedCount === totalLessons) {
        setCourseCompleted(true);
        }
    }, [student?.homework, totalLessons]);

    console.log("Lessons ==>", totalLessons, completedLessons)

    const handleFinish = () => {
        if(courseCompleted) {
            updateStudentsCompletion();
        }
        if (finish.current) {
          finish.current.click();
        }
    };

    const updateStudentsCompletion = async () => {
        if (!student) return;
        try {
            await updateStudent(student.id, { completed: true });
        } catch (error) {
            console.error("Error updating student completion status:", error);
        }
    };

    const preprocessHTMLContent = (html: string) => {
        return html.replace(/<p><\/p>/g, '<br/>');
    };

    return (
        <>
            <div className="course-learn-page pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedLesson.moduleTitle}</CardTitle>
                        <CardDescription>{selectedLesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h2>{selectedLesson.lessonTitle}</h2><br />
                        <p className="text-justify content" dangerouslySetInnerHTML={{ __html: preprocessHTMLContent(selectedLesson.content) }}></p>
                        <div className="flex justify-between mt-4">
                            <Button onClick={onPreviousLesson} disabled={isFirstLesson}>
                                Previous
                            </Button>
                            {isLastLesson ?
                            <Button
                                onClick={handleFinish}
                                disabled={(!courseCompleted || student?.completed)}
                            >
                                Finish
                            </Button> 
                            :
                            <Button
                                onClick={onNextLesson}
                            >
                                Next
                            </Button>}

                        </div>
                    </CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild >
                            <Button ref={finish} style={{ display: 'none' }}>
                                Trigger
                            </Button>
                        </AlertDialogTrigger>
                        {courseCompleted &&
                            <AlertDialogContent>
                                <AlertDialogTitle>Congradulations!</AlertDialogTitle>
                                <AlertDialogDescription>You have successfully completed the NCR course!</AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogAction>Thank You!</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        }
                    </AlertDialog>
                </Card>
            </div>
        </>
    )
}