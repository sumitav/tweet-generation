export class FileReadException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FileReadException';
    }
}
