'use client';
import AddCourse from "@/components/AddCourse";
import Banner from "@/components/Banner";
import FacilitatorMenu from "@/components/FacilitatorMenu";
import FacilitatorMobileMenu from "@/components/FacilitatorMobileMenu";
import StudentsList from "@/components/StudentsList";
import TopBar from "@/components/TopBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function FacilitatorPage() {

    const [pageComponent, setPageComponent] = useState("Add Course Module")

    return (
        <>
            <TopBar/>
            <Banner/>
            <div className="main-page">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="hidden md:block w-full md:w-3/12 side-course">
                        <FacilitatorMenu setPageComponent={setPageComponent}/>
                    </div>
                    <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
                    {/* {pathName === "/facilitator#student-list" ? <StudentsList /> : <AddCourse />} */}
                        <FacilitatorMobileMenu setPageComponent={setPageComponent}/>
                        {pageComponent === "Add Course Module" ? <AddCourse /> : 
                         pageComponent === "Student List" ? <StudentsList /> : <AddCourse />}
                    </div>
                </div>
            </div>
        </>
    )

}