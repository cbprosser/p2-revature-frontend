import CollectionId from './collection.id.model';

export default class CollectionCards{
    constructor(
        public collectionCardsId = 0,
        public collectionId = CollectionId,
        public collectionCard = '',
        public amount = 0,
    ) { }
}