'use client';
import Banner from "@/components/Banner";
import CourseCard from "@/components/CourseCard";
import TopBar from "@/components/TopBar";
import WelcomeCard from "@/components/WelcomeCard";
import CourseOverview from "@/components/CourseOverview";
import ProgressComp from "@/components/Progress";
import SocialMedia from "@/components/SocialMedia"
import { useEffect, useState } from "react";
import { useMbWallet } from "@mintbase-js/react";
import { Button } from "@/components/ui/button";
import { useFetchStudentById } from "@/hook/StudentHook";
import { useFetchCourseModules } from "@/hook/CourseModuleHook";
import { Module, Student } from "@/types/types";

export default function Home() {

    const { courseModules, error, loading } = useFetchCourseModules();
    const [ currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const { isConnected, activeAccountId } = useMbWallet();
    const { fetchStudentById } = useFetchStudentById();
    const [ student, setStudent ] =useState<Student | null | undefined>(null);
    const totalLessons = courseModules?.reduce((total: number, theModule: any) => total + theModule.lessons.length, 0);
    let progress = 0;
    if (totalLessons) {
        let completedLessons: number = student?.homework.length || 0;
        progress = Math.round((completedLessons / totalLessons) * 100);
    }
    const completedHomework = student?.homework.filter(lesson => lesson.completed).length || 0;
    const [selectedLesson, setSelectedLesson] = useState({
      moduleTitle: courseModules && courseModules.length > 0 ? courseModules[0]?.title || "" : "",
      lessonTitle: courseModules && courseModules.length > 0 && courseModules[0]?.lessons.length > 0 ? courseModules[0]?.lessons[0]?.title || "" : "",
      description: courseModules && courseModules.length > 0 ? courseModules[0]?.description || "" : "",
      content: courseModules && courseModules.length > 0 && courseModules[0]?.lessons.length > 0 ? courseModules[0]?.lessons[0]?.content || "" : "",
    });
    

    useEffect(()=> {
      if(isConnected) {
        if(activeAccountId) {
          fetchStudentById(activeAccountId.toString()).then((res)=> {
            setStudent(res);
          });
        }
      }
    }, [activeAccountId]);

    useEffect(() => {
      updateSelectedLesson(currentModuleIndex, currentLessonIndex);
    }, [currentModuleIndex, currentLessonIndex]);


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
    


  return (
    <>
      <TopBar/>
      <Banner totalModules={courseModules?.length} totalLessons={totalLessons} />
      <div className="main-page">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hidden md:block w-full md:w-3/12">
            {isConnected && courseModules?.length ? <ProgressComp value={progress} currentModule={student?.currentModule} currentLesson={student?.currentLesson} homework={completedHomework} />  : ""}
            <SocialMedia />
          </div>
          <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
            <CourseOverview />
            {courseModules ? <CourseCard setSelectedLesson={setSelectedLesson} updateSelectedLesson={updateSelectedLesson} student={student} courseModules={courseModules} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
}
