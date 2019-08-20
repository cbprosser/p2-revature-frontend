import User from "./user.model";

export default class CollectionId {
    constructor (
    public id = 0,
    public author = User,
    public collPrivate = false,
    public prototype = true,
    public creationDate = '',
    public lastUpdated = '',
    public name = '',
    public description = '',
    public featuredCard = ''
    ){}
    
}