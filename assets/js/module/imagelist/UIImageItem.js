import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';

/**
 * @class UIImageItem
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageItem extends UIElementInterface {
    /**
     *
     * @param {ParentNode} itemNode
     * @param {UIImageItemConfig} config
     */
    constructor(itemNode, config) {
        super();
        /**
         *
         * @type {ParentNode}
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
         * @type {null|Element}
         * @private
         */
        this._imageTypeTitle = null;
        /**
         *
         * @type {null|Element}
         * @private
         */
        this._imageTypeContainer = null;
        /**
         *
         * @type {null|Element}
         * @private
         */
        this._yearmon = null;
        /**
         *
         * @type {null|Element}
         * @private
         */
        this._radioLabel = null;
        /**
         *
         * @type {null|Element}
         * @private
         */
        this._radioInput = null;
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
        this._image = this._node.querySelector(this._config.getImage());
        this._downloadIcon = this._node.querySelector(this._config.getIconDownload());
        this._imageTypeTitle = this._node
            .querySelector(this._config.getImageTypeTitleSelector());
        this._imageTypeContainer = this._node
            .querySelector(this._config.getImageTypeTitleContainerSelector());
        this._yearmon = this._node.querySelector(this._config.getYearmonSelector());
        this._radioLabel = this._node.querySelector(
            this._config.getRadioSelector().getLabelSelector()
        );
        this._radioInput = this._node.querySelector(
            this._config.getRadioSelector().getInputSelector()
        );
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
            .setImageType(imageData.getType())
            .setYearMon(imageData.getYearmon())
            .setId(imageData.getId());
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

    /**
     *
     * @param {YearMonClient|null} yearmon
     * @return {UIImageItem}
     */
    setYearMon(yearmon) {
        if (this._yearmon !== null && yearmon !== null) {
            this._yearmon.innerHTML = yearmon.getYear()
                + ', ' + yearmon.getDate().toLocaleString('default', {month: 'long'});
        }
        return this;
    }

    /**
     *
     * @param {number} id
     * @return {UIImageItem}
     */
    setId(id) {
        if (this._radioInput !== null && this._radioLabel !== null) {
            this._radioLabel.setAttribute('for', this._createRadioId(id));
            this._radioInput.setAttribute('id', this._createRadioId(id));
        }
        return this;
    }

    /**
     *
     * @param {number} id
     * @return {string}
     * @private
     */
    _createRadioId(id) {
        return 'image_active_' + id;
    }
}
