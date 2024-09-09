"use client";
import AddCourse from "@/components/AddCourse";
import Banner from "@/components/Banner";
import FacilitatorMenu from "@/components/FacilitatorMenu";
import FacilitatorMobileMenu from "@/components/FacilitatorMobileMenu";
import StudentsList from "@/components/StudentsList";
import TopBar from "@/components/TopBar";
import { useState, useEffect,useContext } from "react";
import { useFetchCourseModules } from "@/hook/CourseModuleHook";
import { NearContext } from "@/wallet/walletSelector";
import { useRouter } from "next/navigation";
import {
  useFetchStudents,
  useFetchStudentsPagination,
} from "@/hook/StudentHook";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/Loader";
import { adminId } from "../../../utils/Constant";

export default function FacilitatorPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageComponent, setPageComponent] = useState("Add Course Module");
  const { courseModules, error, loading } = useFetchCourseModules();
  const { studentList } = useFetchStudents();
  const router = useRouter();
  const { signedAccountId } = useContext(NearContext);
  const {
    studentListPagination,
    loading: studentLoading,
    error: studentError,
    totalPages,
    fetchStudents,
  } = useFetchStudentsPagination();
  const totalLessons = courseModules?.reduce(
    (total: number, theModule: any) => total + theModule.lessons.length,
    0
  );

  console.log("Course Modules From Page : ", courseModules);
  console.log("Students List From Page : ", studentList);
  console.log("pagination:", studentListPagination);

  // Fetch students on page or pageSize change
  useEffect(() => {
    fetchStudents(page, pageSize); // Pass current page and page size
  }, [page, pageSize]);
  useEffect(()=>{
   if(signedAccountId && adminId.includes(signedAccountId)){
     router.push("/facilitator");
   }else{
    router.push("/");
   }
  },[signedAccountId])
  return (
    <>
      <TopBar />
      <Banner
        totalModules={courseModules?.length}
        totalLessons={totalLessons}
      />
      <div className="main-page" id="target-section">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hidden md:block w-full md:w-3/12 side-course">
            <FacilitatorMenu setPageComponent={setPageComponent} />
          </div>
          <div className="w-full md:w-9/12 grid grid-cols-1 gap-4">
            <FacilitatorMobileMenu setPageComponent={setPageComponent} />
            {pageComponent === "Add Course Module" ? (
              courseModules?.length ? (
                <AddCourse courseModules={courseModules} />
              ) : (
                <div className="flex justify-center items-center mt-5 ">
                  <Loader />
                </div>
              )
            ) : pageComponent === "Student List" ? (
              courseModules?.length ? (
                <StudentsList
                  courseModules={courseModules}
                  studentList={studentListPagination}
                  totalPages={totalPages}
                  setPage={setPage}
                  page={page}
                />
              ) : (
                <div className="flex justify-center items-center mt-5 ">
                  <Loader />
                </div>
              )
            ) : courseModules?.length ? (
              <AddCourse courseModules={courseModules} />
            ) : (
              <div className="flex justify-center items-center mt-5 ">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
