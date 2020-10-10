import YearMonClient from "./YearMonClient";

/**
 * @class ImageData
 */
export default class ImageData {
    /**
     *
     * @param {number} id
     * @param {string} url
     */
    constructor(id, url) {
        /**
         *
         * @type {number}
         * @private
         */
        this._id = id;
        /**
         *
         * @type {string}
         * @private
         */
        this._url = url;
        /**
         *
         * @type {string}
         * @private
         */
        this._type = "bill";
        /**
         *
         * @type {null|YearMonClient}
         * @private
         */
        this._yearmon = null;
        /**
         *
         * @type {null| DataGoogleAuthUser}
         * @private
         */
        this._user = null;
        /**
         *
         * @type {null|string}
         * @private
         */
        this._path = null;
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isReady = false;
        /**
         *
         * @type {number}
         * @private
         */
        this._rotation = 0;
    }

    /**
     *
     * @return {number}
     */
    getRotation() {
        return this._rotation;
    }

    /**
     *
     * @param {number} value
     * @return {ImageData}
     */
    setRotation(value) {
        this._rotation = value;
        return this;
    }

    /**
     *
     * @return {boolean}
     */
    getIsReady() {
        return this._isReady;
    }

    /**
     *
     * @param {boolean} value
     * @return {ImageData}
     */
    setIsReady(value) {
        this._isReady = value;
        return this;
    }

    /**
     *
     * @return {null|string}
     */
    getPath() {
        return this._path;
    }

    /**
     *
     * @param {string} value
     * @return {ImageData}
     */
    setPath(value) {
        this._path = value;
        return this;
    }

    /**
     *
     * @return {null|DataGoogleAuthUser}
     */
    getUser() {
        return this._user;
    }

    /**
     *
     * @return {number}
     */
    getId() {
        return this._id;
    }

    /**
     *
     * @return {null|YearMonClient}
     */
    getYearmon() {
        return this._yearmon;
    }

    /**
     *
     * @return {string}
     */
    getType() {
        return this._type;
    }

    /**
     *
     * @return {string}
     */
    getUrl() {
        return this._url;
    }

    /**
     *
     * @param {DataGoogleAuthUser|null} user
     * @return {ImageData}
     */
    setUser(user) {
        this._user = user;
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {ImageData}
     */
    setYearmon(value) {
        this._yearmon = YearMonClient.create(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {ImageData}
     */
    setType(value) {
        this._type = value;
        return this;
    }
}
