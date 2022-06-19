import { Coach } from "./coach.interface";

export interface User {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    mail: string,
    image_profil?: string,
    password: string,
    created_at?: string,
    last_time_online?: string,
    is_admin?: boolean,
    is_coach?: boolean,
    id_coach?: Coach,
}
