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
     * @param {DataGoogleAuthUser} userProfile
     * @param {ApiLimits} limits
     * @return {Promise<ApiFetchResult>}
     */
    async getImages(userProfile, limits = null) {
        const options = {
            method: 'GET'
        };
        return await this._fetcher.fetch(
            this._createUrl(
                'imagelist/get/?token=' + this._createToken(userProfile),
                limits
            ),
            options
        );
    }

    /**
     *
     * @param {DataGoogleAuthUser} userProfile
     * @param {ImageData} imageData
     * @return {Promise<ApiFetchResult>}
     */
    async deleteImage(userProfile, imageData) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: this._createToken(userProfile),
                image: imageData.getId()
            })
        };
        return await this._fetcher.fetch(
            this._createUrl('imagelist/delete/'),
            options
        );
    }

    /**
     *
     * @param {DataGoogleAuthUser} userProfile
     * @param {string} userId
     * @return {Promise<ApiFetchResult>}
     */
    async getUserProfile(userProfile, userId) {
        const options = {
            method: 'GET'
        };
        return await this._fetcher.fetch(
            this._createUrl(
                'user/profile/get/?token='
                + this._createToken(userProfile) + '&userid=' + userId
            ),
            options
        );
    }

    /**
     *
     * @param {DataGoogleAuthUser} userProfile
     * @return {string}
     * @private
     */
    _createToken(userProfile) {
        return this._b64EncodeUnicode(userProfile.getToken());
    }

    /**
     *
     * @param {string} url
     * @param {ApiLimits} limits
     * @return {string}
     * @private
     */
    _createUrl(url, limits = null) {
        return this._rootURL + url + ((limits) ? this._createLimits(limits) : '');
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

    /**
     *
     * @param {ApiLimits} limits
     * @return {string}
     * @private
     */
    _createLimits(limits) {
        if (limits !== null) {
            return '&&from=' + limits.getFrom() + '&&offset=' + limits.getOffset();
        } else {
            return '';
        }
    }
}
