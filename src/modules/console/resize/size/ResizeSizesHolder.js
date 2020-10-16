/**
 * @class ResizeSizesHolder
 */
export default class ResizeSizesHolder {
    /**
     *
     * @param {ResizeConfig[]} sizes
     */
    constructor(sizes) {
        /**
         *
         * @type {ResizeConfig[]}
         * @private
         */
        this._sizes = sizes;
    }

    /**
     *
     * @return {ResizeConfig[]}
     */
    getSizes() {
        return this._sizes;
    }
}
