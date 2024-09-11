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
import { useToast } from "./ui/use-toast";
import HomeworkSubmissionForm from "./HomeworkSubmissionForm";

interface CourseProps {
  selectedLesson: SelectedLesson;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  isFirstLesson: boolean;
  isLastLesson: boolean;
  courseModules: Module[];
  student: Student | null | undefined;
  setClickNext:(value:boolean)=>void;
  clickNext: boolean;
  setUpdateCard:(value: boolean) => void;
  updateCard:boolean;
  showSubmitModal:boolean;
  handleSubmitSuccess:()=>void;
  setShowSubmitModal:(value:boolean)=>void;
}

export default function Course({
  selectedLesson,
  onNextLesson,
  onPreviousLesson,
  isFirstLesson,
  isLastLesson,
  courseModules,
  student,
  setClickNext,
  clickNext,
  setUpdateCard,
  updateCard,
  showSubmitModal,
  handleSubmitSuccess,
  setShowSubmitModal
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
  let progress = 0;
  if (totalLessons) {
    let completedLessons: number = student?.homework.length || 0;
    progress = Math.round((completedLessons / totalLessons) * 100);
  }
  const [submittedHomework, setSubmittedHomework] = useState<{
    [key: string]: boolean;
  }>({});

  const handleHomeworkSubmit = (moduleIndex: number, lessonIndex: number) => {
    setSubmittedHomework((prev) => ({
      ...prev,
      [`${moduleIndex}-${lessonIndex}`]: true,
    }));
  };

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
      // toast({
      //   title: "Incomplete Homework",
      //   description:
      //     "Please submit the homework for this lesson before proceeding to the next one.",
      //   action: (
      //     <Button onClick={() => setShowSubmitModal(true)}>
      //       Submit Homework
      //     </Button>
      //   ),
      // });
      toast({
        title: "Incomplete Homework", 
        description: (
          <div className="flex flex-col">
            <div>
              <p>
                Please submit the homework for this lesson before proceeding to
                the next one.
              </p>
            </div>
            <Button
              onClick={() => setShowSubmitModal(true)}
              className="self-center mb-2 text-xs mt-4 w-32" 
            >
              Submit Homework
            </Button>
          </div>
        ), 
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

  const moduleIndex = courseModules.findIndex(
    (module) => module.title === selectedLesson.moduleTitle
  );
  const lessonIndex = courseModules[moduleIndex]?.lessons.findIndex(
    (lesson) => lesson.title === selectedLesson.lessonTitle
  );
  
  
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
          {/* Homework Submission Modal */}
          <AlertDialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Homework</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Please submit the homework for the current lesson.
              </AlertDialogDescription>
              <HomeworkSubmissionForm
                studentId={student ? student.id : ""}
                studentCurrentModule={student ? student.currentModule : 0}
                studentCurrentLesson={student ? student.currentModule : 0}
                studentProgress={progress}
                currentModule={moduleIndex}
                currentLesson={lessonIndex}
                courseModules={courseModules}
                setClickNext={setClickNext}
                clickNext={clickNext}
                setUpdateCard={setUpdateCard}
                updateCard={updateCard}
                handleHomeworkSubmit={() =>
                  handleHomeworkSubmit(moduleIndex, lessonIndex)
                  
                }
                handleSubmitSuccess={handleSubmitSuccess}
              />
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setShowSubmitModal(false)}>
                  Close
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
