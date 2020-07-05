/**
 * @class Api
 */
export default class Api {
    /**
     *
     * @param {ApiFetchInterface} fetcher
     * @param {string} rootURL
     */
    constructor(fetcher, rootURL) {
        /**
         *
         * @type {ApiFetchInterface}
         * @private
         */
        this._fetcher = fetcher;
        /**
         *
         * @type {string}
         * @private
         */
        this._rootURL = rootURL;
    }

    /**
     *
     * @param {UserProfile} userProfile
     * @return {Promise<ApiFetchResult>}
     */
    async getImages(userProfile) {
        const options = {
            method: 'GET'
        };
        return await this._fetcher.fetch(
            this._createUrl('imagelist/get/?token=' + this._createToken(userProfile)),
            options
        );
    }

    /**
     *
     * @param {UserProfile} userProfile
     * @return {string}
     * @private
     */
    _createToken(userProfile) {
        return this._b64EncodeUnicode(userProfile.getToken());
    }

    /**
     *
     * @param {string} url
     * @return {string}
     * @private
     */
    _createUrl(url) {
        return this._rootURL + url;
    }

    /**
     *
     * @param {string} str
     * @return {string}
     * @private
     */
    _b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }
}
