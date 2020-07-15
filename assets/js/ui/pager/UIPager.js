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
}
