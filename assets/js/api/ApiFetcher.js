import ApiFetchInterface from "./ApiFetchInterface";
import ApiFetchResult from "./ApiFetchResult";

/**
 * @class ApiFetcher
 * @type ApiFetchInterface
 * @extends ApiFetchInterface
 */
export default class ApiFetcher extends ApiFetchInterface {
    /**
     * @param {string} url
     * @param {Object} options
     * @return Promise<ApiFetchResult>
     */
    async fetch(url, options) {
        return new Promise((resolve) => {
            fetch(url, options)
                .then((result) => {
                    if (result.ok) {
                        return result;
                    } else {
                        throw new Error(result.statusText);
                    }
                })
                .then((result) => result.json())
                .then((response) => {
                    if (response.hasOwnProperty("status")) {
                        if (response.status === true) {
                            if (response.hasOwnProperty("data")) {
                                resolve(ApiFetchResult.createSuccess(response.data));
                            } else {
                                resolve(ApiFetchResult.createError(new Error("No data")));
                            }
                        } else {
                            resolve(ApiFetchResult.createError(new Error(response.message)));
                        }
                    } else {
                        resolve(ApiFetchResult.createError(new Error("Bad status")));
                    }
                })
                .catch((e) => resolve(ApiFetchResult.createError(e)));
        });
    }
}
