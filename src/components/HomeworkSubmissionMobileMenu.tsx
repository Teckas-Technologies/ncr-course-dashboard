import { Menu, NotebookPenIcon } from "lucide-react";
import { Button } from "./ui/button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import HomeworkSubmissionForm from "./HomeworkSubmissionForm";
import { Module, Student } from "@/types/types";
import { useState } from "react";


interface HomeworkSubmissionMobileMenuProps {
    student: Student | null | undefined
    courseModules: Module[] | null;
    currentModuleIndex: number,
    currentLessonIndex: number
  }

export default function HomeworkSubmissionMobileMenu({ student, courseModules, currentModuleIndex, currentLessonIndex }: HomeworkSubmissionMobileMenuProps) {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isHomeworkCompleted =
    student &&
    student.homework.some(
      (hw) =>
        hw.moduleIndex === currentModuleIndex &&
        hw.lessonIndex === currentLessonIndex
    );

    const handleHomeworkSubmit = () => {
      setIsDialogOpen(false); 
    };

    return (
        <>
         <div className="facilitator-mobile-menu flex flex-row w-full justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild className="hamburger1">
                    <Button variant="outline" className="flex-row gap-2"><NotebookPenIcon /> <p>Home Work</p></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {isHomeworkCompleted ? (
                      <DialogHeader>
                        <DialogDescription>Homework Already Submitted for this lesson</DialogDescription>
                      </DialogHeader>
                    ):(
                      <div>
                        <DialogHeader>
                        <DialogTitle className="text-left">Submit Homework! {student?.id}</DialogTitle>
                        <h2 className="text-left py-1">{courseModules && courseModules[currentModuleIndex] ? courseModules[currentModuleIndex].lessons[currentLessonIndex]?.title || "" : ""}</h2>
                        <DialogDescription className="text-left py-1">
                            Submit your homework as may you like as text, link or document...
                        </DialogDescription>
                        </DialogHeader>
                        <HomeworkSubmissionForm
                            studentId={student ? student.id : ""}
                            studentCurrentModule={student ? student.currentModule : 0}
                            studentCurrentLesson={student ? student.currentLesson : 0}
                            studentProgress={student ? student.progress : 0}
                            currentModule={currentModuleIndex }
                            currentLesson={currentLessonIndex }
                            courseModules={courseModules}
                            handleHomeworkSubmit={handleHomeworkSubmit}
                        />
                      </div>
                    )}
                </DialogContent>
            </Dialog>
            
         </div>
        </>
    )

}