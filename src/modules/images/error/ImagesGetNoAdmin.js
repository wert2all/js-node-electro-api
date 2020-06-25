/**
 * @class ImagesGetNoAdmin
 * @extends Error
 * @type Error
 */
export default class ImagesGetNoAdmin extends Error {
    constructor() {
        super('Bad request: No admin');
    }
}
