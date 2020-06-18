import UIElementInterface from './element/UIElementInterface';

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

    /**
     * @abstract
     * @return {UIGridElementInterface}
     */
    getGrid() {
    }

    /**
     * @abstract
     * @return {UIElementInterface}
     */
    getLoader() {
    }

    /**
     * @abstract
     * @return {UIContentElementInterface}
     */
    getContent() {
    }
}
