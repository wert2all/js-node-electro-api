import ReaderInterface from "./ReaderInterface";

/**
 * @class ReaderDefault
 * @extends ReaderInterface
 * @type ReaderInterface
 */
export default class ReaderDefault extends ReaderInterface {
    /**
     *
     * @param {string} path
     */
    constructor(path) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._path = path;
    }

    /**
     * @return {Object<string, string>}
     */
    read() {
        return require(this._path);
    }
}
