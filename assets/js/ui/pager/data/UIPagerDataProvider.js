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
        return page * this._offset;
    }
}
