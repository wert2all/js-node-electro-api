/**
 * @class ApiUrlFactory
 */
export default class ApiUrlFactory {
    /**
     *
     * @param {window} window
     * @param {string} apiPath
     * @return {string}
     */
    static create(window, apiPath = '../') {
        const url = new URL(window.location.href);
        let tmpUrl = url.origin + url.pathname;
        if (tmpUrl.substr(tmpUrl.length - 1, 1) !== '/') {
            tmpUrl += '/';
        }
        return tmpUrl + apiPath;
    }
}
