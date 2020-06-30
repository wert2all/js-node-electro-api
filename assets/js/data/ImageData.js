/**
 * @class ImageData
 */
import YearMonClient from './YearMonClient';

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
        this._type = 'bill';
        /**
         *
         * @type {null|YearMonClient}
         * @private
         */
        this._yearmon = null;
        /**
         *
         * @type {null| UserProfile}
         * @private
         */
        this._user = null;
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
     * @param {UserProfile|null} user
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
