'use client';
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PlusCircleIcon } from "lucide-react";
import TipTap from "./TipTap";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useSaveCourseModule } from "@/hook/CourseModuleHook";

interface Lesson {
    title: string;
    content:string;
}
  
interface Module {
    title: string;
    description: string;
    lessons: Lesson[];
}

interface AddCourseProps {
    courseModules: Module[] | null;
    // students: Student[];
}


export default function AddCourse({ courseModules } : AddCourseProps) {

    const [selectedModule, setSelectedModule] = useState("");
    const [selectedLessonTitle, setSelectedLessonTitle] = useState("");
    const [newModule, setNewModule] = useState("");
    const [newModuleDes, setNewModuleDes] = useState("");
    const [newLesson, setNewLesson] = useState("");
    const [modules, setModules] = useState<Module[]>([]);
    const { toast } = useToast();
    const { saveCourseModule, loading, error } = useSaveCourseModule();

    console.log("Course Modules From Add course Page : ", courseModules)

    const formSchema = z.object({
        module: z.string().min(5, { message: "Hey the module is not long enough!" }).trim(),
        lesson: z.string().min(5, { message: "Hey the lesson is not long enough!" }).trim(),
        content: z.string().min(10, { message: "Hey the content is not long enough!" }).trim(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            module: "",
            lesson: "",
            content: ""
        }
    });

    useEffect(() => {
        if (selectedModule) {
            form.setValue('module', selectedModule);
        }
    }, [selectedModule]);

    useEffect(() => {
        if (courseModules && courseModules.length) {
            setModules(courseModules);
        }
    }, [courseModules]);

    useEffect(() => {
        if (selectedLessonTitle) {
            form.setValue('lesson', selectedLessonTitle);
            const selectedLesson = modules?.find(module => module.title === selectedModule)?.lessons.find(lesson => lesson.title === selectedLessonTitle);
            if (selectedLesson) {
                form.setValue('content', selectedLesson.content);
            }
        }
    }, [selectedLessonTitle]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        const submittedValues = {
            module: values.module,
            lesson: values.lesson,
            content: values.content
        };

        console.log("Submitted Course Module :", submittedValues);
        if (submittedValues) {
            // const theLesson: Lesson[] = [
            //     { title: submittedValues.lesson, content: submittedValues.content },
            // ]
            const theModule: Module = {
                title: submittedValues.module,
                description: newModuleDes,
                lessons: [
                    { title: submittedValues.lesson, content: submittedValues.content },
                ]
            };
            saveCourseModule(theModule)
                .then((res) => {
                    toast({
                        title: "Course Lesson Added Successfully!",
                        description: JSON.stringify(submittedValues)
                    });
                    setSelectedModule("");
                    setSelectedLessonTitle("");
                    form.setValue("module", "")
                    form.setValue("lesson", "")
                    form.setValue("content", "")
                })
                .catch(err => {
                    toast({
                        title: "Error Adding Course Lesson",
                        description: err.message
                    });
                });
        } else {
            console.log("Error", error)
        }
    }

    const addModule = () => {
        if (newModule) {
            const newModuleObject = { title: newModule, description: newModuleDes, lessons: [] };
            setModules(modules ? [...modules, newModuleObject] : [newModuleObject]);
            toast({
                title: `${newModule} has been added successfully!`,
                description: `Please select or add your lesson!`,
            })
            setNewModule("");
        }
    };

    const addLesson = () => {
        if (newLesson && selectedModule) {
            const updatedModules = modules?.map(module => {
                if (module.title === selectedModule) {
                    return { ...module, lessons: [...module.lessons, { title: newLesson, content: "" }] };
                }
                return module;
            });
            setModules(updatedModules || []);
            toast({
                title: `${newLesson} has been added successfully!`,
                description: `Please add or edit the lesson content!`,
            })
            setNewLesson("");
        }
    };


    return (
        <>
        <div className="add-course">
            <Card>
                <CardHeader>
                    <CardTitle>Add Course Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="module-form grid grid-cols-2 gap-4 pb-4">
                                <div className="module-selector">
                                    <FormField
                                        control={form.control}
                                        name="module"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Module</FormLabel>
                                                <Select onValueChange={value => setSelectedModule(value)} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a module" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {modules?.map((module, i) => (
                                                            <SelectItem key={i} value={module.title}>{module.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>
                                <div className="new-module">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="flex-row items-center gap-3 mt-8 hover:bg-white bg-white" variant="outline">
                                                <PlusCircleIcon className="text-black" /> <h2 className="text-black">Add New Module</h2>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Add your new module</AlertDialogTitle>
                                                <FormItem className="py-2">
                                                    <FormLabel>Module Title</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Enter module name here..." value={newModule} onChange={(e) => setNewModule(e.target.value)} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                                <FormItem className="py-2">
                                                    <FormLabel>Module Description</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Enter module description here..." value={newModuleDes} onChange={(e) => setNewModuleDes(e.target.value)} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction disabled={!newModule} onClick={addModule}>Add Module</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            {selectedModule && (
                                <div className="lesson-form grid grid-cols-2 gap-4 pb-4">
                                    <FormField
                                        control={form.control}
                                        name="lesson"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lesson</FormLabel>
                                                <Select onValueChange={value => setSelectedLessonTitle(value)} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a lesson" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {modules?.find(module => module.title === selectedModule)?.lessons.map((lesson, i) => (
                                                            <SelectItem key={i} value={lesson.title}>{lesson.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="new-lesson">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className="flex-row items-center gap-3 mt-8 hover:bg-white bg-white" variant="outline" disabled={!selectedModule}>
                                                    <PlusCircleIcon className="text-black" /> <h2 className="text-black">Add New Lesson</h2>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Add your new lesson</AlertDialogTitle>
                                                    <FormItem className="py-2">
                                                        <FormLabel>Lesson Title</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" placeholder="Enter lesson name here..." value={newLesson} onChange={(e) => setNewLesson(e.target.value)} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction disabled={!newLesson} onClick={addLesson}>Add Lesson</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            )}
                            
                            <FormField
                                control={form.control}
                                name="content"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <TipTap content={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <FormMessage/>
                                        {/* <h1>{field.value}</h1> */}
                                    </FormItem>
                                )} 
                            />
                            <div className="facilitator-add-btn">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        </>
    )
}