import { User } from '../entities/user.entity';



export interface LoginResponse {
    // respuestas del login
    user: User;
    token: string;
}