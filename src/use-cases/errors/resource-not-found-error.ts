export class ResourceNorFoundError extends Error {
    constructor(){
        super("Resource not found.")
    }
}