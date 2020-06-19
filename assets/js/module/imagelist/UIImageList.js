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
     */
    constructor(grid, loader) {
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
            .catch(error => this._showError(error));
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
        return Promise.resolve();
    }

    /**
     *
     * @param {Error} error
     * @return {void}
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    _showError(error) {
        //FIXME
    }
}
