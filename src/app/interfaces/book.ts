export interface IBook {
    id: number,
    name: string,
    author: string,
}

export interface IBookCard {
    id: number,
    name: string,
    author: IAuthor,
    image: string,
}

export interface IAuthor {
    firstname: string,
    lastname: string
}