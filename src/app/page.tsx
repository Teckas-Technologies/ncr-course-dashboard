'use client';
import Banner from "@/components/Banner";
import CourseCard from "@/components/CourseCard";
import TopBar from "@/components/TopBar";
import WelcomeCard from "@/components/WelcomeCard";
import CourseOverview from "@/components/CourseOverview";
import ProgressComp from "@/components/Progress";
import SocialMedia from "@/components/SocialMedia"
import { useEffect, useState } from "react";


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


export default function Home() {

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
    const module = courseModules[moduleIndex];
    const lesson = module.lessons[lessonIndex];
    setSelectedLesson({
      moduleTitle: module.title,
      lessonTitle: lesson.title,
      description: module.description,
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


  return (
    <>
      <TopBar/>
      <Banner/>
      <div className="main-page">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hidden md:block w-full md:w-3/12">
            <ProgressComp />
            <SocialMedia />
          </div>
          <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
            <CourseOverview />
            <CourseCard setSelectedLesson={setSelectedLesson} updateSelectedLesson={updateSelectedLesson}/>
          </div>
        </div>
      </div>
    </>
  );
}
