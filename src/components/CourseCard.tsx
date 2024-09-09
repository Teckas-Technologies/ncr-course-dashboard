"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardHeader, CardTitle } from "./ui/card";
import "../app/style.css";
import Link from "next/link";
import { Notebook, NotebookPenIcon } from "lucide-react";
import HomeworkSubmissionForm from "./HomeworkSubmissionForm";
import { Module, Student, SelectedLesson } from "@/types/types";
import { useState, useContext } from "react";
import { NearContext } from "@/wallet/walletSelector";
import { useToast } from "./ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface CourseCardProps {
  setSelectedLesson: (lesson: SelectedLesson) => void;
  updateSelectedLesson: (moduleIndex: number, lessonIndex: number) => void;
  student: Student | null | undefined;
  courseModules: Module[] | null;
  setClickNext:(value:boolean)=>void;
  clcikNext: boolean;
}

export default function CourseCard({
  setSelectedLesson,
  updateSelectedLesson,
  student,
  courseModules,
  setClickNext,
  clcikNext
}: CourseCardProps) {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [showPopup, setShowPopup] = useState(false);
  const totalLessons = courseModules?.reduce(
    (total: number, theModule: any) => total + theModule.lessons.length,
    0
  );
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

  const handleSignIn = async () => {
    return wallet?.signIn();
  };

  const handleNavigation = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!signedAccountId) {
      event.preventDefault();
      setShowPopup(true);
    }
  };

  const isPreviousLessonCompleted = (
    moduleIndex: number,
    lessonIndex: number
  ) => {
    if (lessonIndex === 0 && moduleIndex === 0) {
      return true; // First lesson, no previous lesson to check
    }
    const prevModuleIndex = lessonIndex === 0 ? moduleIndex - 1 : moduleIndex;
    const prevLessonIndex =
      lessonIndex === 0
        ? courseModules![prevModuleIndex].lessons.length - 1
        : lessonIndex - 1;

    // Check if the previous lesson is completed
    return (
      student?.homework.some(
        (hw) =>
          hw.moduleIndex === prevModuleIndex &&
          hw.lessonIndex === prevLessonIndex &&
          hw.completed
      ) || submittedHomework[`${prevModuleIndex}-${prevLessonIndex}`]
    );
  };
  console.log("array>>", student?.homework);

  const handleLessonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    moduleIndex: number,
    lessonIndex: number
  ) => {
    if (!isPreviousLessonCompleted(moduleIndex, lessonIndex)) {
      event.preventDefault();

      // Get the previous module and lesson index
      const prevModuleIndex = lessonIndex === 0 ? moduleIndex - 1 : moduleIndex;
      const prevLessonIndex =
        lessonIndex === 0
          ? courseModules![prevModuleIndex].lessons.length - 1
          : lessonIndex - 1;

      // Get the previous lesson's title
      const prevLessonTitle =
        courseModules![prevModuleIndex].lessons[prevLessonIndex].title;

      // Show normal toast at the bottom right
      toast({
        title: "Incomplete Homework",
        description: `Please complete the lesson "${prevLessonTitle}" homework before start this Lesson.`,
      });
    } else {
      updateSelectedLesson(moduleIndex, lessonIndex);
      setSelectedLesson({
        moduleTitle: courseModules![moduleIndex].title,
        lessonTitle: courseModules![moduleIndex].lessons[lessonIndex].title,
        description: courseModules![moduleIndex].description,
        content: courseModules![moduleIndex].lessons[lessonIndex].content,
      });
    }
  };

  return (
    <>
      {courseModules && (
        <Card className="course-card">
          <CardHeader>
            <CardTitle className="course-content">
              <Notebook />
              Course Content
            </CardTitle>
          </CardHeader>
          <Accordion type="single" collapsible>
            {courseModules.map((module, moduleIndex) => (
              <AccordionItem
                key={moduleIndex}
                value={`module-${moduleIndex + 1}`}
              >
                <AccordionTrigger className="module-trigger">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isHomeworkCompleted =
                        student &&
                        student.homework.some(
                          (hw) =>
                            hw.moduleIndex === moduleIndex &&
                            hw.lessonIndex === lessonIndex &&
                            hw.completed // Check if the homework is completed
                        );

                      const homeworkKey = `${moduleIndex}-${lessonIndex}`;
                      const isSubmitted = submittedHomework[homeworkKey];

                      return (
                        <AccordionItem
                          key={lessonIndex}
                          value={`lesson-${moduleIndex + 1}-${lessonIndex + 1}`}
                          onClick={(e) =>
                            handleLessonClick(e, moduleIndex, lessonIndex)
                          }
                        >
                          <AccordionTrigger className="lesson-trigger">
                            {lesson.title}
                          </AccordionTrigger>
                          <AccordionContent className="lesson-content">
                            <Accordion type="single" collapsible>
                              {isPreviousLessonCompleted(
                                moduleIndex,
                                lessonIndex
                              ) ? (
                                <>
                                  <Link
                                    href="/course"
                                    className="reference-link"
                                    onClick={handleNavigation}
                                  >
                                    Start Learning
                                  </Link>
                                  {student &&
                                  (isHomeworkCompleted || isSubmitted) ? (
                                    <h2 className="pt-4">
                                      Homework Already Submitted!
                                    </h2>
                                  ) : (
                                    <div>
                                      <AccordionItem value="homework-1">
                                        <AccordionTrigger
                                          className="homework-trigger"
                                          onClick={handleNavigation}
                                        >
                                          <NotebookPenIcon />
                                          Submit Homework
                                        </AccordionTrigger>
                                        <AccordionContent className="homework-content">
                                          <HomeworkSubmissionForm
                                            studentId={
                                              student ? student.id : ""
                                            }
                                            studentCurrentModule={
                                              student
                                                ? student.currentModule
                                                : 0
                                            }
                                            studentCurrentLesson={
                                              student
                                                ? student.currentModule
                                                : 0
                                            }
                                            studentProgress={progress}
                                            currentModule={moduleIndex}
                                            currentLesson={lessonIndex}
                                            courseModules={courseModules}
                                            setClickNext={setClickNext}
                                            clcikNext={clcikNext}
                                            handleHomeworkSubmit={() =>
                                              handleHomeworkSubmit(
                                                moduleIndex,
                                                lessonIndex
                                              )
                                            }
                                          />
                                        </AccordionContent>
                                      </AccordionItem>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <p className="text-gray-500">
                                  Complete the previous lesson&apos;s homework
                                  to continue.
                                </p>
                              )}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      )}
      <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Start learning by signing in with your wallet.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={handleSignIn}
              className="bg-[#df3276] text-white px-4 py-2 rounded-md"
            >
              Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
