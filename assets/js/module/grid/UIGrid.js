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
        /**
         *
         * @type {UIElementInterface[]}
         * @private
         */
        this._elements = [];
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

    /**
     * @return {Node}
     */
    getNode() {
        return this._grid;
    }

    /**
     *
     * @param element
     * @return {UIElementInterface}
     */
    addElement(element) {
        this._elements.push(element);
        this._grid.appendChild(element.getNode());
        return this;
    }
}
