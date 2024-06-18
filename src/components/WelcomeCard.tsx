import { ArrowRightCircleIcon, ArrowRightFromLine, ArrowRightIcon, ArrowRightToLine } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";


export default function WelcomeCard() {

    return (
        <>
        <Card className="welcome-card">
            <CardHeader>
                <CardTitle>Go to syllabus</CardTitle>
                <CardDescription>Lean More About NCR Course</CardDescription>
            </CardHeader>
            <div className="welcome-card-action">
                <Link href="/"><ArrowRightIcon className="syllabus-icon"/></Link>
            </div>
        </Card>
        </>
    )
}