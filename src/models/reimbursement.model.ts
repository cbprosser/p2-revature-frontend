/**
 * Models the reimbursement as per instructions.
 * Reimbursements contain the following fields:
 *
 * ReimbursementId: The ID of the reimbursement [number] (Table: Primary Key)
 * author: The user that submitted the reimbursement [User] (Table: Foreign Key, Not Null)
 * amount: The amount of the reimbursement [number] (Table: number(8,2), Not Null)
 * dateSubmitted: The date the reimbursement was submitted [date] (Table: Timestamp, Not Null)
 * dateResolved: The date the reimbursement was resolved [date] (Table: Timestamp, Not Null)
 * description: Description of the reimbursement [string] (Table: Text)
 * resolver: The user that resolved the reimbursement [User] (Table: Foreign Key)
 * status: Status of the reimbursement [ReimbursementStatus] (Table: Foreign Key)
 * type: Type of the Reimbursement [ReimbursementType] (Table: Foreign Key)
 */

import User from './user.model';
import ReimbursementStatus from './reimbursement.status.model';
import ReimbursementType from './reimbursement.type.model';

export default class Reimbursement {
    constructor(
        public reimbursementId = 0,
        public author: User,
        public amount = 0,
        public dateSubmitted = 0,
        public dateResolved = 0,
        public description = '',
        public resolver: User,
        public status: ReimbursementStatus,
        public type: ReimbursementType
    ) { }
}