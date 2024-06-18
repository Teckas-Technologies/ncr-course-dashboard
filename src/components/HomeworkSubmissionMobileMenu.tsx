import { Menu, NotebookPenIcon } from "lucide-react";
import { Button } from "./ui/button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import HomeworkSubmissionForm from "./HomeworkSubmissionForm";

interface HomeworkSubmissionMobileMenuProps {
    student: {
      id: number;
      name: string;
      currentModule: number;
      currentLesson: number;
      progress: number;
      homework: {
        lesson1: {
          text: string;
          link: string;
          document: string;
        };
      };
    },
    courseModules: {
        title: string;
        lessons: {
          title: string;
          link: string;
        }[];
      }[],
    currentModuleIndex: number,
    currentLessonIndex: number
  }



export default function HomeworkSubmissionMobileMenu({ student, courseModules, currentModuleIndex, currentLessonIndex }: HomeworkSubmissionMobileMenuProps) {

    return (
        <>
         <div className="facilitator-mobile-menu flex flex-row w-full justify-end">
            <Dialog>
                <DialogTrigger asChild className="hamburger1">
                    <Button variant="outline" className="flex-row gap-2"><NotebookPenIcon /> <p>Home Work</p></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle className="text-left">Submit Homework!</DialogTitle>
                    <h2 className="text-left py-1">{courseModules[currentModuleIndex].lessons[currentLessonIndex].title}</h2>
                    <DialogDescription className="text-left py-1">
                        Submit your homework as may you like as text, link or document...
                    </DialogDescription>
                    </DialogHeader>
                    <HomeworkSubmissionForm
                        studentId={student.id}
                        studentName={student.name}
                        studentCurrentModule={student.currentModule}
                        studentCurrentLesson={student.currentLesson}
                        studentProgress={student.progress}
                        currentModule={currentModuleIndex }
                        currentLesson={currentLessonIndex }
                        courseModules={courseModules}
                    />
                    {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Name
                        </Label>
                        <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Username
                        </Label>
                        <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                        />
                    </div>
                    </div> */}
                    {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
            
         </div>
        </>
    )

}