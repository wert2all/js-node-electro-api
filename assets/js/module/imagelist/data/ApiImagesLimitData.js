/**
 * @class ApiImagesLimitData
 */
export default class ApiImagesLimitData {
    /**
     *
     * @param {number} count
     * @param {number} from
     * @param {number} offset
     */
    constructor(count = 0, from = 0, offset = 0) {
        /**
         *
         * @type {number}
         * @private
         */
        this._count = count;
        /**
         *
         * @type {number}
         * @private
         */
        this._from = from;
        /**
         *
         * @type {number}
         * @private
         */
        this._offset = offset;
    }

    /**
     *
     * @return {number}
     */
    getOffset() {
        return this._offset;
    }

    /**
     *
     * @return {number}
     */
    getFrom() {
        return this._from;
    }

    /**
     *
     * @return {number}
     */
    getCount() {
        return this._count;
    }
}
