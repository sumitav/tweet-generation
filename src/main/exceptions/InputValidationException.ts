export class InputValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InputValidationException';
    }
}
