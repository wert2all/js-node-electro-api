import DispatchInterface from './DispatchInterface';

/**
 * @class Dispatcher
 * @extends DispatchInterface
 * @type DispatchInterface
 */
export default class Dispatcher extends DispatchInterface {
    /**
     *
     * @param {Object<string, ObserverInterface[]>} observers
     */
    constructor(observers = {}) {
        super();
        /**
         *
         * @type {Object<string, ObserverInterface[]>}
         * @private
         */
        this._observers = observers;
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

    /**
     *
     * @param {EventInterface} event
     * @return {Promise<*>}
     */
    dispatch(event) {
        Promise.all(
            this._getEventObservers(event).map(observer => observer.notify(event))
        )
            .then(data => Promise.resolve(data))
            .catch(e => Promise.reject(e));
    }
}
