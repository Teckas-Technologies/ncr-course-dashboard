import mongoose, { Document, Model } from 'mongoose';

interface HomeworkSubmission {
    title: string;
    type: string; 
    lessonIndex: number;
    moduleIndex: number;
    data: string;
    completed: boolean;
}

interface Students extends Document {
    id: string;
    currentModule: number;
    currentLesson: number;
    progress: number;
    homework: HomeworkSubmission[];
}

const studentsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    currentModule: {
        type: Number,
        default: 0, 
    },
    currentLesson: {
        type: Number,
        default: 0, 
    },
    progress: {
        type: Number,
        default: 0, 
    },
    homework: [{
        title:{
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['text', 'link', 'document'], 
        },
        lessonIndex: {
            type: Number,
            required: true,
        },
        moduleIndex: {
            type: Number,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
        completed:{ 
            type: Boolean,
            required: true
        }
    }]
}, { timestamps: true });

const Students: Model<Students> = mongoose.models.Students || mongoose.model<Students>('Students', studentsSchema);

export default Students;
