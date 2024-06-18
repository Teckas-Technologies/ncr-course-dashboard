import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "@/components/ui/progress"
import { Label } from './ui/label';
import { ArrowRightIcon } from 'lucide-react';

export default function ProgressComp() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="progress-bar">
                        <Progress value={33} id='progress'/>
                        <Label htmlFor='progress'>33%</Label>
                    </div>
                    <div className="course-completion">
                        <div className="completion-fields">
                            <h1>Completed Modules</h1>
                            <ArrowRightIcon/>
                            <h1>2</h1>
                        </div>
                        <div className="completion-fields">
                            <h1>Completed Lessons</h1>
                            <ArrowRightIcon/>
                            <h1>4</h1>
                        </div>
                        <div className="completion-fields">
                            <h1>Home Woke  Done !</h1>
                            <ArrowRightIcon/>
                            <h1>4</h1>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}