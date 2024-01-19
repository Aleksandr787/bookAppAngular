import { IAuthor } from "./author";

export interface IBook {
    id: string;
    userId: string,
    name: string;
    author: string;
}

export interface IAddBook {
    name: string;
    author: IAuthor;
}

export interface IEditBook {
    id: string;
    name: string;
    author: IAuthor;
}