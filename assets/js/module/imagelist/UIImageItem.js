import UIElementInterface from "../../ui/interfaces/element/UIElementInterface";

/**
 * @class UIImageItem
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageItem extends UIElementInterface {
    /**
     *
     * @param {UIkit} uiKit
     * @param {ParentNode} itemNode
     * @param {UIImageItemConfig} config
     * @param {UIImageActionsModifierInterface} actions
     * @param {UIProfileViewFactory|null} profileViewFactory
     */
    constructor(uiKit, itemNode, config, actions = null, profileViewFactory = null) {
        super();
        /**
         *
         * @type {UIkit}
         * @private
         */
        this._uiKit = uiKit;
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
         * @type {null|HTMLImageElement}
         * @private
         */
        this._image = null;
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

        /**
         *
         * @type {null|UIImageActionsModifierInterface}
         * @private
         */
        this._actions = actions;
        this._profileViewFactory = profileViewFactory;
        /**
         *
         * @type {UIProfileView|null}
         * @private
         */
        this._profileView =
            this._profileViewFactory != null
                ? this._profileViewFactory.create(this._node, this._config.getProfileSelector())
                : null;
    }

    /**
     *
     * @return {null|UIImageActionsModifierInterface}
     */
    getActions() {
        return this._actions;
    }

    clean() {}

    /**
     * @return {UIElementInterface|null}
     */
    clone() {
        const parentNode = this._node.cloneNode(true);
        return new UIImageItem(this._uiKit, parentNode, this._config, this._actions, this._profileViewFactory);
    }

    getNode() {
        return this._node;
    }

    init() {
        this._image = this._node.querySelector(this._config.getImage());
        this._imageTypeTitle = this._node.querySelector(this._config.getImageTypeTitleSelector());
        this._imageTypeContainer = this._node.querySelector(this._config.getImageTypeTitleContainerSelector());
        this._yearmon = this._node.querySelector(this._config.getYearmonSelector());
        this._radioLabel = this._node.querySelector(this._config.getRadioSelector().getLabelSelector());
        this._radioInput = this._node.querySelector(this._config.getRadioSelector().getInputSelector());
        if (this._profileView != null) {
            this._profileView.init();
        }
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {UIElementListInterface} elementList
     * @return {UIImageItem}
     */
    // eslint-disable-next-line no-unused-vars
    create(imageData, elementList) {
        /**
         *
         * @type {UIImageItem}
         */
        const imageItem = this.clone();
        imageItem.init();
        const actions = imageItem.getActions();
        if (actions !== null) {
            actions.applyData(imageItem.getNode(), imageData, elementList);
        }
        imageItem
            .setImage(imageData.getUrls()["250x330"])
            .setImageType(imageData.getType())
            .setYearMon(imageData.getYearmon())
            .setId(imageData.getId())
            .setUserData(imageData.getUser())
            .setIsReady(imageData.getIsReady());
        return imageItem;
    }

    /**
     *
     * @param {boolean} isReady
     * @return {UIImageItem}
     */
    setIsReady(isReady) {
        if (isReady) {
            this._radioInput.setAttribute("checked", "checked");
        } else {
            this._radioInput.removeAttribute("checked");
        }
        return this;
    }

    /**
     *
     * @param {string} url
     * @return {UIImageItem}
     */
    setImage(url) {
        if (this._image !== null) {
            this._image.setAttribute("data-src", url);
            this._uiKit.img(this._image);
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
            this._imageTypeContainer.classList.add("uk-custom-image-type-" + type);
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
            this._yearmon.innerHTML =
                yearmon.getYear() + ", " + yearmon.getDate().toLocaleString("default", { month: "long" });
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
            this._radioLabel.setAttribute("for", this._createRadioId(id));
            this._radioInput.setAttribute("id", this._createRadioId(id));
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
        return "image_active_" + id;
    }

    /**
     *
     * @param {DataGoogleAuthUser|null} userData
     * @return {UIImageItem}
     */
    setUserData(userData) {
        if (userData != null && this._profileView !== null) {
            this._profileView.setUserData(userData);
        }
        return this;
    }
}
