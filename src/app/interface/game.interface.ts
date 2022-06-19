import { Category } from "./category.interface";
import { Coach } from "./coach.interface";
import { Lesson } from "./lesson.interface";

export interface Game {
    id: number,
    name_game: string,
    logo: string,
    image: string,
    image_card: string,
    tag?: string,
    id_categ: number,
    category: Category,
    coach: Coach[]
    lessons: Lesson[]
}
