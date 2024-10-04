export class FileSaveException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FileSaveException';
    }
}