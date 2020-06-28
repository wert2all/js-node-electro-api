import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';

/**
 * @class UIImageItem
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageItem extends UIElementInterface {
    /**
     *
     * @param {Node} itemNode
     */
    constructor(itemNode) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._node = itemNode;
    }

    clean() {
    }

    clone() {
        return new UIImageItem(this._node.cloneNode(true));
    }

    getNode() {
        return this._node;
    }

    init() {
    }

    /**
     *
     * @param {ImageData} imageData
     * @return {UIImageItem}
     */
    // eslint-disable-next-line no-unused-vars
    create(imageData) {
        return this.clone();
    }
}
