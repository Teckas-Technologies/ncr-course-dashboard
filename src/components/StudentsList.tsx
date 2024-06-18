import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const studentList = [
    {
        id: 1,
        name: "Johnson",
        currentModule: 2,
        currentLesson: 3,
        progress: 30,
        homework: [
            {
                lesson: 1,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 2,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 3,
                text: "",
                link: "http://link",
                document: ""
            }
        ]
    },
    {
        id: 2,
        name: "Sathish",
        currentModule: 3,
        currentLesson: 5,
        progress: 50,
        homework: [
            {
                lesson: 1,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 2,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 3,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 4,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 5,
                text: "",
                link: "http://link",
                document: ""
            }
        ]
    },
    {
        id: 3,
        name: "Sharmila",
        currentModule: 3,
        currentLesson: 8,
        progress: 80,
        homework: [
            {
                lesson: 1,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 2,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 3,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 4,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 5,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 6,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 7,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 8,
                text: "",
                link: "http://link",
                document: ""
            }
        ]
    },
    {
        id: 4,
        name: "Johnson2",
        currentModule: 2,
        currentLesson: 4,
        progress: 40,
        homework: [
            {
                lesson: 1,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 2,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 3,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 4,
                text: "Text Submission",
                link: "",
                document: ""
            }
        ]
    },
    {
        id: 5,
        name: "Johnson2",
        currentModule: 3,
        currentLesson: 9,
        progress: 90,
        homework: [
            {
                lesson: 1,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 2,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 3,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 4,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 5,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 6,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 7,
                text: "Text Submission",
                link: "",
                document: ""
            },
            {
                lesson: 8,
                text: "",
                link: "http://link",
                document: ""
            },
            {
                lesson: 9,
                text: "Text Submission",
                link: "",
                document: ""
            }
        ]
    }
];

export default function StudentsList() {
    return (
        <>
        <div className="student-list" id="student-list">
            <Card>
                <CardHeader>
                    <CardTitle>Students List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-center">Current Module</TableHead>
                                <TableHead className="text-center">Current Lession</TableHead>
                                <TableHead className="text-center">Progress (%) </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentList.map((student,i) => (
                                <AlertDialog key={i}>
                                    <AlertDialogTrigger asChild>
                                        <TableRow className="student-table-row">
                                            <TableCell>{student.id}</TableCell>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell className="text-center">{student.currentModule}</TableCell>
                                            <TableCell className="text-center">{student.currentLesson}</TableCell>
                                            <TableCell className="text-center"><Progress value={student.progress}/> {student.progress}%</TableCell>
                                        </TableRow>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent >
                                        <AlertDialogHeader>
                                        <AlertDialogTitle className="text-left">{student.name}</AlertDialogTitle>
                                        <AlertDialogDescription className="text-left flex flex-col gap-3">
                                            <h2>Current Module - {student.currentModule}</h2>
                                            <h2>Current Lesson - {student.currentLesson}</h2>
                                            <div className="current-progress">
                                                <Progress value={student.progress}/> {student.progress}%
                                            </div>
                                            <ScrollArea className="scroll w-full rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="text-center">S.No</TableHead>
                                                        <TableHead className="text-center">Module</TableHead>
                                                        <TableHead className="text-center">Lesson</TableHead>
                                                        <TableHead className="text-center">Homework</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {student.homework.map((lesson, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="text-center">{lesson.lesson}</TableCell>
                                                            <TableCell className="font-medium text-center">{student.currentModule}</TableCell>
                                                            <TableCell className="text-center">{lesson.lesson}</TableCell>
                                                            <TableCell className="text-center">{lesson.text ? lesson.text : lesson.link ? lesson.link : lesson.document}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
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
            </Card>
        </div>
        </>
    )
}