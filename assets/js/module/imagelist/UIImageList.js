import ImageData from "../../data/ImageData";
import ApiLimits from "../api/ApiLimits";
import ApiImagesLimitData from "./data/ApiImagesLimitData";
import ApiImagesHolder from "./data/ApiImagesHolder";
import UIElementListInterface from "../../ui/interfaces/element/UIElementListInterface";
import DataGoogleAuthUser from "../../data/DataGoogleAuthUser";

/**
 * @class UIImageList
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageList extends UIElementListInterface {
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
        this._setElements();
        this._showData();
    }

    /**
     *
     * @private
     */
    _showLoader() {
        this._viewHolder.getGrid().addElement(this._viewHolder.getLoader().clone());
    }

    /**
     *
     * @private
     */
    _hideLoader() {
        this._viewHolder.getGrid().clean();
    }

    /**
     * @param {number} fromValue
     * @return {Promise<ApiImagesHolder>}
     * @private
     */
    _fetchData(fromValue = 0) {
        this._apiLimits = this._apiLimits.setFrom(fromValue);
        return this._api.getImages(this._authProvider.getUserProfile(), this._apiLimits).then((apiResult) => {
            if (apiResult.getStatus()) {
                let images = [];
                let limit = null;
                if (apiResult.getData().hasOwnProperty("files")) {
                    images = this._aggregateImages(apiResult.getData().files);
                }
                if (apiResult.getData().hasOwnProperty("limits")) {
                    limit = this._aggregateLimit(apiResult.getData().limits);
                }
                return new ApiImagesHolder(images, limit);
            } else {
                throw new Error(apiResult.getErrorMessage());
            }
        });
    }

    /**
     *
     * @param {ApiImagesHolder} data
     * @return {Promise<ApiImagesHolder>}
     * @private
     */
    _applyImages(data) {
        if (data.getImages().length === 0) {
            this._viewHolder.getNotify().warning("No image data");
        }
        this._hideLoader();
        data.getImages().forEach((imageData) => {
            this._viewHolder.getGrid().addElement(this._viewHolder.getImageItem().create(imageData, this));
        });
        return Promise.resolve(data);
    }

    /**
     *
     * @param {Object[]} files
     * @return {ImageData[]}
     * @private
     */
    _aggregateImages(files) {
        return files.map((image) => {
            const imageObject = new ImageData(image.id, image.url)
                .setType(image.type)
                .setYearmon(image.yearmon)
                .setPath(image.path)
                .setIsReady(image.isReady === "true");
            if (image.hasOwnProperty("ext_data")) {
                const extData = image.ext_data;
                imageObject.setRotation(extData.hasOwnProperty("rotation") ? extData.rotation : 0);
            }
            if (image.hasOwnProperty("ext_urls")) {
                imageObject.setUrls(image.ext_urls);
            }
            if (image.hasOwnProperty("user")) {
                imageObject.setUser(
                    new DataGoogleAuthUser(image.user.id, image.user.name, image.user.email, image.user.image)
                );
            }
            return imageObject;
        });
    }

    /**
     *
     * @param {ApiImagesHolder} data
     * @return {Promise<ApiImagesHolder>}
     * @private
     */
    _applyPager(data) {
        if (data.getLimit() != null) {
            this._applyPagerData(data.getLimit());
        }
        const pager = this._viewHolder.getPager();
        this._viewHolder.getParentElement().addElement(
            pager.build((event, number) => {
                event.preventDefault();
                this._showData(pager.getDataProvider().getFromByPage(number));
            })
        );
        return Promise.resolve(data);
    }

    /**
     *
     * @param {Object} limits
     * @return {ApiImagesLimitData|null}
     * @private
     */
    _aggregateLimit(limits) {
        return limits.hasOwnProperty("count") && limits.hasOwnProperty("from") && limits.hasOwnProperty("offset")
            ? new ApiImagesLimitData(limits.count, limits.from, limits.offset)
            : null;
    }

    /**
     *
     * @param {ApiImagesLimitData} limit
     * @return {UIImageList}
     * @private
     */
    _applyPagerData(limit) {
        this._viewHolder
            .getPager()
            .setPagerItemsCount(limit.getCount())
            .setPagerFrom(limit.getFrom())
            .setPagerOffset(limit.getOffset());
        return this;
    }

    /**
     *
     * @param {number} fromValue
     * @private
     */
    _showData(fromValue = 0) {
        this._setElements();
        this._showLoader();
        this._fetchData(fromValue)
            .then((data) => this._applyImages(data))
            .then((data) => this._applyPager(data))
            .catch((error) => {
                this._hideLoader();
                return this._viewHolder.getNotify().error(error.message);
            });
    }

    /**
     *
     * @private
     */
    _setElements() {
        this._viewHolder.getParentElement().clean();
        this._viewHolder.getParentElement().addElement(this._viewHolder.getGrid());
    }

    /**
     * @return {void}
     */
    refresh() {
        this._showData(this._apiLimits.getFrom());
    }
}
