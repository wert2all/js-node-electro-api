import UIElementInterface from './UIElementInterface';

/**
 * @class UIInterface
 * @interface
 * @abstract
 */
export default class UIInterface extends UIElementInterface {
    /**
     * @abstract
     * @return {UIAuthElementInterface}
     */
    getAuthElement() {
    }
}
