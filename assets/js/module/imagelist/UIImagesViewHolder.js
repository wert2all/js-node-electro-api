/**
 * @class UIImagesViewHolder
 */
export default class UIImagesViewHolder {
    /**
     *
     * @param {UIMutableElementInterface} parentElement
     * @param {UIGridElementInterface} grid
     * @param {UIElementInterface} loader
     * @param {UINotifyInterface} notify
     * @param {UIImageItem} imageItem
     * @param {UIPager} pager
     */
    constructor(parentElement, grid, loader, notify, imageItem, pager) {
        /**
         *
         * @type {UIMutableElementInterface}
         * @private
         */
        this._parentElement = parentElement;
        /**
         *
         * @type {UIGridElementInterface}
         * @private
         */
        this._grid = grid;
        /**
         *
         * @type {UIElementInterface}
         * @private
         */
        this._loader = loader;
        /**
         *
         * @type {UINotifyInterface}
         * @private
         */
        this._notify = notify;
        /**
         *
         * @type {UIImageItem}
         * @private
         */
        this._imageItem = imageItem;
        /**
         *
         * @type {UIPager}
         * @private
         */
        this._pager = pager;
    }

    /**
     *
     * @return {UIGridElementInterface}
     */
    getGrid() {
        return this._grid;
    }

    /**
     *
     * @return {UIMutableElementInterface}
     */
    getParentElement() {
        return this._parentElement;
    }

    /**
     *
     * @return {UIImageItem}
     */
    getImageItem() {
        return this._imageItem;
    }

    /**
     *
     * @return {UINotifyInterface}
     */
    getNotify() {
        return this._notify;
    }

    /**
     *
     * @return {UIPager}
     */
    getPager() {
        return this._pager;
    }

    /**
     *
     * @return {UIElementInterface}
     */
    getLoader() {
        return this._loader;
    }
}
