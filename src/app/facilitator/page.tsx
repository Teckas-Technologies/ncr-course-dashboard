'use client';
import AddCourse from "@/components/AddCourse";
import Banner from "@/components/Banner";
import FacilitatorMenu from "@/components/FacilitatorMenu";
import FacilitatorMobileMenu from "@/components/FacilitatorMobileMenu";
import StudentsList from "@/components/StudentsList";
import TopBar from "@/components/TopBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const courseModules = [
    {
        title: "Module 1 : Introduction to Blockchain and NEAR Protocol",
        description: "This module covers the fundamental concepts of blockchain technology and introduces the NEAR Protocol.",
        lessons: [
            { title: "Lesson 1 : Introduction to Blockchain and NEAR Protocol", link: "https://hackmd.io/@doulos819/ncr-01" },
            { title: "Lesson 2 : Data Retrieval and Analysis", link: "https://hackmd.io/@doulos819/ncr-02" },
        ],
    },
    {
        title: "Module 2 : Data Transformation and Visualization",
        description: "This module focuses on techniques for transforming and visualizing data.",
        lessons: [
            { title: "Lesson 3 : Data Transformation and Visualization", link: "https://hackmd.io/@doulos819/ncr-03" },
            { title: "Lesson 4 : Advanced Data Evaluation Methods", link: "https://hackmd.io/@doulos819/ncr-04" },
        ],
    },
    {
        title: "Module 3 : Specialized Topics in Blockchain",
        description: "This module explores specialized topics in blockchain, including governance, decentralized finance, non-fungible tokens, and blockchain in gaming.",
        lessons: [
            { title: "Lesson 5 : Research Topic Identification", link: "https://hackmd.io/@doulos819/ncr-05" },
            { title: "Lesson 6 : Governance in Blockchain", link: "https://hackmd.io/@doulos819/ncr-06" },
            { title: "Lesson 7 : Decentralized Finance (DeFi)", link: "https://hackmd.io/@doulos819/ncr-07" },
            { title: "Lesson 8 : Non-Fungible Tokens (NFTs)", link: "https://hackmd.io/@doulos819/ncr-08" },
            { title: "Lesson 9 : Blockchain in Gaming", link: "https://hackmd.io/@doulos819/ncr-09" },
        ],
    },
    {
        title: "Module 4 : Advanced Research Topics ",
        description: "This module covers advanced research topics in blockchain, including cryptography and zero-knowledge proofs.",
        lessons: [
            { title: "Lesson 10 : Advanced Topics in Cryptography & Zero-Knowledge Proofs", link: "https://hackmd.io/@doulos819/ncr-10" },
        ],
    },
  ];


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
                         pageComponent === "Student List" ? <StudentsList courseModules={courseModules} /> : <AddCourse />}
                    </div>
                </div>
            </div>
        </>
    )

}