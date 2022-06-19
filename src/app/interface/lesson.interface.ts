import { Coach } from "./coach.interface";
import { Game } from "./game.interface";

export interface Lesson {
    id: number,
    name_lesson: string,
    description?: string,
    content?: string,
    video?: string,
    comment?: string,
    steps?: number,
    difficulty?: string,
    id_game: number,
    id_coach: number,
    game: Game,
    coach: Coach,
}
