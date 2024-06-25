import Students from "../model/Student";
import { connectToDatabase } from "./mongoose";
import { Student } from "@/types/types";

type PartialStudent = Pick<Student, 'id'>;


export const findAllStudents = async (): Promise<any> => {
    await connectToDatabase();
    try {
        const students = await Students.find({});
        return students;
    } catch (error) {
        console.error('Error finding student:', error);
        return null;
    }
}

export const findStudentById = async (id: string): Promise<any> => {
    await connectToDatabase(); 

    console.log(" Entered fetchStudentById Utils : ")

    try {
        const student = await Students.findOne({ id }); 
        return student;
    } catch (error) {
        console.error('Error finding student:', error);
        return null;
    }
};

export async function saveStudent(data: Student | PartialStudent): Promise<any> {
    await connectToDatabase();

    // try {
    //     if (data instanceof FormData) {
    //         const id = data.get("id")?.toString();
    //         let existingStudent = await Students.findOne({ id });

    //         if (existingStudent) {
    //             existingStudent.currentModule = parseInt(data.get("currentModule")?.toString() || "0");
    //             existingStudent.currentLesson = parseInt(data.get("currentLesson")?.toString() || "0");
    //             existingStudent.progress = parseInt(data.get("progress")?.toString() || "0");

    //             const homeworkString = data.get("homework")?.toString() || "";
    //             const homework: HomeworkSubmission = JSON.parse(homeworkString);
    //             existingStudent.homework.push(homework);

    //             return existingStudent.save();
    //         } else {
    //             const newStudent = new Students({
    //                 id: id,
    //                 currentModule: parseInt(data.get("currentModule")?.toString() || "0"),
    //                 currentLesson: parseInt(data.get("currentLesson")?.toString() || "0"),
    //                 progress: parseInt(data.get("progress")?.toString() || "0"),
    //                 homework: [{
    //                     type: "",
    //                     lesson: 0,
    //                     data: "",
    //                 }],
    //             });

    //             return newStudent.save();
    //         }
    //     } else {
    //         // const { id, currentModule, currentLesson, progress, homework } = data;

    //         let existingStudent = await Students.findOne({ id: data.id });

    //         if (existingStudent) {
    //             if ('currentModule' in data) existingStudent.currentModule = data.currentModule;
    //             if ('currentLesson' in data) existingStudent.currentLesson = data.currentLesson;
    //             if ('progress' in data) existingStudent.progress = data.progress;
    //             if ('homework' in data) existingStudent.homework = data.homework;
                
    //             return existingStudent.save();
    //         } else {
    //             const newStudent = new Students(data);
    //             return newStudent.save();
    //         }
    //     }
    // } catch (error) {
    //     console.error('Error saving data:', error);
    //     throw new Error('Failed to save student');
    // }

    let existingStudent = await Students.findOne({ id: data.id });

    if (existingStudent) {
        if ('currentModule' in data) existingStudent.currentModule = data.currentModule;
        if ('currentLesson' in data) existingStudent.currentLesson = data.currentLesson;
        if ('progress' in data) existingStudent.progress = data.progress;
        if ('homework' in data) existingStudent.homework.push(...data.homework);
        
        return existingStudent.save();
    } else {
        const newStudent = new Students(data);
        return newStudent.save();
    }
}

export async function updateStudent(id: string, data: Partial<Student>): Promise<any> {
    await connectToDatabase();

    // const { completed } = data;
  
    try {
      const updatedStudent = await Students.findOneAndUpdate({ id }, data, { new: true });
      return updatedStudent;
    } catch (error) {
      console.error('Error updating student:', error);
      throw new Error('Failed to update student');
    }
}

// export async function updateStudent(id: string, data: Partial<Student>): Promise<any> {
//     await connectToDatabase();
  
//     try {
//         let existingStudent = await Students.findOne({ id });

//         if (!existingStudent) {
//           throw new Error('Student not found');
//         }

//         if ('completed' in data) {
//           existingStudent.completed = data.completed || false;
//         }
//         const updatedStudent = await existingStudent.save();
    
//         return updatedStudent;
//     } catch (error) {
//       console.error('Error updating student:', error);
//       throw new Error('Failed to update student');
//     }
//   }
  
