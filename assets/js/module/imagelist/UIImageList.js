import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';
import ImageData from '../../data/ImageData';
import UserProfile from '../../data/UserProfile';
import ApiLimits from '../api/ApiLimits';

/**
 * @class UIImageList
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageList extends UIElementInterface {
    /**
     *
     * @param {Api} api
     * @param {AuthProviderInterface} authProvider
     * @param {UIImagesViewHolder} viewHolder
     */
    constructor(viewHolder, api, authProvider) {
        super();
        /**
         *
         * @type {UIImagesViewHolder}
         * @private
         */
        this._viewHolder = viewHolder;
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
         * @type {ApiLimits}
         * @private
         */
        this._apiLimits = new ApiLimits(0, 12);
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
        this._viewHolder.getParentElement().addElement(this._viewHolder.getGrid());
        this._showLoader();
        this._fetchData()
            .then(data => this._addData(data))
            .catch(error => {
                this._hideLoader();
                return this._viewHolder.getNotify().error(error.message);
            });
    }

    /**
     *
     * @private
     */
    _showLoader() {
        this._viewHolder
            .getGrid()
            .addElement(
                this._viewHolder.getLoader().clone()
            );
    }

    /**
     *
     * @private
     */
    _hideLoader() {
        this._viewHolder.getGrid().clean();
    }

    /**
     * @return {Promise<ImageData[]>}
     * @private
     */
    _fetchData() {
        return this._api
            .getImages(this._authProvider.getUserProfile(), this._apiLimits)
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
            this._viewHolder.getNotify().warning('No image data');
        }
        this._hideLoader();
        data.forEach(imageData => {
            console.log(imageData);
            this._viewHolder
                .getGrid()
                .addElement(
                    this._viewHolder
                        .getImageItem()
                        .create(imageData)
                );
        });
        return Promise.resolve();
    }
}
