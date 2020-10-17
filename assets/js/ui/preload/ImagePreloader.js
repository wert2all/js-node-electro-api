import ImagePreloaderInterface from "./ImagePreloaderInterface";

export default class ImagePreloader extends ImagePreloaderInterface {
    constructor() {
        super();
        /**
         *
         * @type {{}}
         * @private
         */
        this._images = {};
    }

    /**
     *
     * @param {string} imageUrl
     */
    load(imageUrl) {
        this._images[imageUrl] = new Promise((resolve) => {
            const image = new Image();
            image.onload = resolve;
            image.onerror = resolve;
            image.src = imageUrl;
        }).then(() => {
            this._images[imageUrl] = true;
        });
    }

    /**
     *
     * @param {string} imageUrl
     * @return {Promise<void>|boolean|null}
     */
    getImage(imageUrl) {
        return this._images[imageUrl];
    }
}
