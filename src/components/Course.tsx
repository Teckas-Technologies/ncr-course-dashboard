import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface SelectedLesson {
    moduleTitle: string;
    lessonTitle: string;
    description: string;
    activities: string;
}

interface CourseProps {
    selectedLesson: SelectedLesson;
    onNextLesson: () => void;
    onPreviousLesson: () => void;
    isFirstLesson: boolean;
    isLastLesson: boolean;
}

export default function Course({ selectedLesson, onNextLesson, onPreviousLesson, isFirstLesson, isLastLesson }: CourseProps) {
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
                        <p dangerouslySetInnerHTML={{ __html: selectedLesson.activities }}></p>
                        <div className="flex justify-between mt-4">
                            <Button onClick={onPreviousLesson} disabled={isFirstLesson}>
                                Previous
                            </Button>
                            <Button onClick={onNextLesson} disabled={isLastLesson}>
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}