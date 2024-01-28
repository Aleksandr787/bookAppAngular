export interface IBook {
    id: number,
    name: string,
    author: IAuthor,
}

export interface IAddBook {
    name: string,
    author: IAuthor,
}

export interface IEditBook {
    id: number,
    name: string,
    author: IAuthor,
}

export interface IBookImage {
    id: number,
    name: string,
    author: string,
    imageUrl: string,
}

export interface IAddBookImage {
    name: string,
    author: string,
    imageUrl: string,
}

export interface IEditBookImage {
    id: number,
    name: string,
    author: string,
    imageUrl: string,
}

export interface IAuthor {
    firstname: string,
    lastname: string
}