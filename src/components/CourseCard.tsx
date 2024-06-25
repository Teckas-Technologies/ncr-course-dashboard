'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardHeader, CardTitle } from "./ui/card";
import '../app/style.css'
import Link from "next/link";
import { Notebook, NotebookPenIcon } from "lucide-react";
import HomeworkSubmissionForm from "./HomeworkSubmissionForm";
import { Module, Student, SelectedLesson } from "@/types/types";
import { useState } from "react";
  
  interface CourseCardProps {
    setSelectedLesson: (lesson: SelectedLesson) => void;
    updateSelectedLesson: (moduleIndex: number, lessonIndex: number) => void;
    student: Student | null | undefined;
    courseModules: Module[] | null
  }

export default function CourseCard({ setSelectedLesson, updateSelectedLesson, student, courseModules }: CourseCardProps) {

    const totalLessons = courseModules?.reduce((total: number, theModule: any) => total + theModule.lessons.length, 0);
    let progress = 0;
    if (totalLessons) {
        let completedLessons: number = student?.homework.length || 0;
        progress = Math.round((completedLessons / totalLessons) * 100);
    }

    const [submittedHomework, setSubmittedHomework] = useState<{ [key: string]: boolean }>({});
    const handleHomeworkSubmit = (moduleIndex: number, lessonIndex: number) => {
        setSubmittedHomework((prev) => ({
            ...prev,
            [`${moduleIndex}-${lessonIndex}`]: true
        }));
    };

    return (
        <>
        {courseModules && 
        <Card className="course-card">
            <CardHeader>
                <CardTitle className="course-content"><Notebook/>Course Content</CardTitle>
            </CardHeader>
            <Accordion type="single" collapsible>
            {courseModules?.map((module, moduleIndex) => (
                <AccordionItem key={moduleIndex} value={`module-${moduleIndex + 1}`}>
                    <AccordionTrigger className="module-trigger">{module.title}</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible>
                        {module.lessons.map((lesson, lessonIndex) => {
                            const isHomeworkCompleted =
                            student &&
                            student.homework.some(
                              (hw) =>
                                hw.moduleIndex === moduleIndex &&
                                hw.lessonIndex === lessonIndex
                            );

                            const homeworkKey = `${moduleIndex}-${lessonIndex}`;
                            const isSubmitted = submittedHomework[homeworkKey];

                            return (
                            <AccordionItem 
                                key={lessonIndex} 
                                value={`lesson-${moduleIndex + 1}-${lessonIndex + 1}`} 
                                onClick={() => {
                                    updateSelectedLesson(moduleIndex, lessonIndex)
                                    setSelectedLesson({
                                    moduleTitle: module.title,
                                    lessonTitle: lesson.title,
                                    description: module.description,
                                    content: lesson.content
                                })}}>
                                <AccordionTrigger className="lesson-trigger">{lesson.title}</AccordionTrigger>
                                <AccordionContent className="lesson-content">
                                    <Accordion type="single" collapsible>
                                        <Link href={"/course"} className="reference-link">Start Learning</Link>
                                        {student && (isHomeworkCompleted || isSubmitted) ? (
                                            <h2 className="pt-4">Homework Already Submitted!</h2>
                                        ) : (
                                        <div>
                                            <AccordionItem value="homework-1">
                                                <AccordionTrigger className="homework-trigger"><NotebookPenIcon />Submit Homework</AccordionTrigger>
                                                <AccordionContent className="homework-content">
                                                    <HomeworkSubmissionForm
                                                        studentId={student ? student.id : ""}
                                                        studentCurrentModule={student ? student.currentModule : 0}
                                                        studentCurrentLesson={student ? student.currentModule : 0}
                                                        studentProgress={progress}
                                                        currentModule={moduleIndex }
                                                        currentLesson={lessonIndex }
                                                        courseModules={courseModules}
                                                        handleHomeworkSubmit={() => handleHomeworkSubmit(moduleIndex, lessonIndex)}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>
                                        )}
                                    </Accordion>
                                </AccordionContent>
                            </AccordionItem>
                        )})}    
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>

        </Card>
        }
        </>
    )
}