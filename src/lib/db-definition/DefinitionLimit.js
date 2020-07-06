/**
 * @class DefinitionLimit
 */
export default class DefinitionLimit {
    /**
     *
     * @param {number} from
     * @param {number} offset
     */
    constructor(from = 0, offset = 10) {
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
}
