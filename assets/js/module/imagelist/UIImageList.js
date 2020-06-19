import UIElementInterface from '../../ui/interfaces/element/UIElementInterface';

/**
 * @class UIImageList
 * @extends UIElementInterface
 * @type UIElementInterface
 */
export default class UIImageList extends UIElementInterface {
    /**
     *
     * @param {UIGridElementInterface} grid
     * @param {UIElementInterface} loader
     * @param {UINotifyInterface} notify
     */
    constructor(grid, loader, notify) {
        super();
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
    }

    /**
     * @return void
     */
    clean() {
        //TODO
    }

    /**
     *
     * @return {UIElementInterface|null}
     */
    clone() {
        return null;
    }

    /**
     *
     * @return {null|Node}
     */
    getNode() {
        return null;
    }

    init() {
        this._showLoader();
        this._fetchData()
            .then(data => this._addData(data))
            .then(() => this._hideLoader())
            .catch(error => this._notify.error(error.message));
    }

    _showLoader() {
        //FIXME
    }

    _hideLoader() {
        //FIXME
    }

    /**
     * @return {Promise<ImageData[]>}
     * @private
     */
    _fetchData() {
        //TODO
        return Promise.resolve([]);
    }

    /**
     *
     * @param {ImageData[]} data
     * @return {Promise<void>}
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    _addData(data) {
        //TODO
        if (data.length === 0) {
            this._notify.warning('No image data');
        }
        return Promise.resolve();
    }
}
