import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import StudentCourseCard from "./StudentCourseCard";
import { Module, Student } from "@/types/types";
  
interface StudentsListProps {
    courseModules: Module[] | null;
    studentList: Student[] | null;
}

export default function StudentsList({courseModules, studentList}: StudentsListProps ) {

    const totalLessons = courseModules?.reduce((total: number, theModule: any) => total + theModule.lessons.length, 0);

    if (totalLessons) {
        studentList?.forEach(student => {
            let completedLessons = student.homework.length;
            student.progress = Math.round((completedLessons / totalLessons) * 100);
        });
    }
    
    return (
        <>
        <div className="student-list" id="student-list">
            <Card>
                <CardHeader>
                    {studentList?.length && courseModules?.length ? <CardTitle>Students List</CardTitle> : <CardTitle>Empty List</CardTitle>}
                </CardHeader>
                {studentList?.length && courseModules?.length &&
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Account ID</TableHead>
                                <TableHead className="text-center">Current Module</TableHead>
                                <TableHead className="text-center">Current Lession</TableHead>
                                <TableHead className="text-center">Progress (%) </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentList?.map((student,i) => (
                                <AlertDialog key={i}>
                                    <AlertDialogTrigger asChild>
                                        <TableRow className="student-table-row">
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell className="text-center">{student.currentModule + 1}</TableCell>
                                            <TableCell className="text-center">{student.currentLesson + 1}</TableCell>
                                            <TableCell className="text-center"><Progress value={student.progress}/> {student.progress}%</TableCell>
                                        </TableRow>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent >
                                        <AlertDialogHeader>
                                        <AlertDialogTitle className="text-left">{student.id}</AlertDialogTitle>
                                        <AlertDialogDescription className="text-left flex flex-col gap-3">
                                            <h2>Current Module - {student.currentModule + 1}</h2>
                                            <h2>Current Lesson - {student.currentLesson + 1}</h2>
                                            <div className="current-progress">
                                                <Progress value={student.progress}/> {student.progress}%
                                            </div>

                                            <ScrollArea className="scroll w-full rounded-md border">
                                                <StudentCourseCard
                                                    courseModules={courseModules}
                                                    student={student}
                                                />
                                            </ScrollArea>
                                        </AlertDialogDescription>
                                        </AlertDialogHeader> 
                                        <AlertDialogFooter>
                                        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                                        <AlertDialogAction>Done</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="student-list-pagination pt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
                }
            </Card>
        </div>
        </>
    )
}