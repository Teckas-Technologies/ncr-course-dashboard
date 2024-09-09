import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Module, SelectedLesson, Student } from "@/types/types";
import { useUpdateStudent } from "@/hook/StudentHook";
import { useToast } from "./ui/use-toast"; // Import useToast for notification

interface CourseProps {
  selectedLesson: SelectedLesson;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  isFirstLesson: boolean;
  isLastLesson: boolean;
  courseModules: Module[];
  student: Student | null | undefined;
  
}

export default function Course({
  selectedLesson,
  onNextLesson,
  onPreviousLesson,
  isFirstLesson,
  isLastLesson,
  courseModules,
  student,
 
}: CourseProps) {
  const router = useRouter();
  const finish = useRef<HTMLButtonElement>(null);
  const totalLessons = courseModules?.reduce(
    (total: number, theModule: any) => total + theModule.lessons.length,
    0
  );
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);
  const { updateStudent } = useUpdateStudent();
  const { toast } = useToast(); 

  useEffect(() => {
    const completedCount =
      student?.homework.filter((lesson) => lesson.completed).length || 0;
    setCompletedLessons(completedCount);

    if (completedCount === totalLessons) {
      setCourseCompleted(true);
    }
  }, [student?.homework, totalLessons]);

  const handleFinish = () => {
    if (courseCompleted) {
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
    return html.replace(/<p><\/p>/g, "<br/>");
  };

  const handleNext = () => {
    const currentModuleIndex = courseModules.findIndex(
      (module) => module.title === selectedLesson.moduleTitle
    );
    const currentLessonIndex = courseModules[
      currentModuleIndex
    ].lessons.findIndex(
      (lesson) => lesson.title === selectedLesson.lessonTitle
    );

    const isHomeworkCompleted =
      student &&
      student.homework.some(
        (hw) =>
          hw.moduleIndex === currentModuleIndex &&
          hw.lessonIndex === currentLessonIndex &&
          hw.completed
      );
    console.log("hw completed?", isHomeworkCompleted);

    if (!isHomeworkCompleted) {
      toast({
        title: "Incomplete Homework",
        description:
          "Please submit the homework for this lesson before proceeding to the next one.",
      });
      return;
    }

    onNextLesson();
    const element = document.getElementById("content-top");
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const handlePrevious = () => {
    onPreviousLesson();
    const element = document.getElementById("content-top");
    if (element) {
      element.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };
  const handleThankYouClick = () => {
    router.push("/"); 
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
            <h2>{selectedLesson.lessonTitle}</h2>
            <br />
            <p
              className="text-justify content"
              dangerouslySetInnerHTML={{
                __html: preprocessHTMLContent(selectedLesson.content),
              }}
            ></p>
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrevious} disabled={isFirstLesson}>
                Previous
              </Button>
              {isLastLesson ? (
                <Button
                  onClick={handleFinish}
                  disabled={!courseCompleted || student?.completed}
                >
                  Finish
                </Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button ref={finish} style={{ display: "none" }}>
                Trigger
              </Button>
            </AlertDialogTrigger>
            {courseCompleted && (
              <AlertDialogContent>
                <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                <AlertDialogDescription>
                  You have successfully completed the NCR course!
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleThankYouClick}>
                    Thank You!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </Card>
      </div>
    </>
  );
}
