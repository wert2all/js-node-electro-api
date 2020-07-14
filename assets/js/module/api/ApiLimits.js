/**
 * @class ApiLimits
 */
export default class ApiLimits {
    /**
     *
     * @param {number} from
     * @param {number} offset
     */
    constructor(from = 0, offset = 10) {
        this._from = from;
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
