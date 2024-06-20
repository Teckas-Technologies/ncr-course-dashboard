import CourseModules from "../model/CourseModule";
import { connectToDatabase } from "./mongoose";

export const findAllCourseModules = async (): Promise<any> => {
    await connectToDatabase();
    return CourseModules.find({});
}