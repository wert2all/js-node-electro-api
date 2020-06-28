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
        /**
         *
         * @type {null|Node}
         * @private
         */
        this._image = null;
        /**
         *
         * @type {null|Node}
         * @private
         */
        this._downloadIcon = null;
    }

    clean() {
    }

    clone() {
        const imageItem = new UIImageItem(this._node.cloneNode(true), this._config);
        imageItem.init();
        return imageItem;
    }

    getNode() {
        return this._node;
    }

    init() {
        this._image = this._config.getDocument().querySelector(this._config.getImage());
        this._downloadIcon = this._config.getDocument()
            .querySelector(this._config.getIconDownload());
    }

    /**
     *
     * @param {ImageData} imageData
     * @return {UIImageItem}
     */
    // eslint-disable-next-line no-unused-vars
    create(imageData) {
        /**
         *
         * @type {UIImageItem}
         */
        const imageItem = this.clone();
        imageItem.setImage(imageData.getUrl());
        return imageItem;
    }

    /**
     *
     * @param {string} url
     * @return {UIImageItem}
     */
    setImage(url) {
        if (this._image !== null) {
            this._image.src = url;
        }
        if (this._downloadIcon !== null) {
            this._downloadIcon.href = url;
        }
        return this;
    }
}
