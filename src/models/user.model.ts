import Role from "./role.model";

export default class User {
    constructor(
        public id = 0,
        public username = '',
        public password?: string,
        public firstName = '',
        public lastName = '',
        public email = '',
        public role = Role
    ) { }
}