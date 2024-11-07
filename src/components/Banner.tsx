import { Card } from "./ui/card";
import '../app/style.css'
import { Code, Notebook, NotebookIcon, NotebookPenIcon } from "lucide-react";
import WelcomeCard from "./WelcomeCard";


export default function Banner({ totalModules, totalLessons }: any) {
    return (
        <>
            <div className="banner">
                <div className="banner-content">
                    <br />
                    <h2 className="md:text-lg text-md md:font-bold font-normal md:leading-normal">Understand The Fundamentals of<br />Blockchain, Web3, and NEAR Protocol</h2>
                    <br />
                    <div className="analytics">
                        <div className="analytics-grp">
                            <NotebookIcon className="analytics-icon" /> {totalModules} Modules
                        </div>
                        <div className="analytics-grp">
                            <NotebookPenIcon className="analytics-icon" /> {totalLessons} Lessons
                        </div>
                    </div>
                    <br />
                </div>
                <div className="coding-icon">
                    <Code className="code-ic" />
                </div>
                <div className="welcome-box">
                    <WelcomeCard />
                </div>
            </div>
        </>
    )
}