import { ChangeEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

interface HomeworkSubmissionFormProps {
    studentId: number;
    studentName: string;
    studentCurrentModule: number;
    studentCurrentLesson: number;
    studentProgress: number;
    currentModule: number;
    currentLesson: number;
    courseModules: {
        title: string;
        lessons: {
          title: string;
          link: string;
        }[];
      }[],
  }

export default function HomeworkSubmissionForm({ studentId, studentName, studentCurrentModule, studentCurrentLesson, studentProgress, currentModule, currentLesson, courseModules }: HomeworkSubmissionFormProps) {
    const [selectedOption, setSelectedOption] = useState<string>("text");
    const [homeworkContent, setHomeworkContent] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const { toast } = useToast();

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setHomeworkContent("");
        setFile(null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        } else {
          setFile(null);
        }
    };

    const handleSubmit = async () => {
        if(selectedOption && homeworkContent || file ) {
            try {
                if (
                    currentModule < 0 ||
                    currentModule >= courseModules.length ||
                    currentLesson < 0 ||
                    currentLesson >= courseModules[currentModule].lessons.length
                  ) {
                    console.log("Module :",currentModule)
                    console.log("Lesson :", currentLesson)
                    throw new Error("Invalid module or lesson index");
                  }
                const formData = new FormData();
                formData.append("studentId", studentId.toString());
                formData.append("name", studentName);
                formData.append("currentModule", currentModule.toString());
                formData.append("currentLesson", currentLesson.toString());
                formData.append("progress", studentProgress.toString());
                formData.append("homeworkType", selectedOption);
          
                if (selectedOption === "document" && file) {
                  formData.append("homeworkContent", file);
                } else {
                  formData.append("homeworkContent", homeworkContent);
                }
          
              //   await axios.post("http://localhost:3000/submit-homework", formData, {
              //     headers: {
              //       "Content-Type": "multipart/form-data",
              //     },
              //   });
      
                  const homeworkData: { [key: string]: any } = {};
                  formData.forEach((value, key) => {
                  homeworkData[key] = value;
              });
      
              console.log("Homework Data:", homeworkData);
              toast({
                  title: `${courseModules[homeworkData.currentModule].lessons[homeworkData.currentLesson].title} homework has been submitted successfully!`,
                  description: `Great Achievement ${homeworkData.name}!`,
                  // action: (
                  //   <ToastAction altText="Goto schedule to undo">Next</ToastAction>
                  // ),
              })
            } catch (error) {
                toast({
                    title: `An error occured while submitting the homework!`,
                    description: "Please try later!",
                    variant: "destructive"
                })
                console.error(error);
            }
        } else {
            toast({
                title: `Please select the option and provide the homework content`,
                description: "Please try again!",
                variant: "destructive"
            })
        }

      };

    const renderSubmissionField = () => {
        switch (selectedOption) {
            case 'text':
                return <>
                <div className="hw-input-field mx-2">
                    <Textarea value={homeworkContent} onChange={(e) => setHomeworkContent(e.target.value)} placeholder="Write your homework here..." />
                </div>;
                </>
            case 'link':
                return <>
                <div className="hw-input-field mx-2">
                    <Input type="text" value={homeworkContent} onChange={(e) => setHomeworkContent(e.target.value)} placeholder="Paste your homework link here..." />
                </div>;
                </>
            case 'document':
                return <>
                <div className="hw-input-field mx-2">
                    <Input type="file" onChange={handleFileChange} />
                </div>;
                </>
            default:
                return null;
        }
    };

    console.log("Props received in HomeworkSubmissionForm:", {
        studentId,
        studentName,
        studentCurrentModule,
        studentCurrentLesson,
        studentProgress,
        currentModule,
        currentLesson,
      });

    return (
        <>
        <div>
            <div className="radio-btn py-3">
            <RadioGroup defaultValue="option" name="option" className="options">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" checked={selectedOption === 'text'} onClick={() => handleOptionChange("text")} />
                    <Label htmlFor="text">Text</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="link" checked={selectedOption === 'link'} onClick={() => handleOptionChange("link")} />
                    <Label htmlFor="link">Link</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="document" id="document" checked={selectedOption === 'document'} onClick={() => handleOptionChange("document")} />
                    <Label htmlFor="document">Document</Label>
                </div>
            </RadioGroup>
            </div>
            {renderSubmissionField()}
            <div className="hw-submit-btn py-3 mx-2">
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
        </>
    );
}
