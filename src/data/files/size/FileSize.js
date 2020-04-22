import FileSizeInterface from './FileSizeInterface';

/**
 * @class FileSize
 * @type FileSizeInterface
 * @extends FileSizeInterface
 */
export default class FileSize extends FileSizeInterface {
    /**
     *
     * @param {number} size
     */
    constructor(size) {
        super();
        /**
         *
         * @type {number}
         * @private
         */
        this._size = size;
    }


    /**
     *
     * @param {number} size
     */
    static fabric(size) {
        return size <= 5242880 ? new FileSize(size) : false;
    }
}
