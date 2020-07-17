import UICloneableInterface from '../UICloneableInterface';

/**
 * @interface
 * @abstract
 * @class UIElementInterface
 * @extends UICloneableInterface
 */
export default class UIElementInterface extends UICloneableInterface {
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
     * @return {ParentNode}
     */
    getNode() {
    }
}
