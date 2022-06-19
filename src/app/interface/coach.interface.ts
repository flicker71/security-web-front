import { Game } from "./game.interface";

export interface Coach {
    id: number,
    avis?: string,
    salaire?: number,
    game: Game,
}
