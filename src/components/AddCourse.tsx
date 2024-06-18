'use client';
import React, { useState } from "react"
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


export default function AddCourse() {

    const [newModule, setNewModule] = useState("");
    const [modules, setModules] = useState([
        "Module 1",
        "Module 2",
        "Module 3"
    ]);

    const { toast } = useToast();

    const formSchema = z.object({
        module : z.string().min(5, {message: "Hey the module is not long enough!"}).trim(),
        lesson : z.string().min(5, {message: "Hey the lesson is not long enough!"}).trim(),
        content: z.string().min(10, {message: "Hey the content is not long enough!"}).trim(),
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            module: "",
            lesson: "",
            content: ""

        }
    });

    function onSubmit(values: z.infer<typeof formSchema> ) {
        const submittedValues = {
            module: values.module,
            lesson: values.lesson,
            content: values.content
        }

        console.log("Submitted Course Module :",submittedValues)
        if(submittedValues) {
            toast({
                title: "Course Lesson Added Successfully!",
                description: JSON.stringify(submittedValues)
            })
        }
    }

    const addModule = () => {
        if(newModule) {
            setModules([...modules, newModule]);
            console.log("Updated Modules", modules);
            setNewModule("");
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a module" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {modules.map((module, i)=> (
                                                            <SelectItem key={i} value={module}>{module}</SelectItem>
                                                        ))}                                      
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )} 
                                    />
                                </div>
                                <div className="new-module">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="flex-row items-center gap-3 mt-8 hover:bg-white bg-white" variant="outline">
                                                <PlusCircleIcon className="text-black" /> <h2 className="text-black">Add New</h2>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Add your new module</AlertDialogTitle>
                                                <FormItem className="py-2">
                                                    <FormLabel>Module Title</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Enter module name here..." value={newModule} onChange={(e) => setNewModule(e.target.value) } />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={addModule}>Add Module</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            <div className="lesson-form pb-4">
                                <FormField
                                    control={form.control}
                                    name="lesson"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Lesson</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Leave the lesson title here..." {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} 
                                />
                            </div>
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