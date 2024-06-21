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
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { number } from "zod";

interface Lesson {
    title: string;
    content: string;
  }
  
  interface Module {
    title: string;
    description: string;
    lessons: Lesson[];
  }
  

interface Student {
    id: number;
    name: string;
    currentModule: number;
    currentLesson: number;
    progress: number;
    homework: {
        lesson: number;
        text: string;
        link: string;
        document: any;
    }[];
}

interface CourseModulesProps {
    courseModules: Module[] | null;
    student: Student;
}
    


export default function StudentCourseCard({courseModules, student}: CourseModulesProps) {

    const getLessonNumber = (moduleIndex: number, lessonIndex: number) => {
       if(courseModules){
            let lessonNumber = 0;
            for (let i = 0; i < moduleIndex; i++) {
                lessonNumber += courseModules[i].lessons.length;
            }
            lessonNumber += lessonIndex + 1;
            return lessonNumber;
       }
    };

    const modulesToShow = student.currentModule;
    const lessonsToShow = student.currentLesson;

    
    return (
        <>
            <Card className="course-card">
                <CardHeader>
                    <CardTitle className="course-content"><Notebook />Course Content</CardTitle>
                </CardHeader>
                <Accordion type="single" collapsible>
                    {courseModules?.slice(0, modulesToShow).map((module: Module, moduleIndex: number) => (
                        <AccordionItem key={moduleIndex} value={`module-${moduleIndex + 1}`}>
                            <AccordionTrigger className="module-trigger">{module.title}</AccordionTrigger>
                            <AccordionContent>
                                <Accordion type="single" collapsible>
                                    {module?.lessons.map((lesson: Lesson, lessonIndex: number) => {
                                        const lessonNumber = getLessonNumber(moduleIndex, lessonIndex);
                                        if(lessonNumber){
                                            if (lessonNumber <= lessonsToShow) {
                                                return (
                                                    <AccordionItem
                                                        key={lessonIndex}
                                                        value={`lesson-${moduleIndex + 1}-${lessonIndex + 1}`}>
                                                        <AccordionTrigger className="lesson-trigger">{lesson.title}</AccordionTrigger>
                                                        <AccordionContent className="lesson-content">
                                                            {student?.homework.map((studentLesson, i) => {
                                                                if (studentLesson.lesson === lessonNumber) {
                                                                    return (
                                                                        <div key={i}>
                                                                            {studentLesson.text ? (
                                                                                <div className="homework-content">
                                                                                    <h2 className="font-bold py-2">Homework Content!</h2>
                                                                                    <p>{studentLesson.text}</p>
                                                                                </div>
                                                                            ) : studentLesson.link ? (
                                                                                <div className="py-2">
                                                                                    <Link href={studentLesson.link} className="text-primary">Click Here</Link> - to see the homework!
                                                                                </div>
                                                                            ) : studentLesson.document ? (
                                                                                <div className="py-2">
                                                                                    {studentLesson.document}
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
                                        }
                                        return null; 
                                    })}
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>
        </>
    )
}