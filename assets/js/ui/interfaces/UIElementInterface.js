/**
 * @class UIElementInterface
 * @interface
 * @abstract
 */
export default class UIElementInterface {
    /**
     * @abstract
     * @return {void}
     */
    init() {

    }

    /**
     * @abstract
     * @return {void}
     */
    clean() {
    }

    /**
     * @abstract
     * @return {UIElementInterface}
     */
    clone() {
    }
}
