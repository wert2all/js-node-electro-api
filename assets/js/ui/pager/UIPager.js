import UIPagerDataProvider from './data/UIPagerDataProvider';

/**
 * @class UIPager
 */

export default class UIPager {
    constructor() {
        /**
         *
         * @type {UIPagerDataProvider}
         * @private
         */
        this._dataProvider = new UIPagerDataProvider();
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
}
