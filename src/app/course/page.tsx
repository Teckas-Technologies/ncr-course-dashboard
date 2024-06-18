'use client';
import Banner from "@/components/Banner";
import CourseCard from "@/components/CourseCard";
import TopBar from "@/components/TopBar";
import Course from "@/components/Course";
import { useEffect, useState } from "react";
import HomeworkSubmissionMobileMenu from "@/components/HomeworkSubmissionMobileMenu";

interface SelectedLesson {
    moduleTitle: string;
    lessonTitle: string;
    description: string;
    activities: string;
}


const courseModules = [
  {
      title: "Module 1 : Introduction to Blockchain and NEAR Protocol",
      description: "This module covers the fundamental concepts of blockchain technology and introduces the NEAR Protocol.",
      lessons: [
          { title: "Lesson 1 : Introduction to Blockchain and NEAR Protocol", link: "https://hackmd.io/@doulos819/ncr-01" },
          { title: "Lesson 2 : Data Retrieval and Analysis", link: "https://hackmd.io/@doulos819/ncr-02" },
      ],
  },
  {
      title: "Module 2 : Data Transformation and Visualization",
      description: "This module focuses on techniques for transforming and visualizing data.",
      lessons: [
          { title: "Lesson 3 : Data Transformation and Visualization", link: "https://hackmd.io/@doulos819/ncr-03" },
          { title: "Lesson 4 : Advanced Data Evaluation Methods", link: "https://hackmd.io/@doulos819/ncr-04" },
      ],
  },
  {
      title: "Module 3 : Specialized Topics in Blockchain",
      description: "This module explores specialized topics in blockchain, including governance, decentralized finance, non-fungible tokens, and blockchain in gaming.",
      lessons: [
          { title: "Lesson 5 : Research Topic Identification", link: "https://hackmd.io/@doulos819/ncr-05" },
          { title: "Lesson 6 : Governance in Blockchain", link: "https://hackmd.io/@doulos819/ncr-06" },
          { title: "Lesson 7 : Decentralized Finance (DeFi)", link: "https://hackmd.io/@doulos819/ncr-07" },
          { title: "Lesson 8 : Non-Fungible Tokens (NFTs)", link: "https://hackmd.io/@doulos819/ncr-08" },
          { title: "Lesson 9 : Blockchain in Gaming", link: "https://hackmd.io/@doulos819/ncr-09" },
      ],
  },
  {
      title: "Module 4 : Advanced Research Topics ",
      description: "This module covers advanced research topics in blockchain, including cryptography and zero-knowledge proofs.",
      lessons: [
          { title: "Lesson 10 : Advanced Topics in Cryptography & Zero-Knowledge Proofs", link: "https://hackmd.io/@doulos819/ncr-10" },
      ],
  },
];

const student ={
  id:1,
  name: "Johnson",
  currentModule: 1,
  currentLesson: 1,
  progress:10,
  homework: {
      lesson1: {
          text: "Hi",
          link: "http://hi",
          document: "<---Hi---->"
      }
  }
}

// const getLessonNumber = (moduleIndex, lessonIndex) => {
//   let lessonNumber = 0;
//   for (let i = 0; i < moduleIndex; i++) {
//       lessonNumber += courseModules[i].lessons.length;
//   }
//   lessonNumber += lessonIndex + 1;
//   return lessonNumber;
// };

  
export default function CoursePage() {

    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState({
        moduleTitle: courseModules[0].title,
        lessonTitle: courseModules[0].lessons[0].title,
        description: courseModules[0].description,
        activities: "<div><br/>  <b>Activities Details :</b> <br/><br/> \
                    1. Tools for Data Retrieval <br/><br/>\
                    Introduction to nearblocks.io, focusing on its capabilities and applications in the context of NEAR Protocol. <br/><br/>\
                    2. CLI Calls to Public RPC <br/><br/>\
                    Hands-on session to guide participants through the process of making CLI calls to public RPC, illustrating how to retrieve and analyze data from the NEAR blockchain. <br/><br/>\
                    3. Guest Lecture by Didier (Pikespeak co-founder) <br/><br/>\
                    An in-depth discussion on how Pikespeak contributes to data retrieval on NEAR Protocol, showcasing specific use-cases and potential research applications. <br/><br/>\
                    4. Installing NEAR CLI <br/><br/>\
                    A brief walkthrough on how to install NEAR CLI, covering prerequisites and the installation process.</div>",
    });

    const updateSelectedLesson = (moduleIndex: number, lessonIndex: number) => {
      const theModule = courseModules[moduleIndex];
      const lesson = theModule.lessons[lessonIndex];
      setSelectedLesson({
        moduleTitle: theModule.title,
        lessonTitle: lesson.title,
        description: theModule.description,
        activities: "<div><br/>  <b>Activities Details :</b> <br/><br/> \
                      1. Tools for Data Retrieval <br/><br/>\
                      Introduction to nearblocks.io, focusing on its capabilities and applications in the context of NEAR Protocol. <br/><br/>\
                      2. CLI Calls to Public RPC <br/><br/>\
                      Hands-on session to guide participants through the process of making CLI calls to public RPC, illustrating how to retrieve and analyze data from the NEAR blockchain. <br/><br/>\
                      3. Guest Lecture by Didier (Pikespeak co-founder) <br/><br/>\
                      An in-depth discussion on how Pikespeak contributes to data retrieval on NEAR Protocol, showcasing specific use-cases and potential research applications. <br/><br/>\
                      4. Installing NEAR CLI <br/><br/>\
                      A brief walkthrough on how to install NEAR CLI, covering prerequisites and the installation process.</div>",
      });
      setCurrentModuleIndex(moduleIndex);
      setCurrentLessonIndex(lessonIndex);
    };
    

    useEffect(() => {
      updateSelectedLesson(currentModuleIndex, currentLessonIndex);
    }, [currentModuleIndex, currentLessonIndex]);

    const handleNextLesson = () => {
      const currentModule = courseModules[currentModuleIndex];
      if (currentLessonIndex < currentModule.lessons.length - 1) {
          setCurrentLessonIndex(currentLessonIndex + 1);
      } else if (currentModuleIndex < courseModules.length - 1) {
          setCurrentModuleIndex(currentModuleIndex + 1);
          setCurrentLessonIndex(0);
      }
    };

    const handlePreviousLesson = () => {
      if (currentLessonIndex > 0) {
          setCurrentLessonIndex(currentLessonIndex - 1);
      } else if (currentModuleIndex > 0) {
          setCurrentModuleIndex(currentModuleIndex - 1);
          setCurrentLessonIndex(courseModules[currentModuleIndex - 1].lessons.length - 1);
      }
    };

    const isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;
    const isLastLesson = currentModuleIndex === courseModules.length - 1 && currentLessonIndex === courseModules[currentModuleIndex].lessons.length - 1;

  return (
    <>
      <TopBar/>
      <Banner/>
      <div className="main-page">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hidden md:block w-full md:w-3/12 side-course">
            <CourseCard setSelectedLesson={setSelectedLesson} updateSelectedLesson={updateSelectedLesson}/>
          </div>
          <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
            <HomeworkSubmissionMobileMenu student={student} courseModules={courseModules} currentModuleIndex={currentModuleIndex} currentLessonIndex={currentLessonIndex}  />
            <Course 
              selectedLesson={selectedLesson}
              onNextLesson={handleNextLesson}
              onPreviousLesson={handlePreviousLesson}
              isFirstLesson={isFirstLesson}
              isLastLesson={isLastLesson} />
          </div>
        </div>
      </div>
    </>
  );
}
