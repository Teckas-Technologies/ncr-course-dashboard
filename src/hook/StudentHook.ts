import { useEffect, useState } from "react";
import { Student } from "@/types/types";

type PartialStudent = Pick<Student, 'id'>;

export const useFetchStudents = () => {
        const [studentList, setStudentList] = useState<Student[] | null>(null)
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);

        const fetchStudents = async () => {
            try {
                const response = await fetch(`/api/Student`);
                if (!response.ok) throw new Error('Network response was not ok');
                const students:Student[] = await response.json();
                console.log(" Students : ", students)
                setStudentList(students);
            } catch (err) {
                console.error('Error fetching students:', err);
                setError("Error fetching students!");
            } finally {
                setLoading(false);
            }
        };
  
        
        useEffect(() => {
            fetchStudents();
        }, []);
       
  
    return { studentList, loading, error };
};

export const useFetchStudentById = () => {
    const [student, setStudent] = useState<Student | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentById = async (id: string) => {
        console.log(" Entered fetchStudentById Hook : ", student)
        try {
            const response = await fetch(`/api/Student?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const student:Student = await response.json();
            console.log(" Students : ", student)
            setStudent(student);
            return student;
        } catch (err) {
            console.error('Error fetching student:', err);
            setError("Error fetching student!");
        } finally {
            setLoading(false);
        }
    };

    
    return { fetchStudentById, loading, error };
};

export const useSaveStudent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const saveStudent = async (data: Student | PartialStudent | FormData): Promise<void> => {
      setLoading(true);
      setError(null);
  
      try {
        console.log("Hook Student :", data)
        const isFormData = data instanceof FormData;
        const response = await fetch('/api/Student', {
          method: 'POST',
          headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
          body: isFormData ? data : JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save student');
        }
      } catch (error) {
        console.error('Error saving data:', error);
        setError('Failed to save student');
      } finally {
        setLoading(false);
      }
    };
  
    return { saveStudent, loading, error };
  };
