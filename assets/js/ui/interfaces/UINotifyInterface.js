/**
 * @class UINotifyInterface
 * @interface
 * @abstract
 */
export default class UINotifyInterface {
    /**
     * @abstract
     * @param {string} message
     */
    // eslint-disable-next-line no-unused-vars
    success(message) {}

    /**
     * @abstract
     * @param {string} message
     */
    // eslint-disable-next-line no-unused-vars
    warning(message) {}

    /**
     * @abstract
     * @param {string} message
     */
    // eslint-disable-next-line no-unused-vars
    error(message) {}
}
