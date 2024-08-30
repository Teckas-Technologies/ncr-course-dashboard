"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusCircleIcon } from "lucide-react";
import TipTap from "./TipTap";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useSaveCourseModule } from "@/hook/CourseModuleHook";
import { Skeleton } from "./ui/skeleton";

interface Lesson {
  title: string;
  content: string;
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

export default function AddCourse({ courseModules }: AddCourseProps) {
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedLessonTitle, setSelectedLessonTitle] = useState("");
  const [newModule, setNewModule] = useState("");
  const [newModuleDes, setNewModuleDes] = useState("");
  const [newLesson, setNewLesson] = useState("");
  const [newly, setNewly] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const { toast } = useToast();
  const { saveCourseModule, loading, error } = useSaveCourseModule();
  const [previousContent, setPreviousContent] = useState("");
  const [isExistingLesson, setIsExistingLesson] = useState(false);
  const [contentValue, setContentValue] = useState("");
  const [disableEdit, setDisableEdit] = useState(false);
  const [editable, setEditable] = useState(false);
  const [disableButtonEdit, setDisableButtonEdit] = useState(false);

  const formSchema = z.object({
    module: z.string().trim(),
    lesson: z.string().trim(),
    content: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      module: "",
      lesson: "",
      content: "",
    },
  });

  useEffect(() => {
    if (selectedModule) {
      form.setValue("module", selectedModule);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (courseModules && courseModules.length) {
      setModules(courseModules);
    }
  }, [courseModules]);

  const lesson = form.getValues("lesson"); // hold the current value of the lesson field

  useEffect(() => {
    const existingLesson = Boolean(
      selectedLessonTitle &&
        courseModules
          ?.find((module) => module.title === selectedModule)
          ?.lessons.find((lesson) => lesson.title === selectedLessonTitle)
    );
    const isNewLesson = !isExistingLesson;
    console.log("Existing 1: ", existingLesson, isExistingLesson);
    if (existingLesson) {
      setIsExistingLesson(true);
      console.log("setisexisting lesson ------------:", isExistingLesson); //---->XXX
      console.log("Existing2 : ", existingLesson, isExistingLesson);
    } else {
      setIsExistingLesson(false);
      console.log("Existing3 : ", existingLesson, isExistingLesson);
    }
  }, [courseModules, selectedLessonTitle, newLesson, lesson]);

  useEffect(() => {
    if (selectedLessonTitle) {
      form.setValue("lesson", selectedLessonTitle);
      const selectedLesson = modules
        ?.find((module) => module.title === selectedModule)
        ?.lessons.find((lesson) => lesson.title === selectedLessonTitle);
      if (selectedLesson) {
        form.setValue("content", selectedLesson.content);
      }
    }
  }, [selectedLessonTitle]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submittedValues = {
      module: values.module,
      lesson: values.lesson,
      content: values.content,
    };

    console.log("Submitted Course Module :", submittedValues);
    if (submittedValues) {
      const theModule: Module = {
        title: submittedValues.module,
        description: newModuleDes,
        lessons: [
          { title: submittedValues.lesson, content: submittedValues.content },
        ],
      };
      saveCourseModule(theModule)
        .then((res) => {
          if (isExistingLesson) {
            toast({
              title: "Course Lesson Updated Successfully!",
              description: submittedValues.lesson,
            });
          } else {
            toast({
              title: "Course Lesson Added Successfully!",
              description: submittedValues.lesson,
            });
          }

          setSelectedModule("");
          setSelectedLessonTitle("");
          form.setValue("module", "");
          form.setValue("lesson", "");
          form.setValue("content", "");
        })
        .catch((err) => {
          toast({
            title: "Error Adding Course Lesson",
            description: err.message,
          });
        });
    } else {
      console.log("Error", error);
    }
  }
  console.log("Select", selectedModule);
  useEffect(() => {
    if (selectedModule) {
      setSelectedLessonTitle("");
      form.setValue("lesson", "");
      form.setValue("content", "");
      setContentValue("");
    }
  }, [selectedModule]);

  const addModule = () => {
    if (newModule) {
      const newModuleObject = {
        title: newModule,
        description: newModuleDes,
        lessons: [],
      };
      setModules(modules ? [...modules, newModuleObject] : [newModuleObject]);
      setSelectedModule(newModule);
      toast({
        title: `${newModule} has been added successfully!`,
        description: `Please select or add your lesson!`,
      });
      setNewModule("");
    }
  };

  const addLesson = () => {
    if (newLesson && selectedModule) {
      const updatedModules = modules?.map((module) => {
        if (module.title === selectedModule) {
          setNewly([...newly, newLesson]);
          return {
            ...module,
            lessons: [...module.lessons, { title: newLesson, content: "" }],
          };
        }
        return module;
      });
      setModules(updatedModules || []);
      toast({
        title: `${newLesson} has been added successfully!`,
        description: `Please add or edit the lesson content!`,
      });
      setNewLesson("");
    }
  };

  const isContentValid = stripHtmlTags(contentValue).length > 0;

  const isNewLesson =
    selectedModule &&
    newly.includes(selectedLessonTitle) &&
    isContentValid &&
    !isExistingLesson;
  console.log("isNewLesson", isNewLesson);
  const isExistingLessonValid =
    selectedModule &&
    selectedLessonTitle &&
    isContentValid &&
    isExistingLesson &&
    editable;
 
  console.log("editable >>", editable);

  const isFormFilled = (isNewLesson && editable) || isExistingLessonValid;

  useEffect(() => {
    if (selectedLessonTitle && isExistingLesson) {
      setDisableEdit(!disableEdit);
    }
    if (selectedLessonTitle && !isExistingLesson) {
      setDisableEdit(false);
    }
    if (selectedLessonTitle && newly.includes(selectedLessonTitle)) {
      setContentValue("");
    }
  }, [selectedLessonTitle, setSelectedLessonTitle, isExistingLesson]);

  function stripHtmlTags(content: string): string {
    return content
      .replace(/<p><\/p>/g, "")
      .replace(/<strong><\/strong>/g, "")
      .replace(/<h2 class="text-xl font-bold" levels="2"><\/h2>/g, "")
      .replace(/<em><\/em>/g, "")
      .replace(/<s><\/s>/g, "")
      .replace(/<ul class="list-disc pl-4"><\/ul>/g, "")
      .replace(/<li><\/li>/g, "")
      .replace(/<ol class="list-decimal pl-4"><\/ol>/g, "")
      .replace(
        /<pre class="bg-stone-800 text-white p-2 rounded-lg mx-2 my-2"><\/pre>/g,
        ""
      )
      .replace(/<code><\/code>/g, "")
      .replace(
        /<a target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline" href=""><\/a>/g,
        ""
      )
      .replace(
        /<table class="border border-collapse px-3 py-1 w-full overflow-scroll" style="minWidth: 100px"><colgroup><col><\/col><col><\/col><col><\/col><col><\/col><\/colgroup><tbody><tr class="border border-collapse px-3 py-1"><th class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/th><th class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/th><th class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/th><th class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/th><\/tr><tr class="border border-collapse px-3 py-1"><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><\/tr><tr class="border border-collapse px-3 py-1"><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><td class="border border-collapse px-3 py-1" colspan="1" rowspan="1"><p><\/p><\/td><\/tr><\/tbody><\/table>/g,
        ""
      )
      .trim();
  }

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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module</FormLabel>
                          <Select
                            // onValueChange={(value) => setSelectedModule(value)}
                            // defaultValue={field.value}
                            onValueChange={(value) => {
                              setSelectedModule(value);
                              setSelectedLessonTitle("");
                              form.setValue("module", value); // Ensure form value is updated
                            }}
                            value={field.value} // Ensure dropdown value is set
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a module" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {modules
                                ? modules?.map((module, i) => (
                                    <SelectItem key={i} value={module.title}>
                                      {module.title}
                                    </SelectItem>
                                  ))
                                : "Module Not Found!"}
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
                        <Button
                          className="flex-row items-center gap-3 mt-8 hover:bg-white bg-white"
                          variant="outline"
                        >
                          <PlusCircleIcon className="text-black" />{" "}
                          <h2 className="text-black">Add New Module</h2>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Add your new module
                          </AlertDialogTitle>
                          <FormItem className="py-2">
                            <FormLabel>Module Title</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter module name here..."
                                value={newModule}
                                onChange={(e) => setNewModule(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          <FormItem className="py-2">
                            <FormLabel>Module Description</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter module description here..."
                                value={newModuleDes}
                                onChange={(e) =>
                                  setNewModuleDes(e.target.value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={!newModule}
                            onClick={addModule}
                          >
                            Add Module
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {selectedModule && (
                  <div className="lesson-form grid grid-cols-2 gap-4 pb-4">
                    <div className="select-lesson">
                      <FormField
                        control={form.control}
                        name="lesson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lesson</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                setSelectedLessonTitle(value);
                                field.onChange(value);
                              }}
                              value={selectedLessonTitle}
                              defaultValue={selectedLessonTitle}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a lesson" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {modules
                                  ?.find(
                                    (module) => module.title === selectedModule
                                  )
                                  ?.lessons.map((lesson, i) => (
                                    <SelectItem key={i} value={lesson.title}>
                                      {lesson.title}
                                    </SelectItem>
                                  ))}
                                {selectedModule &&
                                  modules.find(
                                    (module) => module.title === selectedModule
                                  )?.lessons.length === 0 && (
                                    <SelectItem
                                      key="empty"
                                      value="no-lessons"
                                      disabled
                                    >
                                      No lessons available
                                    </SelectItem>
                                  )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="new-lesson">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="flex-row items-center gap-3 mt-8 hover:bg-white bg-white"
                            variant="outline"
                            disabled={!selectedModule}
                          >
                            <PlusCircleIcon className="text-black" />{" "}
                            <h2 className="text-black">Add New Lesson</h2>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Add your new lesson
                            </AlertDialogTitle>
                            <FormItem className="py-2">
                              <FormLabel>Lesson Title</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter lesson name here..."
                                  value={newLesson}
                                  onChange={(e) => setNewLesson(e.target.value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              disabled={!newLesson}
                              onClick={addLesson}
                            >
                              Add Lesson
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl className="overflow-scroll">
                        <TipTap
                          content={field.value}
                          onChange={(value) => {
                            field.onChange(value); // Update form state
                            setContentValue(value); // Update local state
                          }}
                          disabled={isExistingLesson} // disabled(prop name){boolean value of the isExisting lesson}
                          disableEdit={disableEdit}
                          setIsEditable={setEditable}
                        />
                      </FormControl>
                      {/* <h1>{field.value}</h1> */}
                    </FormItem>
                  )}
                />
                <div className="facilitator-add-btn">
                  <Button
                    type="submit"
                    disabled={!isFormFilled}
                    className={!isFormFilled ? "disabled" : ""}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
