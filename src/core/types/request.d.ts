export {};

declare module 'express' {
    import {UserModel} from "../../models/users/users.entity";

    export interface Request {
        user: UserModel | undefined | null;
        file?: File | null | undefined;
    }
}
