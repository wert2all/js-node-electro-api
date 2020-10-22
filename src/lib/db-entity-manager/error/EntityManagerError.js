/**
 * @class EntityManagerError
 * @extends Error
 */
export default class EntityManagerError extends Error {
    constructor() {
        super("Can't save entity.");
    }
}
