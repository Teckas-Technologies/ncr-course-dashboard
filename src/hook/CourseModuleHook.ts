import { useEffect, useState } from "react";
import { Module } from "@/types/types";


export const useFetchCourseModules = () => {
        const [courseModules, setCourseModules] = useState<Module[] | null>(null)
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
                console.error('Error fetching modules:', err);
                setError("Error fetching modules!");
            } finally {
                setLoading(false);
            }
        };
  
        
        useEffect(() => {
           fetchCourseModules();
        }, []);
       
  
    return { courseModules, loading, error };
};

export const useSaveCourseModule = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const saveCourseModule = async (data: Module): Promise<void> => {
      setLoading(true);
      setError(null);
  
      try {
        console.log("Hook Module :", data)
        const response = await fetch('/api/CourseModule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save data');
        }
      } catch (error) {
        console.error('Error saving data:', error);
        setError('Failed to save course module');
      } finally {
        setLoading(false);
      }
    };
  
    return { saveCourseModule, loading, error };
  };