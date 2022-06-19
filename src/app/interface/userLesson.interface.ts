import { Lesson } from "./lesson.interface";
import { User } from "./user.interface";

export interface UserLesson {
    user: User,
    lesson: Lesson
}
