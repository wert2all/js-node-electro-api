import UIElementInterface from "./UIElementInterface";

/**
 * @class UIMutableElementInterface
 * @interface
 * @abstract
 */
export default class UIMutableElementInterface extends UIElementInterface {
    /**
     * @abstract
     * @param {UIElementInterface} element
     * @return UIElementInterface
     */
    // eslint-disable-next-line no-unused-vars
    addElement(element) {}
}
