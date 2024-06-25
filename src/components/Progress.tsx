import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "@/components/ui/progress"
import { Label } from './ui/label';
import { ArrowRightIcon } from 'lucide-react';

export default function ProgressComp({value, currentModule, currentLesson, homework}: any) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="progress-bar">
                        <Progress value={value} id='progress'/>
                        <Label htmlFor='progress'>{value}%</Label>
                    </div>
                    <div className="course-completion">
                        <div className="completion-fields">
                            <h1>Current Modules</h1>
                            <ArrowRightIcon/>
                            <h1>{currentModule+1}</h1>
                        </div>
                        <div className="completion-fields">
                            <h1>Completed Lessons</h1>
                            <ArrowRightIcon/>
                            <h1>{currentLesson+1}</h1>
                        </div>
                        <div className="completion-fields">
                            <h1>Home Work  Done !</h1>
                            <ArrowRightIcon/>
                            <h1>{homework}</h1>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}