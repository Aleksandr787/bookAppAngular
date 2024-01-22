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

export interface IBookCard {
    id: number,
    name: string,
    author: IAuthor,
    image: string,
}

export interface IAddBookCard {
    name: string,
    author: IAuthor,
    image: string,
}

export interface IEditBookCard {
    id: number,
    name: string,
    author: IAuthor,
    image: string,
}

export interface IAuthor {
    firstname: string,
    lastname: string
}