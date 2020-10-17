/**
 * @class ImageUrlsManager
 */
export default class ImageUrlsManager {
    /**
     *
     * @param {Object<string,ImageUrlProviderInterface>} providers
     */
    constructor(providers) {
        /**
         *
         * @type {Object<string,ImageUrlProviderInterface>}
         * @private
         */
        this._providers = providers;
    }

    /**
     *
     * @param {UserFilesEntity} imageEntity
     * @return {{}}
     */
    provide(imageEntity) {
        return Object.keys(this._providers).reduce((previousValue, currentValue) => {
            previousValue[currentValue] = this._providers[currentValue].provide(imageEntity);
            return previousValue;
        }, {});
    }
}
