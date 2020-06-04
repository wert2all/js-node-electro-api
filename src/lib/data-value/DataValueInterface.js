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
     * @return {string|null}
     */
    // eslint-disable-next-line no-unused-vars
    getData(key) {
        throw new ImplementationError(this, 'getData');
    }

    /**
     * @abstract
     * @param {string} key
     * @param {string} value
     * @return {DataValueInterface}
     */
    // eslint-disable-next-line no-unused-vars
    setData(key, value) {
        throw new ImplementationError(this, 'setData');
    }

    /**
     * @abstract
     * @return {Object<string,string>}
     */
    toHash() {
        throw new ImplementationError(this, 'toHash');
    }

}
