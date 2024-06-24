import { Card } from "./ui/card";
import '../app/style.css'
import { Code, Notebook, NotebookIcon, NotebookPenIcon } from "lucide-react";
import WelcomeCard from "./WelcomeCard";


export default function Banner({totalModules, totalLessons}: any) {
    return (
        <>
            <div className="banner">
                <div className="banner-content">
                    <h2>NCR Courses</h2>
                    <div className="analytics">
                        <div className="analytics-grp">
                            <NotebookIcon className="analytics-icon" /> {totalModules} Modules
                        </div>
                        <div className="analytics-grp">
                            <NotebookPenIcon className="analytics-icon" /> {totalLessons} Lessons
                        </div>
                    </div>
                </div>
                <div className="coding-icon">
                    <Code className="code-ic"/>
                </div>
                <div className="welcome-box">
                    <WelcomeCard />
                </div>
            </div>
        </>
    )
}