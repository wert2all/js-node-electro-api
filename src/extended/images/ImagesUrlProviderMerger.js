import ImageSizeUrl from "./providers/ImageSizeUrl";

export default class ImagesUrlProviderMerger {
    /**
     *
     * @param {KeyValueStorageInterface} keyValueStorage
     * @param {ResizeDestinationPathProviderFactory} factory
     */
    constructor(keyValueStorage, factory) {
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._keyValueStorage = keyValueStorage;
        /**
         *
         * @type {ResizeDestinationPathProviderFactory}
         * @private
         */
        this._destinationPathProviderFactory = factory;
    }

    /**
     * @param {Object<string,ImageUrlProviderInterface>} providers
     * @param {ResizeSizesHolder} resizeHolder
     * @return {Object<string, ImageUrlProviderInterface>}
     */
    merge(providers, resizeHolder) {
        resizeHolder
            .getSizes()
            .forEach(
                (size) =>
                    (providers[size.getKey()] = new ImageSizeUrl(
                        size,
                        this._keyValueStorage,
                        this._destinationPathProviderFactory.factory()
                    ))
            );
        return providers;
    }
}
