import DispatchInterface from './DispatchInterface';

/**
 * @class Dispatcher
 * @extends DispatchInterface
 * @type DispatchInterface
 */
export default class Dispatcher extends DispatchInterface {
    constructor() {
        super();
        /**
         *
         * @type {Object<string, ObserverInterface[]>}
         * @private
         */
        this._observers = {};
    }

    /**
     *
     * @param {EventInterface} event
     */
    dispatch(event) {
        this._getEventObservers(event).forEach(observer => observer.notify(event));
    }

    /**
     *
     * @param {EventInterface}  event
     * @return {ObserverInterface[]}
     * @private
     */
    _getEventObservers(event) {
        return this._observers.hasOwnProperty(event.getEventName())
            ? this._observers[event.getEventName()]
            : [];
    }
}
