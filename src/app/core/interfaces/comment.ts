import { IUser } from './user';

export interface IComment {
    id: number,
    author: IUser,
    content: string,
    post: number,
    created_at: string
}

export interface ICommentPayload {
    post: number,
    content: string
}