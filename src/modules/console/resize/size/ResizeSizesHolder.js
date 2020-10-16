/**
 * @class ResizeSizesHolder
 */
export default class ResizeSizesHolder {
    /**
     *
     * @param {SizeConfig[]} sizes
     */
    constructor(sizes) {
        /**
         *
         * @type {SizeConfig[]}
         * @private
         */
        this._sizes = sizes;
    }

    /**
     *
     * @return {SizeConfig[]}
     */
    getSizes() {
        return this._sizes;
    }
}
