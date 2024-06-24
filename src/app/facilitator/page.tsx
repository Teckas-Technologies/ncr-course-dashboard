'use client';
import AddCourse from "@/components/AddCourse";
import Banner from "@/components/Banner";
import FacilitatorMenu from "@/components/FacilitatorMenu";
import FacilitatorMobileMenu from "@/components/FacilitatorMobileMenu";
import StudentsList from "@/components/StudentsList";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import { useFetchCourseModules } from "@/hook/CourseModuleHook";
import { useFetchStudents } from "@/hook/StudentHook";

export default function FacilitatorPage() {

    const [pageComponent, setPageComponent] = useState("Add Course Module")
    const { courseModules, error, loading } = useFetchCourseModules();
    const { studentList } = useFetchStudents();
    const totalLessons = courseModules?.reduce((total: number, theModule: any) => total + theModule.lessons.length, 0);

    console.log("Course Modules From Page : ", courseModules)
    console.log("Students List From Page : ", studentList)

    return (
        <>
            <TopBar/>
            <Banner totalModules={courseModules?.length} totalLessons={totalLessons} />
            <div className="main-page">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="hidden md:block w-full md:w-3/12 side-course">
                        <FacilitatorMenu setPageComponent={setPageComponent}/>
                    </div>
                    <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
                        <FacilitatorMobileMenu setPageComponent={setPageComponent} />
                        {pageComponent === "Add Course Module" ? (
                            <AddCourse courseModules={courseModules} />
                        ) : pageComponent === "Student List" ? (
                            <StudentsList courseModules={courseModules} studentList={studentList} />
                        ) : (
                            <AddCourse courseModules={courseModules} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )

}