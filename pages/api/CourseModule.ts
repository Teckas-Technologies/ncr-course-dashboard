import type { NextApiRequest, NextApiResponse } from 'next';
import { findAllCourseModules } from '../../utils/CourseModuleUtil';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      //POST method is used for creating battle
      case 'POST':
        // const battle = req.body;
        // const scheduledBattle = await scheduleBattle(battle);
        // return res.status(201).json(scheduledBattle);
        return "POST Empty"
      //GET method is used for fetching battles
      case 'GET':
          const courseModules = await findAllCourseModules();
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