import ApiFetchInterface from './ApiFetchInterface';
import ApiFetchResult from './ApiFetchResult';

/**
 * @class ApiFetcher
 * @type ApiFetchInterface
 * @extends ApiFetchInterface
 */
export default class ApiFetcher extends ApiFetchInterface {

    async fetch(url, options) {
        return new Promise((resolve) => {
            fetch(url, options)
                .then(result => {
                    if (result.ok) {
                        return result;
                    } else {
                        throw new Error(result.statusText);
                    }
                })
                .then(result => {
                    resolve(new ApiFetchResult(false));
                })
                .catch(e => {
                    resolve(ApiFetchResult.createError(e));
                });
        });
    }
}
