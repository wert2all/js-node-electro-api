import UIGridElementInterface from './UIGridElementInterface';

/**
 * @class UIGrid
 * @type UIGridElementInterface
 * @extends UIGridElementInterface
 */
export default class UIGrid extends UIGridElementInterface {
    /**
     *
     * @param {Node} gridNode
     */
    constructor(gridNode) {
        super();
        /**
         *
         * @type {Node}
         * @private
         */
        this._grid = gridNode;
    }

    /**
     * @return {UIElementInterface}
     */
    clone() {
        return new UIGrid(this._grid.cloneNode(true));
    }

    /**
     * @return {void}
     */
    init() {
    }
}
