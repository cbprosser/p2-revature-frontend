import User from "./user.model";

export default class Collection {
    constructor(
        public id: number,
        public author: User,
        public collectionName: string,
        public collectionDescription: string,
        public isPrivate: boolean,
        public isPrototype: boolean,
        public cards: string[],
        public featuredCard: string,
        public collectionCreated?: number,
        public collectionUpdated?: number,
        public featuredCardURI?: string
    ){}
}