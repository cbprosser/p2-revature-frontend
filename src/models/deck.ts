import User from "./user.model";
import Format from "./format";

export default class Deck {
    constructor(
        public id: number,
        public author: User,
        public deckName: string,
        public deckDescription: string,
        public isPrivate: boolean,
        public isPrototype: boolean,
        public format: Format,
        public mainboard: string[],
        public sideboard: string[],
        public featuredCard: string,
        public deckCreated?: number,
        public deckUpdated?: number,
        public featuredCardURI?: string

    ){}
}