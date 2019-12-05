/**
 * @class ApiDataInterface
 * @type ApiDataInterface
 * @abstract
 */
export default class ApiDataInterface {
    /**
     * @param {RequestParams} params
     * @public
     * @abstract
     */
    result(params) {
        throw Error('Implement ApiDataInterface:result');
    }

    /**
     * @public
     * @abstract
     */
    all() {
        throw Error('Implement ApiDataInterface:all');
    }
}
