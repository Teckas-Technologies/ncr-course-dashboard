import CourseModules from "../model/CourseModule";
import { connectToDatabase } from "./mongoose";
import { Module } from "@/types/types";


export const findAllCourseModules = async (): Promise<any> => {
    await connectToDatabase();
    const modules = await CourseModules.find({});
    return modules;
}

export async function saveCourseModule(data: Module): Promise<any> {
    await connectToDatabase();
    const { title, description, lessons } = data;

    let existingModule = await CourseModules.findOne({ title });

    if (existingModule) {
        lessons.forEach(newLesson => {
            let existingLessonIndex = existingModule.lessons.findIndex(
                lesson => lesson.title === newLesson.title
            );

            if (existingLessonIndex !== -1) {
                existingModule.lessons[existingLessonIndex].content = newLesson.content;
            } else {
                existingModule.lessons.push(newLesson);
            }
        });

        return existingModule.save();
    } else {
        const newModule = new CourseModules({
            title,
            description,
            lessons
        });
        return newModule.save();
    }
}