import { ClassInfo } from '../../teaches/types/class';
import { CourseInfo } from '../../teaches/types/course';

type Instructor = {
  id: string;
  name: string;
  avatarUrl: string;
  jobTitle: string;
};

type InstructorProfile = {
  uID:string,
  teacherID:string,
  userName:string,
  fullName:string,
  email:string,
  profilePic:string
  courses : CourseInfo[]
  classes:ClassInfo[]
}

export type {
  Instructor,
  InstructorProfile
}
