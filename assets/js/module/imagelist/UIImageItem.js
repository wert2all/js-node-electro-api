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
        /**
         *
         * @type {null| Node}
         * @private
         */
        this._imageTypeTitle = null;
        /**
         *
         * @type {null|Node}
         * @private
         */
        this._imageTypeContainer = null;
    }

    clean() {
    }

    /**
     * @return {UIElementInterface|null}
     */
    clone() {
        return new UIImageItem(this._node.cloneNode(true), this._config);
    }

    getNode() {
        return this._node;
    }

    init() {
        this._image = this._config.getDocument().querySelector(this._config.getImage());
        this._downloadIcon = this._config.getDocument()
            .querySelector(this._config.getIconDownload());
        this._imageTypeTitle = this._config.getDocument()
            .querySelector(this._config.getImageTypeTitleSelector());
        this._imageTypeContainer = this._config.getDocument()
            .querySelector(this._config.getImageTypeTitleContainerSelector());
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
        imageItem.init();
        imageItem.setImage(imageData.getUrl())
            .setImageType(imageData.getType());
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

    /**
     *
     * @param {string} type
     * @return {UIImageItem}
     */
    setImageType(type) {
        if (this._imageTypeTitle !== null) {
            this._imageTypeTitle.innerHTML = type;
        }
        if (this._imageTypeContainer !== null) {
            this._imageTypeContainer.classList.add('uk-custom-image-type-' + type);
        }
        return this;
    }
}
