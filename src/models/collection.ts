import User from "./user.model";

export default class Collection {
    constructor(
        id: number,
        author: User,
        collectionName: string,
        collectionDescription: string,
        isPrivate: boolean,
        isPrototype: boolean,
        cards: string[],
        featuredCard: string,
        collectionCreated?: number,
        collectionUpdated?: number,
        featuredCardURI?: string
    ){}
}