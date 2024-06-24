'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardHeader, CardTitle } from "./ui/card";
import '../app/style.css'
import Link from "next/link";
import { Notebook } from "lucide-react";
import { Module, Lesson, Student } from "@/types/types";

interface CourseModulesProps {
    courseModules: Module[] | null;
    student: Student;
}

export default function StudentCourseCard({courseModules, student}: CourseModulesProps) {

    return (
        <>
            <Card className="course-card">
                <CardHeader>
                    <CardTitle className="course-content"><Notebook />Course Content</CardTitle>
                </CardHeader>
                <Accordion type="single" collapsible>
                    {courseModules?.map((module: Module, moduleIndex: number) => {
                        if (moduleIndex <= student.currentModule) {
                            return (
                            <AccordionItem key={moduleIndex} value={`module-${moduleIndex + 1}`}>
                                <AccordionTrigger className="module-trigger">{module.title}</AccordionTrigger>
                                <AccordionContent>
                                    <Accordion type="single" collapsible>
                                        {module?.lessons.map((lesson: Lesson, lessonIndex: number) => {
                                                if (moduleIndex < student.currentModule || (moduleIndex === student.currentModule && lessonIndex <= student.currentLesson)) {
                                                    return (
                                                        <AccordionItem
                                                            key={lessonIndex}
                                                            value={`lesson-${moduleIndex + 1}-${lessonIndex + 1}`}>
                                                            <AccordionTrigger className="lesson-trigger">{lesson.title}</AccordionTrigger>
                                                            <AccordionContent className="lesson-content">
                                                                {student?.homework.map((studentLesson, i) => {
                                                                    if (studentLesson.moduleIndex === moduleIndex && studentLesson.lessonIndex === lessonIndex) {
                                                                        return (
                                                                            <div key={i}>
                                                                                {studentLesson.type === "text" ? (
                                                                                    <div className="homework-content">
                                                                                        <h2 className="font-bold py-2">Homework Content!</h2>
                                                                                        <p>{studentLesson.data}</p>
                                                                                    </div>
                                                                                ) : studentLesson.type === "link" ? (
                                                                                    <div className="py-2">
                                                                                        <Link href={studentLesson.data} className="text-primary">Click Here</Link> - to see the homework!
                                                                                    </div>
                                                                                ) : studentLesson.type === "document" ? (
                                                                                    <div className="py-2">
                                                                                        {studentLesson.data}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="py-2">
                                                                                        Progress...
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    );
                                                }
                                        })}
                                    </Accordion>
                                </AccordionContent>
                            </AccordionItem>
                            )}
                        })
                    }
                </Accordion>
            </Card>
        </>
    )
}