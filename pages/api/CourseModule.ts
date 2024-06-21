import type { NextApiRequest, NextApiResponse } from 'next';
import { findAllCourseModules, saveCourseModule } from '../../utils/CourseModuleUtil';

interface Lesson {
  title: string;
  content: string;
}

interface Module  {
  title: string;
  description: string;
  lessons: Lesson[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      //POST method is used for creating battle
      case 'POST':
        const theModule = req.body;
        console.log("API Module :", theModule)
        const savedCourseModule = await saveCourseModule(theModule);
        return res.status(201).json(savedCourseModule);
      //GET method is used for fetching battles
      case 'GET':
          const courseModules: Module[] = await findAllCourseModules();
          return res.status(200).json(courseModules);
      default:
        res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: "Server Error" });
  }
}