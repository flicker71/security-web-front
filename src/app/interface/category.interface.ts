import { Game } from "./game.interface";
import { TypeCategory } from "./typeCategory.interface";

export interface Category {
    id: number,
    name_categ: string,
    type_categ?: TypeCategory,
    game: Game[]
}
