import CourseModules from "../model/CourseModule";
import { connectToDatabase } from "./mongoose";

interface Lesson {
    title: string;
    content: string;
}
  
interface Module  {
    title: string;
    description: string;
    lessons: Lesson[];
}

export const findAllCourseModules = async (): Promise<any> => {
    const modules = await CourseModules.find({});
    return modules;
}

export async function saveCourseModule(data: Module): Promise<any> {
    await connectToDatabase();
    const { title, description, lessons } = data;
    const theModule = new CourseModules({
      title,
      description,
      lessons
    });
    console.log("Db place Module :", theModule)
    return theModule.save();
}