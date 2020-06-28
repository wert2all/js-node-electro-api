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
     * @param {UIImageItemConfig} config
     */
    constructor(itemNode, config) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._node = itemNode;
        /**
         *
         * @type {UIImageItemConfig}
         * @private
         */
        this._config = config;
    }

    clean() {
    }

    clone() {
        return new UIImageItem(this._node.cloneNode(true), this._config);
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
