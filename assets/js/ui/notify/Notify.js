import UINotifyInterface from '../interfaces/UINotifyInterface';

/**
 * @class Notify
 * @extends UINotifyInterface
 * @type UINotifyInterface
 */
export default class Notify extends UINotifyInterface {
    /**
     *
     * @param UIKit
     * @param {{}}options
     */
    constructor(UIKit, options = {}) {
        super();
        /**
         *
         * @type {{pos: string, timeout: number}}
         * @private
         */
        this._options = Object.assign(
            {
                pos: 'top-right',
                timeout: 5000
            },
            options);
        /**
         *
         * @private
         */
        this._uikit = UIKit;
    }

    error(message) {
        this._uikit.notification(
            message,
            Object.assign({status: 'danger'}, this._options)
        );
    }

    success(message) {
        this._uikit.notification(
            message,
            Object.assign({status: 'success'}, this._options)
        );
    }

    warning(message) {
        this._uikit.notification(
            message,
            Object.assign({status: 'warning'}, this._options)
        );
    }
}
