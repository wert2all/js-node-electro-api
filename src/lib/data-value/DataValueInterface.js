/**
 * @interface
 * @abstract
 * @class DataValueInterface
 */
import ImplementationError from '../implementation-error/ImplementationError';

export default class DataValueInterface {
    /**
     * @abstract
     * @param  {string} key
     * @return {string||null}
     */
    getData(key) {
        throw new ImplementationError(this, 'getData');
    }

    /**
     * @abstract
     * @param {string} key
     * @param {string} value
     */
    setData(key, value) {
        throw new ImplementationError(this, 'setData');
    }

}
