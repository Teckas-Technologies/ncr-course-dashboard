'use client';
import Banner from "@/components/Banner";
import CourseCard from "@/components/CourseCard";
import TopBar from "@/components/TopBar";
import Course from "@/components/Course";
import { useEffect, useState } from "react";
import HomeworkSubmissionMobileMenu from "@/components/HomeworkSubmissionMobileMenu";
import { useFetchStudentById } from "@/hook/StudentHook";
import { useMbWallet } from "@mintbase-js/react";
import { useFetchCourseModules } from "@/hook/CourseModuleHook";
import { Module, Student } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// const getLessonNumber = (moduleIndex, lessonIndex) => {
//   let lessonNumber = 0;
//   for (let i = 0; i < moduleIndex; i++) {
//       lessonNumber += courseModules[i].lessons.length;
//   }
//   lessonNumber += lessonIndex + 1;
//   return lessonNumber;
// };
  
export default function CoursePage() {

    const { courseModules, error, loading } = useFetchCourseModules();
    const { isConnected, activeAccountId } = useMbWallet();
    const { fetchStudentById } = useFetchStudentById();
    const [ student, setStudent ] =useState<Student | null | undefined>(null);
    const totalLessons = courseModules?.reduce((total: number, theModule: any) => total + theModule.lessons.length, 0);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState({
      moduleTitle: courseModules && courseModules.length > 0 ? courseModules[0]?.title || "" : "",
      lessonTitle: courseModules && courseModules.length > 0 && courseModules[0]?.lessons.length > 0 ? courseModules[0]?.lessons[0]?.title || "" : "",
      description: courseModules && courseModules.length > 0 ? courseModules[0]?.description || "" : "",
      content: courseModules && courseModules.length > 0 && courseModules[0]?.lessons.length > 0 ? courseModules[0]?.lessons[0]?.content || "" : "",
    });

    useEffect(() => {
      if (courseModules && courseModules.length > 0) {
          updateSelectedLesson(currentModuleIndex, currentLessonIndex);
      }
    }, [courseModules, currentModuleIndex, currentLessonIndex]);

    useEffect(()=> {
      if(isConnected) {
        if(activeAccountId) {
          fetchStudentById(activeAccountId.toString()).then((res)=> {
            setStudent(res);
          });
        }
      }
    }, [activeAccountId, isConnected])

    const updateSelectedLesson = (moduleIndex: number, lessonIndex: number) => {
      const theModule: Module | null = courseModules ? courseModules[moduleIndex] : null;
      const lesson = theModule?.lessons[lessonIndex];
      setSelectedLesson({
        moduleTitle: theModule ? theModule.title : "",
        lessonTitle: lesson ? lesson.title : "",
        description: theModule ? theModule.description : "",
        content: lesson ? lesson.content : "",
      });
      setCurrentModuleIndex(moduleIndex);
      setCurrentLessonIndex(lessonIndex);
    };

    const handleNextLesson = () => {
      if(courseModules) {
        const currentModule = courseModules[currentModuleIndex];
        if (currentLessonIndex < currentModule.lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        } else if (currentModuleIndex < courseModules.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
            setCurrentLessonIndex(0);
        }
      }
    };

    const handlePreviousLesson = () => {
      if(courseModules) {
        if (currentLessonIndex > 0) {
          setCurrentLessonIndex(currentLessonIndex - 1);
        } else if (currentModuleIndex > 0) {
            setCurrentModuleIndex(currentModuleIndex - 1);
            setCurrentLessonIndex(courseModules[currentModuleIndex - 1].lessons.length - 1);
        }
      }
    };

    let isFirstLesson = false;
    let isLastLesson = false;

    if(courseModules) {
      isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;
      isLastLesson = currentModuleIndex === courseModules.length - 1 && currentLessonIndex === courseModules[currentModuleIndex].lessons.length - 1;
    }


  return (
    <>
      <TopBar/>
      <Banner totalModules={courseModules?.length} totalLessons={totalLessons} />
      <div className="main-page">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hidden md:block w-full md:w-3/12 side-course">
            <CourseCard setSelectedLesson={setSelectedLesson} updateSelectedLesson={updateSelectedLesson} student={student} courseModules={courseModules}/>
          </div>
          <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
            {courseModules ? <HomeworkSubmissionMobileMenu student={student} courseModules={courseModules} currentModuleIndex={currentModuleIndex} currentLessonIndex={currentLessonIndex}  /> : ""}
            {courseModules ? 
            <Course 
            selectedLesson={selectedLesson}
            onNextLesson={handleNextLesson}
            onPreviousLesson={handlePreviousLesson}
            isFirstLesson={isFirstLesson}
            isLastLesson={isLastLesson}
            courseModules={courseModules}
            student={student} />
            : <Card>
              <CardHeader>
                <CardTitle>Not Found</CardTitle>
                <CardDescription>Check later!</CardDescription>
              </CardHeader>
              </Card>}
          </div>
        </div>
      </div>
    </>
  );
}
