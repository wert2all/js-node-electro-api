import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';
import ImageData from '../../data/ImageData';
import UserProfile from '../../data/UserProfile';

/**
 * @class UIImageList
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageList extends UIElementInterface {
    /**
     *
     * @param {UIMutableElementInterface} parentElement
     * @param {UIGridElementInterface} grid
     * @param {UIElementInterface} loader
     * @param {UINotifyInterface} notify
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     * @param {UIImageItem} imageItem
     */
    constructor(parentElement, grid, loader, notify, api, authProvider, imageItem) {
        super();
        /**
         *
         * @type {UIGridElementInterface}
         * @private
         */
        this._grid = grid;
        /**
         *
         * @type {UIElementInterface}
         * @private
         */
        this._loader = loader;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
        /**
         *
         * @type {UIMutableElementInterface}
         * @private
         */
        this._parentElement = parentElement;
        /**
         *
         * @type {Api}
         * @private
         */
        this._api = api;
        /**
         *
         * @type {AuthProviderInterface}
         * @private
         */
        this._authProvider = authProvider;
        /**
         *
         * @type {UIImageItem}
         * @private
         */
        this._imageItem = imageItem;
    }

    /**
     * @return void
     */
    clean() {
        //TODO
    }

    /**
     *
     * @return {UIElementInterface|null}
     */
    clone() {
        return null;
    }

    /**
     *
     * @return {null|Node}
     */
    getNode() {
        return null;
    }

    init() {
        this._parentElement.addElement(this._grid);
        this._showLoader();
        this._fetchData()
            .then(data => this._addData(data))
            .catch(error => {
                this._hideLoader();
                return this._notify.error(error.message);
            });
    }

    _showLoader() {
        this._grid.addElement(this._loader.clone());
    }

    _hideLoader() {
        this._grid.clean();
    }

    /**
     * @return {Promise<ImageData[]>}
     * @private
     */
    _fetchData() {
        return this._api
            .getImages(this._authProvider.getUserProfile())
            .then(apiResult => {
                if (apiResult.getStatus()) {
                    if (apiResult.getData().hasOwnProperty('files')) {
                        return apiResult.getData().files.map(image => {
                            const imageObject = new ImageData(image.id, image.path)
                                .setType(image.type)
                                .setYearmon(image.yearmon);
                            if (image.hasOwnProperty('user')) {
                                imageObject.setUser(
                                    new UserProfile(
                                        image.user.id,
                                        image.user.name,
                                        image.user.email,
                                        image.user.image
                                    )
                                );
                            }
                            console.log(imageObject);
                            return imageObject;
                        });
                    }
                    return [];
                } else {
                    throw new Error(apiResult.getErrorMessage());
                }
            });
    }

    /**
     *
     * @param {ImageData[]} data
     * @return {Promise<void>}
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    _addData(data) {
        if (data.length === 0) {
            this._notify.warning('No image data');
        }
        this._hideLoader();
        data.forEach(imageData => {
            this._grid.addElement(
                this._imageItem.create(imageData)
            );
        });
        return Promise.resolve();
    }
}
