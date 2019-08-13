import User from "./user.model";

export default class Deck {
    constructor(
        public id: number,
        public author: User,
        public deckName: string,
        public deckDescription: string,
        public isPrivate: boolean,
        public isPrototype: boolean,
        public format: string,
        public cards: string[],
        public featuredCard: string,
        public deckCreated?: number,
        public deckUpdated?: number,
        public featuredCardURI?: string

    ){}
}