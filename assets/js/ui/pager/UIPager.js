import UIPagerDataProvider from './data/UIPagerDataProvider';
import UICloneableInterface from '../interfaces/UICloneableInterface';
import UISimpleElement from '../elements/UISimpleElement';

/**
 * @class UIPager
 * @extends UICloneableInterface
 */

export default class UIPager extends UICloneableInterface {
    /**
     *
     * @param {ParentNode} parentNode
     * @param {UIPageItem} pageItem
     * @param {UIPagerDataProvider|null} dataProvider
     */
    constructor(parentNode, pageItem, dataProvider = null) {
        super();
        /**
         *
         * @type {UIPagerDataProvider}
         * @private
         */
        this._dataProvider = dataProvider == null
            ? new UIPagerDataProvider()
            : dataProvider;
        /**
         *
         * @type {ParentNode}
         * @private
         */
        this._parentNode = parentNode;
        /**
         *
         * @type {UIPageItem}
         * @private
         */
        this._pageItem = pageItem;
    }

    /**
     *
     * @return {UIPagerDataProvider}
     */
    getDataProvider() {
        return this._dataProvider;
    }

    /**
     *
     * @param count
     * @return {UIPager}
     */
    setPagerItemsCount(count) {
        this._dataProvider = this._dataProvider.setCount(count);
        return this;
    }

    /**
     *
     * @param {number} from
     * @return {UIPager}
     */
    setPagerFrom(from) {
        this._dataProvider = this._dataProvider.setFrom(from);
        return this;
    }

    /**
     *
     * @param {number} offset
     * @return {UIPager}
     */
    setPagerOffset(offset) {
        this._dataProvider = this._dataProvider.setOffset(offset);
        return this;
    }

    /**
     *
     * @return {UIPager}
     */
    clone() {
        return new UIPager(this._parentNode, this._pageItem, this._dataProvider);
    }

    /**
     * @return {UIElementInterface}
     */
    build() {
        const node = this._parentNode.cloneNode(true);
        node.innerHTML = '';
        const pagesCount = this._dataProvider.getPagesCount();
        for (let i = 1; i < pagesCount + 1; i++) {
            const page = this._pageItem.clone();
            if (this._dataProvider.getActivePage() === i) {
                page.setActive();
            } else {
                page.init();
            }
            page.setNumber(i);
            node.append(page.getNode());
        }
        return new UISimpleElement(node);
    }
}
