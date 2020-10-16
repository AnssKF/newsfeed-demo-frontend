import { IUser } from './user';

export interface IPost {
    id: number,
    author: IUser,
    content: string,
    created_at: string,
    likes_count: number,
    liked: false | number
}

export interface IPostPayload {
    content: string
}