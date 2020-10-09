import UIGridElementInterface from "./UIGridElementInterface";

/**
 * @class UIGrid
 * @type UIGridElementInterface
 * @extends UIGridElementInterface
 */
export default class UIGrid extends UIGridElementInterface {
    /**
     *
     * @param {ParentNode} gridNode
     */
    constructor(gridNode) {
        super();
        /**
         *
         * @type {ParentNode}
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
    init() {}

    /**
     * @return {ParentNode}
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

    /**
     * @return {void}
     */
    clean() {
        this._elements.forEach((element) => {
            element.clean();
            this._grid.removeChild(element.getNode());
        });
        this._elements = [];
    }
}
