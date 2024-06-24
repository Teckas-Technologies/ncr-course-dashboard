import type { NextApiRequest, NextApiResponse } from 'next';
import { findAllStudents, findStudentById, saveStudent } from '../../utils/StudentUtil';
import { Student } from "@/types/types";

type PartialStudent = Pick<Student, 'id'>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      //POST method is used for creating module
      case 'POST':
        const student: Student | PartialStudent = req.body;
        console.log("API Student :", student)
        const savedStudent = await saveStudent(student);
        return res.status(201).json(savedStudent);
      //GET method is used for fetching student
      case 'GET':
        const { id } = req.query;
        if (id) {
            const student: Student | null = await findStudentById(id.toString());
            if (student) {
                return res.status(200).json(student);
            } else {
                return res.status(404).json({ error: 'Student not found' });
            }
        } else {
            const students: Student[] = await findAllStudents();
            return res.status(200).json(students);
        }
      default:
        res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: "Server Error" });
  }
}