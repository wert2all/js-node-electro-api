/**
 * @class ApiImagesHolder
 */
export default class ApiImagesHolder {
    /**
     *
     * @param {ImageData[]} images
     * @param {ApiImagesLimitData|null} limit
     */
    constructor(images, limit = null) {
        /**
         *
         * @type {ImageData[]}
         * @private
         */
        this._images = images;
        /**
         *
         * @type {ApiImagesLimitData}
         * @private
         */
        this._limit = limit;
    }

    /**
     *
     * @return {ApiImagesLimitData|null}
     */
    getLimit() {
        return this._limit;
    }

    /**
     *
     * @return {ImageData[]}
     */
    getImages() {
        return this._images;
    }
}
