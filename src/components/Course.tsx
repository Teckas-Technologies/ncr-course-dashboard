import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SelectedLesson } from "@/types/types";


interface CourseProps {
    selectedLesson: SelectedLesson;
    onNextLesson: () => void;
    onPreviousLesson: () => void;
    isFirstLesson: boolean;
    isLastLesson: boolean;
}

export default function Course({ selectedLesson, onNextLesson, onPreviousLesson, isFirstLesson, isLastLesson }: CourseProps) {

    const courseCompleted = () => {

    }
    return (
        <>
            <div className="course-learn-page pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedLesson.moduleTitle}</CardTitle>
                        <CardDescription>{selectedLesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h2>{selectedLesson.lessonTitle}</h2>
                        <p dangerouslySetInnerHTML={{ __html: selectedLesson.content }}></p>
                        <div className="flex justify-between mt-4">
                            <Button onClick={onPreviousLesson} disabled={isFirstLesson}>
                                Previous
                            </Button>
                            <Button onClick={isLastLesson ? courseCompleted : onNextLesson}>
                                {isLastLesson ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}