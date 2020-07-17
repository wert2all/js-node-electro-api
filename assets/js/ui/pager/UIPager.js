import UIPagerDataProvider from './data/UIPagerDataProvider';
import UICloneableInterface from '../interfaces/UICloneableInterface';

/**
 * @class UIPager
 * @extends UICloneableInterface
 */

export default class UIPager extends UICloneableInterface {
    /**
     *
     * @param {UIPagerDataProvider|null} dataProvider
     */
    constructor(dataProvider = null) {
        super();
        /**
         *
         * @type {UIPagerDataProvider}
         * @private
         */
        this._dataProvider = dataProvider == null
            ? new UIPagerDataProvider()
            : dataProvider;
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
        return new UIPager(this._dataProvider);
    }

    /**
     * @return {UIElementInterface}
     */
    build() {
        const node = null;
        return new UISimpleElement(node);
    }
}
