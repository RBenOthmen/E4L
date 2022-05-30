import {AppError} from "./AppError";

export class BadInput extends AppError {

    constructor(error : Response) {
        super(error)

    }

}
