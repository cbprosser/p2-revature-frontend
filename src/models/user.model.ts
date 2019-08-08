import Role from './role.model';

export default class User {
    constructor(
        public userId = 0,
        public username = '',
        public password = '',
        public firstName = '',
        public lastName = '',
        public email = '',
        public role?: Role
    ) { }
}