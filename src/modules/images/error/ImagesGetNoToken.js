/**
 * @class ImagesGetNoToken
 * @extends Error
 * @type Error
 */
export default class ImagesGetNoToken extends Error {
    constructor() {
        super('Bad request: No token');
    }
}
