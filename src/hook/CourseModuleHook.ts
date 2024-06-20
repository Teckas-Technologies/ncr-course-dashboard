import { useEffect, useState } from "react";


interface Lesson {
    title: string;
    content: string;
}
  
interface Module  {
    title: string;
    description: string;
    lessons: Lesson[];
}

export const useFetchCourseModules = () => {
        const [courseModules, setCourseModules] = useState<Module[] | null>([])
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);

        const fetchCourseModules = async () => {
            try {
                const response = await fetch(`/api/CourseModule`);
                if (!response.ok) throw new Error('Network response was not ok');
                const modules:Module[] = await response.json();
                console.log(" Modules : ", modules)
                setCourseModules(modules)
            } catch (err) {
                console.error('Error fetching battles:', err);
                setError("Error fetching battles!");
            } finally {
                setLoading(false);
            }
        };
  
        
        useEffect(() => {
           fetchCourseModules();
        }, []);
       
  
    return { courseModules, loading, error };
  };