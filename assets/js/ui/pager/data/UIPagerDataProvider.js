/**
 * @class UIPagerDataProvider
 */

export default class UIPagerDataProvider {
    /***
     *
     * @param {number} itemCount
     * @param {number} fromValue
     * @param {number} offset
     */
    constructor(itemCount = 0, fromValue = 0, offset = 10) {
        /**
         *
         * @type {number}
         * @private
         */
        this._count = itemCount;
        /**
         *
         * @type {number}
         * @private
         */
        this._offset = offset;
        /**
         *
         * @type {number}
         * @private
         */
        this._from = fromValue;
    }

    /**
     *
     * @param {number} from
     * @return {UIPagerDataProvider}
     */
    setFrom(from) {
        return new UIPagerDataProvider(this.getCountValue(), from, this.getOffsetValue());
    }

    /**
     *
     * @param {number} offset
     * @return {UIPagerDataProvider}
     */
    setOffset(offset) {
        return new UIPagerDataProvider(this.getCountValue(), this.getFromValue(), offset);
    }

    /**
     *
     * @return {number}
     */
    getFromValue() {
        return this._from;
    }

    /**
     *
     * @return {number}
     */
    getOffsetValue() {
        return this._offset;
    }

    /**
     *
     * @return {number}
     */
    getCountValue() {
        return this._count;
    }

    /**
     *
     * @param {number} count
     * @return {UIPagerDataProvider}
     */
    setCount(count) {
        return new UIPagerDataProvider(count, this.getFromValue(), this.getOffsetValue());
    }

    /**
     *
     * @return {number}
     */
    getActivePage() {
        return this._calcQuotient(this._from, this._offset) + 1 > this.getPagesCount()
            ? this.getPagesCount()
            : this._calcQuotient(this._from, this._offset) + 1;
    }

    /**
     *
     * @return {number}
     * @private
     */
    _calcQuotient(max, div) {
        return ~~(max / div);
    }

    /**
     *
     * @return {number}
     */
    getPagesCount() {
        const pages = this._calcQuotient(this._count, this._offset);
        return (this.getFromByPage(pages) < this._count) ? pages + 1 : pages;
    }

    /**
     *
     * @param {number} page
     * @return {number}
     */
    getFromByPage(page) {
        return (page - 1) * this._offset;
    }
}
