import mongoose, { Document, Model } from 'mongoose';

interface Lesson {
  title: string;
  content: string;
}

interface CourseModules extends Document {
  title: string;
  description: string;
  lessons: Lesson[];
}

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const courseModulesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: {
    type: [lessonSchema],
    required: true,
  },
}, { timestamps: true });

const CourseModules: Model<CourseModules> = mongoose.models.CourseModules || mongoose.model<CourseModules>('CourseModules', courseModulesSchema);

export default CourseModules;