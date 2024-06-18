'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardHeader, CardTitle } from "./ui/card";
import '../app/style.css'
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { Notebook, NotebookPenIcon } from "lucide-react";
import HomeworkSubmissionForm from "./HomeworkSubmissionForm";

interface Lesson {
    title: string;
    link: string;
  }
  
  interface Module {
    title: string;
    description: string;
    lessons: Lesson[];
  }
  
  interface SelectedLesson {
    moduleTitle: string;
    lessonTitle: string;
    description: string;
    activities: string;
  }
  
  
  interface CourseCardProps {
    setSelectedLesson: (lesson: SelectedLesson) => void;
    updateSelectedLesson: (moduleIndex: number, lessonIndex: number) => void;
  }


const courseModules: Module[] = [
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

export default function CourseCard({ setSelectedLesson, updateSelectedLesson }: CourseCardProps) {

    return (
        <>
        <Card className="course-card">
            <CardHeader>
                <CardTitle className="course-content"><Notebook/>Course Content</CardTitle>
            </CardHeader>
            <Accordion type="single" collapsible>
            {courseModules.map((module, moduleIndex) => (
                <AccordionItem key={moduleIndex} value={`module-${moduleIndex + 1}`}>
                    <AccordionTrigger className="module-trigger">{module.title}</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible>
                        {module.lessons.map((lesson, lessonIndex) => (
                            <AccordionItem 
                                key={lessonIndex} 
                                value={`lesson-${moduleIndex + 1}-${lessonIndex + 1}`} 
                                onClick={() => {
                                    updateSelectedLesson(moduleIndex, lessonIndex)
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
                                                A brief walkthrough on how to install NEAR CLI, covering prerequisites and the installation process.</div>"
                                })}}>
                                <AccordionTrigger className="lesson-trigger">{lesson.title}</AccordionTrigger>
                                <AccordionContent className="lesson-content">
                                    <Accordion type="single" collapsible>
                                        <Link href={"/course"} className="reference-link">Reference Link</Link>
                                        {/* <a href={lesson.link} className="reference-link"></a>  */}
                                        <AccordionItem value="homework-1">
                                            <AccordionTrigger className="homework-trigger"><NotebookPenIcon />Submit Homework</AccordionTrigger>
                                            <AccordionContent className="homework-content">
                                                        <HomeworkSubmissionForm
                                                            studentId={student.id}
                                                            studentName={student.name}
                                                            studentCurrentModule={student.currentModule}
                                                            studentCurrentLesson={student.currentModule}
                                                            studentProgress={student.progress}
                                                            currentModule={moduleIndex }
                                                            currentLesson={lessonIndex }
                                                            courseModules={courseModules}
                                                        />
                                                    </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </AccordionContent>
                            </AccordionItem>
                        ))}    
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>

        </Card>
        </>
    )
}