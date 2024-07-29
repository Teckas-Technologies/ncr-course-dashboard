import Link from "next/link";
import { useState, useEffect } from "react";
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
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import StudentCourseCard from "./StudentCourseCard";
import { Module, Student } from "@/types/types";

interface StudentsListProps {
  courseModules: Module[] | null;
  studentList: Student[] | null;
  totalPages: number;
  setPage: (page: number) => void;
  page: number;
}

export default function StudentsList({
  courseModules,
  studentList,
  totalPages,
  setPage,
  page,
}: StudentsListProps) {
  const totalLessons = courseModules?.reduce(
    (total: number, theModule: any) => total + theModule.lessons.length,
    0
  );

  if (totalLessons) {
    studentList?.forEach((student) => {
      let completedLessons = student.homework.length;
      student.progress = Math.round((completedLessons / totalLessons) * 100);
    });
  }
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3; // Number of pages to show at once

    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push("ellipsis-end");
    }

    return pageNumbers;
  };

  const pageNumbers = renderPageNumbers();

  const scrollToSection = () => {
    const section = document.getElementById("target-section");
    if (section) {
      section.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };
  useEffect(() => {
    scrollToSection();
  }, [page]);
  return (
    <>
      <div className="student-list" id="student-list">
        <Card>
          <CardHeader>
            {studentList?.length && courseModules?.length ? (
              <CardTitle>Students List</CardTitle>
            ) : (
              <CardTitle>Empty List</CardTitle>
            )}
          </CardHeader>
          {studentList?.length && courseModules?.length && (
            <CardContent>
              <Table className="table">
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="table-header-dark"
                      style={{ width: "200px" }}
                    >
                      Account ID
                    </TableHead>
                    <TableHead
                      className="table-header-dark text-center"
                      style={{ width: "150px" }}
                    >
                      Current Module
                    </TableHead>
                    <TableHead
                      className="table-header-dark text-center"
                      style={{ width: "150px" }}
                    >
                      Current Lesson
                    </TableHead>
                    <TableHead
                      className="table-header-dark text-center"
                      style={{ width: "100px" }}
                    >
                      Progress (%)
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {studentList?.map((student, i) => (
                    <AlertDialog key={i}>
                      <AlertDialogTrigger asChild>
                        <TableRow className="student-table-row">
                          <TableCell className="table-cell-id">
                            <div className="text-ellipsis">{student.id}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            {student.currentModule + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            {student.currentLesson + 1}
                          </TableCell>
                          <TableCell className="text-center">
                            <Progress value={student.progress} />{" "}
                            {student.progress}%
                          </TableCell>
                        </TableRow>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-left">
                            {student.id}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-left flex flex-col gap-3">
                            <h2>
                              Current Module - {student.currentModule + 1}
                            </h2>
                            <h2>
                              Current Lesson - {student.currentLesson + 1}
                            </h2>
                            <div className="current-progress">
                              <Progress value={student.progress} />{" "}
                              {student.progress}%
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
                    <PaginationItem className="pagination-item">
                      <button
                        onClick={() => {
                          if (page > 1) {
                            handlePrevious();
                            scrollToSection();
                          }
                        }}
                        className={`pagination-link ${
                          page === 1 ? "disabled" : ""
                        }`}
                        disabled={page === 1}
                      >
                        Previous
                      </button>
                    </PaginationItem>
                    {pageNumbers.map((number, index) =>
                      number === "ellipsis-start" ||
                      number === "ellipsis-end" ? (
                        <PaginationItem key={index} className="pagination-item">
                          <span className="pagination-ellipsis">...</span>
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={index} className="pagination-item">
                          <button
                            className={`pagination-link ${
                              number === page ? "active" : ""
                            }`}
                            onClick={() => {
                              setPage(Number(number));
                              scrollToSection();
                            }}
                          >
                            {number}
                          </button>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem className="pagination-item">
                      <button
                        onClick={() => {
                          if (page < totalPages) {
                            handleNext();
                            scrollToSection();
                          }
                        }}
                        className={`pagination-link ${
                          page === totalPages ? "disabled" : ""
                        }`}
                        disabled={page === totalPages}
                      >
                        Next
                      </button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}
