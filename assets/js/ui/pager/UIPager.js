import UIPagerDataProvider from './data/UIPagerDataProvider';

/**
 * @class UIPager
 */

export default class UIPager {
    constructor() {
        this._dataProvider = new UIPagerDataProvider();
    }
}
