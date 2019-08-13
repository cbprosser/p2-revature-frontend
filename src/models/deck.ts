import User from "./user.model";

export default class Deck {
    constructor(
        id: number,
        author: User,
        deckName: string,
        deckDescription: string,
        isPrivate: boolean,
        isPrototype: boolean,
        format: string,
        cards: string[],
        featuredCard: string,
        deckCreated?: number,
        deckUpdated?: number,
        featuredCardURI?: string

    ){}
}